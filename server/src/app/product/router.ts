import express, {Request, Response} from 'express'
import ProductService from './service'
import checkIfTokenExist from '../../auth/tokenValidation';
import {ServiceReturnInterface} from "../../config/interface";

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: /product/
 */
class ProductRoute {
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    /**
     * @swagger
     * /product/ten:
     *   get:
     *     tags:
     *       - Product
     *     summary: return first 10 user data
     *     description: just for testing purpose
     *     responses:
     *       200:
     *         description: Address added successfully
     *         content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          status:
     *                              type: boolean
     *                          message:
     *                              type: string
     *                              example : "data fetched successfully"
     *                          data:
     *                              type: object
     *
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    private ProductTen = async (req: Request, res: Response) => {
        try {
            const response: ServiceReturnInterface = await ProductService.ProductTenService(req)
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

    /**
     * @swagger
     * /product/categories:
     *   get:
     *     tags:
     *       - Product
     *     summary: fetch categories
     *     description: fetch all the categories of product
     *     responses:
     *       200:
     *         description:
     *         content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          status:
     *                              type: boolean
     *                          message:
     *                              type: string
     *                              example : "fetched successfully"
     *                          data:
     *                              type: object
     *
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    private GetCategories = async (req: Request, res: Response) => {
        try {
            const response: ServiceReturnInterface = await ProductService.GetCategoriesService(req)
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

    /**
     * @swagger
     * /product/subcategories:
     *   get:
     *     tags:
     *       - Product
     *     summary: fetch sub-categories
     *     description: fetch all the categories of product
     *     parameters:
     *       - in: query
     *         name: category_id
     *         schema:
     *           type: string
     *           required: true
     *     responses:
     *       200:
     *         description:
     *         content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          status:
     *                              type: boolean
     *                          message:
     *                              type: string
     *                              example : "fetched successfully"
     *                          data:
     *                              type: object
     *
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    private GetSubCategories = async (req: Request, res: Response) => {
        try {
            const response: ServiceReturnInterface = await ProductService.GetSubCategoriesService(req)
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

    /**
     * @swagger
     * /product/item/{product_id}:
     *   get:
     *     tags:
     *       - Product
     *     summary: fetch specific item
     *     description: fetch specific item
     *     parameters:
     *       - in: path
     *         name: product_id
     *         schema:
     *           type: string
     *           required: true
     *     responses:
     *       200:
     *         description:
     *         content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          status:
     *                              type: boolean
     *                          message:
     *                              type: string
     *                              example : "fetched successfully"
     *                          data:
     *                              type: object
     *
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    private GetItem = async (req: Request, res: Response) => {
        try {
            const response: ServiceReturnInterface = await ProductService.GetItemService(req)
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
    /**
     * @swagger
     * /product/get:
     *   get:
     *     tags:
     *       - Product
     *     summary: fetch product MAIN API
     *     parameters:
     *       - in: query
     *         name: filter
     *         schema:
     *           type: string
     *           required: false
     *       - in: query
     *         name: category_id
     *         schema:
     *           type: string
     *           required: false
     *       - in: query
     *         name: sub_category_id
     *         schema:
     *           type: string
     *           required: false
     *       - in: query
     *         name: brand_id
     *         schema:
     *           type: string
     *           required: false
     *       - in: query
     *         name: pg
     *         schema:
     *           type: string
     *           required: false
     *     responses:
     *       200:
     *         description:
     *         content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          status:
     *                              type: boolean
     *                          message:
     *                              type: string
     *                              example : "fetched successfully"
     *                          data:
     *                              type: object
     *
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    private GetProduct = async (req: Request, res: Response) => {
        try {
            const response: ServiceReturnInterface = await ProductService.GetProductService(req)
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
    /**
     * @swagger
     * /product/brands:
     *   get:
     *     tags:
     *       - Product
     *     summary: fetch all brands
     *     responses:
     *       200:
     *         description:
     *         content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          status:
     *                              type: boolean
     *                          message:
     *                              type: string
     *                              example : "fetched successfully"
     *                          data:
     *                              type: object
     *
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    private GetBrands = async (req: Request, res: Response) => {
        try {
            const response: ServiceReturnInterface = await ProductService.GetBrandsService(req)
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

    private WriteComment = async (req: Request, res: Response) => {
        try {
            const response: ServiceReturnInterface = await ProductService.WriteCommentService(req)
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

    private ReadComment = async (req: Request, res: Response) => {
        try {
            const response: ServiceReturnInterface = await ProductService.ReadCommentService(req)
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
    /**
     * @swagger
     * /product/addtocart:
     *   post:
     *     tags:
     *       - Product
     *     summary: add item to cart
     *     security :
     *      - bearerAuth : []
     *     description: add item to cart
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               user_id:
     *                 type: string
     *                 description: user id of logged-in user
     *               product_id:
     *                 type: string
     *                 description: product id of selected cart
     *               qty:
     *                 type: string
     *                 description: quantity of product
     *             required:
     *               - user_id
     *               - product_id
     *               - qty
     *     responses:
     *       200:
     *         $ref: "#/components/responses/Success"
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    private AddToCart = async (req: Request, res: Response) => {
        try {
            const response: ServiceReturnInterface = await ProductService.AddToCartService(req)
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

    private GetCart = async (req: Request, res: Response) => {
        try {
            const response: ServiceReturnInterface = await ProductService.GetCartService(req)
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
    private NewArrivalProduct = async (req: Request, res: Response) => {
        try {
            const response: ServiceReturnInterface = await ProductService.NewArrivalProductSerivce(req)
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

        this.router.get('/arrival/new', this.NewArrivalProduct)


        this.router.get('/categories', this.GetCategories)
        this.router.get('/subcategories', this.GetSubCategories)


        this.router.get('/brands', this.GetBrands)


        this.router.get('/item/:product_id', this.GetItem)

        this.router.post('/addtocart', this.AddToCart)


        this.router.post('/comment', checkIfTokenExist, this.WriteComment)
        this.router.get('/comment', this.ReadComment)


        this.router.post('/cart/add', checkIfTokenExist, this.AddToCart)
        this.router.get('/cart/get', checkIfTokenExist, this.GetCart)


    }
}

export default new ProductRoute().router;
