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
}
export default new AuthRouteService()