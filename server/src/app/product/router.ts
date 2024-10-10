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

    private GetItem = async (req: Request, res: Response) => {
        try {
            const response = await ProductService.GetItemService(req)
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

    private AddToCart = async (req: Request, res: Response) => {
        try {
            const response = await ProductService.AddToCartService(req)
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

    private GetProduct = async (req: Request, res: Response) => {
        try {
            const response = await ProductService.GetProductService(req)
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

    private GetBrands = async (req: Request, res: Response) => {
        try {
            const response = await ProductService.GetBrandsService(req)
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

        this.router.get('/get', this.GetProduct)

        this.router.get('/categories', this.GetCategories)

        this.router.get('/brands', this.GetBrands)


        this.router.get('/item/:product_id', this.GetItem)

        this.router.post('/addtocart', this.AddToCart)


    }
}

export default new ProductRoute().router;