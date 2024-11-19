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

import chackIfTokenExist from './src/auth/tokenValidation';
import path from 'path';
import Razorpay from 'razorpay'

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200
}))


app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/product/image', express.static(CONSTANTS.path.product_store))
app.use('/banner/image', express.static(CONSTANTS.path.banner_store))

console.log('Serving static files from:', path.join(__dirname, 'product_store'));
console.log('Serving static files from:', path.join(__dirname, 'banner_store'));


app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.header('Origin') + req.url, "middleware");
    next();
})


app.get('/api/v1/sample', (req, res) => {
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
app.use('/api/v1/user', chackIfTokenExist, UserRouter)
app.use('/api/v1/media', MediaRouter)
app.use('/api/v1/payment', PaymentRouter)


app.use('/api/v1/admin', AdminRouter)


const PORT = Number(process.env.PORT) | 3002;
app.listen(PORT, () => {
    console.log(`server initialzed at ${PORT}`);
})
