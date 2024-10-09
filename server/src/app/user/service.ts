import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class UserRoutesService {
    public UserCreateService = async (req: Request) => {
        try {
            interface Payload {
                first_name: string,
                last_name: string,
                password: string,
                email: string,
                mobile_no: string,
                city: string,
                pin: number,
            }
            console.log(req.body.data);

            const payload: Payload = {
                first_name: req.body.data.firstname.toLowerCase(),
                last_name: req.body.data?.lastname?.toLowerCase() ?? null,
                password: req.body.data.password,
                email: req.body.data.email.toLowerCase(),
                mobile_no: req.body.data?.phone?.toString() ?? null,
                city: req.body.data.city.toLowerCase(),
                pin: Number(req.body.data.pin),
            }
            console.log(payload);
            const findUser = await prisma.user.findUnique({
                where: {
                    email: payload.email
                }, select: {
                    id: true
                }
            })
            if (!findUser) {
                const insertUser = await prisma.user.create({
                    data: {
                        first_name: payload.first_name,
                        last_name: payload.last_name,
                        password: payload.password,
                        email: payload.email,
                        mobile_no: payload.mobile_no
                    }
                })
                console.log(insertUser);
                delete (insertUser as any).password
                return {
                    status: true,
                    message: "user created successfully",
                    data: insertUser,
                    error: null
                }
            } else {
                return {
                    status: false,
                    message: "user already exist",
                    data: findUser,
                    error: null
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error
            }
        }
    }
    public UserAddressesService = async (req: Request) => {
        try {
            //@ts-ignore
            const user_id = req?.user_id
            if (user_id) {

                const fetchAddress = await prisma.addresses.findMany({
                    where: { user_id: user_id }
                })
                return {
                    status: true,
                    data: fetchAddress
                };
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error
            }
        }
    }

    public UserAddAddressService = async (req: Request) => {
        try {
            //@ts-ignore
            const user_id = req.user_id;
            if (user_id) {
                const object = {
                    user_id: user_id,
                    address_1: req.body.address_1,
                    address_2: req.body.address_2,
                    landmark: req.body.landmark,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    postal_code: req.body.postal_code
                }

                const insertData = await prisma.addresses.create({
                    data: object
                })

                return {
                    status: true
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error
            }
        }
    }

}
export default new UserRoutesService();