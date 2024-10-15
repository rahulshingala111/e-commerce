import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class UserRoutesService {
   
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
            console.log(user_id);
            
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
            }else{
                return {
                    status:false,
                    message: "user not found"
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