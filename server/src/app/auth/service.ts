import { Request } from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import CommonFunction from './../../config/helper'
class AuthRouteService {
    public UserLoginSerive = async (req: Request) => {
        try {
            const payload = {
                email: (req.body.data.email as string).toLowerCase(),
                password: (req.body.data.password as string)
            }
            const findUser = await prisma.user.findUnique({
                where: {
                    email: payload.email
                }
            })
            if (!findUser) {
                return {
                    status: false,
                    message: "user account not found",
                    data: null,
                    error: null
                }
            } else if (findUser.password !== payload.password) {
                return {
                    status: false,
                    message: "wrong password!!!",
                    data: null,
                    error: null
                }
            } else {
                delete (findUser as any).password

                const token = CommonFunction.signJWT({
                    id: findUser.id
                })


                return {
                    status: true,
                    message: "logged in !!",
                    data: findUser,
                    token: token,
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
            console.log("body", req.body.data);

            const payload: Payload = {
                first_name: req.body.data.firstname.toLowerCase(),
                last_name: req.body.data?.lastname?.toLowerCase() ?? null,
                password: req.body.data.password,
                email: req.body.data.email.toLowerCase(),
                mobile_no: req.body.data?.phone?.toString() ?? null,
                city: req.body.data.city.toLowerCase(),
                pin: Number(req.body.data.pin),
            }
            console.log("payload", payload);
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
}
export default new AuthRouteService()