import express, { Request, Response } from 'express'
import MediaService from './service';
import { ServiceReturnInterface } from '../../config/interface';


class MediaRouter {
    public router = express.Router();
    constructor() {
        this.routerInit()
    }

    private async GetBanners(req: Request, res: Response) {
        try {
            const response: ServiceReturnInterface = await MediaService.GetBannerService(req)
            res.status(200).send(response)
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Internal server Error',
                error: error,
                data: null
            })
        }
    }

    routerInit() {
        this.router.get('/banner/front', this.GetBanners)
    }


}
export default new MediaRouter().router
