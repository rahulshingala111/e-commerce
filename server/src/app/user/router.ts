import express, {Request, Response} from 'express';
import UserRoutesService from './service';

/**
 * @swagger
 * tags:
 *   name: User Routes
 *   description: Routes related to user actions
 */
class UserRoutes {
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }


    /**
     * @swagger
     * /address:
     *   get:
     *     tags:
     *       - User Routes
     *     summary: Fetch user address
     *     description: Retrieve the list of user addresses.
     *     responses:
     *       200:
     *         description: Successfully fetched user addresses
     *       500:
     *         description: Internal server error
     */
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

    /**
     * @swagger
     * /address/add:
     *   post:
     *     tags:
     *       - User Routes
     *     summary: Add a new address
     *     description: Add a new address for the user.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               street:
     *                 type: string
     *                 description: Street name of the address
     *               city:
     *                 type: string
     *                 description: City name
     *               postalCode:
     *                 type: string
     *                 description: Postal code
     *             required:
     *               - street
     *               - city
     *               - postalCode
     *     responses:
     *       200:
     *         description: Address added successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
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

    private GetUserDetail = async (req: Request, res: Response) => {
        try {
            const response = await UserRoutesService.GetUserDetailService(req)
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

        this.router.get('/', this.GetUserDetail)


        this.router.get('/address', this.UserAddresses)
        this.router.post('/address/add', this.UserAddAddress)


    }
}

export default new UserRoutes().router;
