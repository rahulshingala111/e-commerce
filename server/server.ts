import express, {Express, Request, Response, NextFunction} from 'express';
import 'dotenv/config'
import cors from 'cors'

const app: Express = express();
import CONSTANTS from './src/config/constant'
import ProductRouter from './src/app/product/router';
import UserRouter from './src/app/user/router'
import AuthRouter from './src/app/auth/router';
import AdminRouter from './src/app/admin/router'
import MediaRouter from './src/app/media/router'
import PaymentRouter from './src/app/payment/router'

import checkIfTokenExist from './src/auth/tokenValidation';
import path from 'path';

import swaggerUI from 'swagger-ui-express'
import {swaggerSpec} from "./src/config/swagger";


app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200
}))


app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/product/image', express.static(CONSTANTS.path.product_store))
app.use('/banner/image', express.static(CONSTANTS.path.banner_store))

console.log('Serving static files from:', path.join(__dirname, 'product_store'));
console.log('Serving static files from:', path.join(__dirname, 'banner_store'));


app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url.includes('/api-docs/')) {
        next();
    } else {
        console.log(req.header('Origin') + req.url, "middleware");
        next();
    }
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * /test:
 *   get:
 *     summary: test
 *     description: test
 *     responses:
 *       200:
 *         description: test
 *       500:
 *         description: Internal server error
 */
app.get('/api/v1/test', (req: Request, res: Response) => {
    console.log(req.query)
    res.send({
        status: true,
        data: {
            name: 'rahul'
        }
    })
})

//ROUTES
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/product', ProductRouter)
app.use('/api/v1/user', checkIfTokenExist, UserRouter)
app.use('/api/v1/media', MediaRouter)
app.use('/api/v1/payment', PaymentRouter)


app.use('/api/v1/admin', AdminRouter)


const PORT = Number(process.env.PORT) | 3002;
app.listen(PORT, () => {
    console.log(`server initialized at ${PORT}`);
})
