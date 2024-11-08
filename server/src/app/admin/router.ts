import express, { Request, Response } from 'express'
import AdminService from './service';
class AdminRouter {
    router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private adminRoute = async () => {

    }

    private CategorieAdd = async (req: Request, res: Response) => {
        try {
            const response = await AdminService.CategorieAddService(req)
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
            const response = await AdminService.CategorieGetService(req)
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
            const response = await AdminService.ProductAddService(req, res)
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

    private BrandsGet = async (req: Request, res: Response) => {
        try {
            const response = await AdminService.BrandsGetSerive(req)
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

    private BrandsAdd = async (req: Request, res: Response) => {
        try {
            const response = await AdminService.BrandsAddService(req)
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

    private BannersAdd = async (req: Request, res: Response) => {
        try {
            const response = await AdminService.BannersAddService(req,res)
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
        this.router.post('/', this.adminRoute)

        this.router.post('/categories', this.CategorieAdd)
        this.router.get('/categories', this.CategorieGet)

        this.router.get('/brands', this.BrandsGet)
        this.router.post('/brands', this.BrandsAdd)


        this.router.post('/banner', this.BannersAdd)

        this.router.post('/products', this.ProductAdd)
    }

}
export default new AdminRouter().router