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

    private UserAddresses = async (req: Request, res: Response) => {
        try {
            const response = await UserRoutesService.UserAddressesService(req)
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

    private UserAddAddress = async (req: Request, res: Response) => {
        try {
            const response = await UserRoutesService.UserAddAddressService(req)
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

        this.router.get('/address', this.UserAddresses)
        this.router.post('/address/add', this.UserAddAddress)


    }
}
export default new UserRoutes().router;