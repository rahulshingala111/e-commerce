import express, { Request, Response } from 'express'
import AuthRouteService from './service'
class AuthRouter {
    public router = express.Router();

    constructor() {
        this.initAuth()
    }

    private UserLoginRoute = async (req: Request, res: Response) => {
        try {
            const response = await AuthRouteService.UserLoginSerive(req);
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
    private UserCreateRoute = async (req: Request, res: Response) => {
        try {
            const response = await AuthRouteService.UserCreateService(req)
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

    private initAuth() {
        this.router.post('/login', this.UserLoginRoute)
        this.router.post('/register', this.UserCreateRoute)
    }
}
export default new AuthRouter().router