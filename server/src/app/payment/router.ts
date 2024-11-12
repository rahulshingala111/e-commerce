import express, {Request, Response} from "express";
import PaymentService from './service'
import chackIfTokenExist from "../../auth/tokenValidation";

class PaymentClass {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    private InitiatePaymentOrder = async (req: Request, res: Response) => {
        try {
            const response = await PaymentService.InitiatePaymentOrderService(req)
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
    private CallBackURL = async (req: Request, res: Response) => {
        try {
            const response = await PaymentService.CAllBackURLService(req)
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

    initRoutes() {
        this.router.post('/order/create', chackIfTokenExist, this.InitiatePaymentOrder)
        this.router.post('/order/callback', this.CallBackURL)

    }
}

export default new PaymentClass().router
