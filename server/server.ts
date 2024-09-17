import express, { Express, Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import cors from 'cors'
const app: Express = express();
import CONSTANTS from './src/config/constant'
import ProductRouter from './src/app/product/router';
import UserRouter from './src/app/user/router'
import AuthRouter from './src/app/auth/router';

app.use(cors())
app.use(express.json())
app.use('/product/image', express.static(CONSTANTS.path.product_store))

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.header('Origin') + req.url, "middleware");
    next();
})

//ROUTES
app.use('/auth', AuthRouter)
app.use('/product', ProductRouter)
app.use('/user', UserRouter)

const PORT = Number(process.env.PORT) | 3002;
app.listen(PORT, () => {
    console.log(`server initialzed at ${PORT}`);
})