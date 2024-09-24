import express, { Request, Response } from 'express'
import ProductService from './service'

class ProductRoute {
    public router = express.Router();

    constructor() {
        this.initRoutes();
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

    private GetCategories = async (req: Request, res: Response) => {
        try {
            const response = await ProductService.GetCategoriesService(req)
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
        this.router.get('/ten', this.ProductTen)
        this.router.get('/categories', this.GetCategories)


    }
}

export default new ProductRoute().router;