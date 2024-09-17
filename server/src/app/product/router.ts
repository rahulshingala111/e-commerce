import express, { Request, Response } from 'express'
import ProductService from './service'
// const router = express.Router();

class ProductRoute {
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private ImageProductGetRoute = async (req: Request, res: Response) => {
        try {
            const response = await ProductService.ImageProductGetRouteService(req)
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

    private ProductAdd = async (req: Request, res: Response) => {
        try {
            const response = await ProductService.ProductAddService(req, res)
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

    private ProductTen = async (req: Request, res: Response) => {
        try {
            const response = await ProductService.ProductTenService(req)
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
        this.router.get('/image/get/:product_id', this.ImageProductGetRoute)
        this.router.get('/add', this.ProductAdd)
        this.router.get('/ten', this.ProductTen)

    }
}

export default new ProductRoute().router;