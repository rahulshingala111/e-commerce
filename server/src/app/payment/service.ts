import {Request} from "express";
import RazorPayInstance from "../../config/RazorPay";
import {Orders} from "razorpay/dist/types/orders";
import {PrismaClient} from "@prisma/client"
import {generateReceiptNumber} from '../../config/helper'
import CONSTANT from "../../config/constant";
import RazorpayOrder = Orders.RazorpayOrder;
import * as crypto from "node:crypto";

const prisma = new PrismaClient()

class PaymentService {
    public InitiatePaymentOrderService = async (req: Request) => {
        try {
            if (!req.body.user_id) {
                throw new Error("User ID not found.");
            }
            const user_id = Number(req.body.user_id)
            const cart_id = Number(req.body.cart_id)
            const currency = CONSTANT.CURRENCY.Indian
            const receipt: string = generateReceiptNumber()
            const UserDetails = await prisma.user.findUniqueOrThrow({
                where: {id: user_id},
                select: {
                    first_name: true,
                    last_name: true,
                    email: true,
                    mobile_no: true,
                }
            })

            const CartItems = await prisma.cart.findUniqueOrThrow({
                where: {id: cart_id},
                include: {
                    cart_item: {
                        include: {
                            product: {}
                        }
                    }
                }
            })

            let sum = 0
            CartItems.cart_item.map((element) => {
                sum = sum + (element.price * element.qty)
            })
            sum = sum * 10;

            const option: Orders.RazorpayOrderCreateRequestBody = {
                amount: sum,
                currency: currency,
                receipt: receipt,
                notes: {
                    message: "creating order"
                }
            }
            const RazorPayOrder: RazorpayOrder = await RazorPayInstance.orders.create(option)

            const insertOrder = await prisma.order.create({
                data: {
                    user_id: user_id,
                    amount: sum,
                    currency: currency,
                    order_id: RazorPayOrder.id,
                    receipt: receipt,
                    created_at: RazorPayOrder.created_at.toString()
                }
            })
            RazorPayOrder.amount = Number(RazorPayOrder.amount) * 10


            const returnObject = new Object({
                key_id: process.env.RAZORPAY_KEY_ID_DEV,
                order_id: RazorPayOrder.id,
                order_create_id: insertOrder.id,
                currency: currency,
                amount: RazorPayOrder.amount,
                image: 'http://localhost:3002/product/image/1.jpg',
                user: UserDetails,
                notes: RazorPayOrder.notes
            })

            return {
                status: true,
                data: returnObject
            }

        } catch (e: any) {
            console.log(e)
            const status_code = e.stautsCode;
            switch (status_code) {
                case 400:
                    return {
                        status: false,
                    }
                default :
                    return {
                        status: false
                    }
            }

        }
    }

    public CAllBackURLService = async (req: Request) => {
        try {
            console.log(req.body)
            if (!req.body) {
                throw new Error("Please provide a valid body");
            }
            const order_create_id: number = req.body.order_create_id
            const payment_id: string = req.body.payment_id
            const order_id: string = req.body.order_id
            const signature: string = req.body.signature
            const cart_id: number = req.body.cart_id

            const body = `${order_id}|${payment_id}`;
            const generatedSignature: string = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET_DEV!).update(body).digest("hex");
            let verified: boolean = false
            if (generatedSignature === signature) {
                verified = true
            }

            const updateOrder = await prisma.order.update({
                where: {
                    id: order_create_id,
                    order_id: order_id
                },
                data: {
                    payment_id: payment_id,
                    signature: signature,
                    verified: verified
                }
            })
            if (!updateOrder) {
                throw new Error('error in updateing')
            }

            const updateCart = await prisma.cart.update({
                where: {
                    id: cart_id
                },
                data: {
                    status: CONSTANT.CART_STATUS.COMPLETED
                }
            })

            return {
                status: true,
            }
        } catch (e: any) {
            console.log(e)
        }


    }
}

export default new PaymentService()
