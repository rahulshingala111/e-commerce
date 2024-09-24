import express, { Request, Response } from 'express';
import UserRoutesService from './service';
class UserRoutes {
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private UserCreateRoute = async (req: Request, res: Response) => {
        try {
            const response = await UserRoutesService.UserCreateService(req)
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


    private initRoutes() {
        this.router.post('/', this.UserCreateRoute)
    }
}
export default new UserRoutes().router;