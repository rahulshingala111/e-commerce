import {Request} from "express";
import RazorPayInstance from "../../config/RazorPay";
import {Orders} from "razorpay/dist/types/orders";

class PaymentService {
    public InitiatePaymentOrderService = async (req: Request) => {
        try {
            const option: Orders.RazorpayOrderCreateRequestBody = {
                amount: 100, //this is one rupee
                currency: "INR",
                receipt: "someRandomNumberMaybeGenerteOwerOwn",
                notes: {
                    message: ""
                }
            }
            const data = await RazorPayInstance.orders.create(option)

            // sample response
            // {
            //     amount: 100,
            //         amount_due: 100,
            //     amount_paid: 0,
            //     attempts: 0,
            //     created_at: 1731422134,
            //     currency: 'INR',
            //     entity: 'order',
            //     id: 'order_PKQcqUgkmD8Omq',
            //     notes: [],
            //     offer_id: null,
            //     receipt: 'someRandomNumberMaybeGenerteOwerOwn',
            //     status: 'created'
            // }

            console.log(data)
            return {
                status: true,
                data: {
                    order_id: data.id
                }
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
        console.log(req.body)
        if (req.body) {
            return {
                status: true
            }
        } else {
            return {
                status: false
            }
        }
    }
}

export default new PaymentService()
