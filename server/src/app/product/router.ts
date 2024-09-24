import express, { Request, Response } from 'express'
import ProductService from './service'
import CommonFunction from '../../config/helper';

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

    private CategorieAdd = async (req: Request, res: Response) => {
        try {
            const response = await ProductService.CategorieAddService(req)
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

    private CategorieGet = async (req: Request, res: Response) => {
        try {
            const response = await ProductService.CategorieGet(req)
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

    private initRoutes() {
        this.router.get('/image/get/:product_id', this.ImageProductGetRoute)
        this.router.post('/add', this.ProductAdd)
        this.router.get('/ten', this.ProductTen)

        this.router.post('/categorie/add', this.CategorieAdd)
        this.router.get('/categorie/get', this.CategorieGet)


    }
}

export default new ProductRoute().router;