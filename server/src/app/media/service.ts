import { Request } from "express";
import { PrismaClient } from "@prisma/client"
import { ServiceReturnInterface } from "../../config/interface";
const prisma = new PrismaClient();

class MediaService {

    /**
     * GetBannerService
     * service to fetch all banners path
     */
    public async GetBannerService(req: Request): Promise<ServiceReturnInterface> {
        try {
            const getBanner = await prisma.banners.findMany({
                where: {
                    is_active: true
                },
                select: {
                    img_path: true
                }

            })
            console.log(getBanner);
            return {
                status: true,
                data: getBanner,
                message: 'banner fetched successfully'
            }
        } catch (error) {
            console.log(error);
            return {
                status: true,
                data: null,
                message: error as string
            }
        }
    }
}
export default new MediaService()
