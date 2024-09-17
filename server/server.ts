import express, { Express, Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import cors from 'cors'
import multer from 'multer'
import path from 'path';
import fs from 'node:fs'
const app: Express = express();
import { Prisma, PrismaClient } from '@prisma/client'
import CONSTANTS from './src/constants/constant'
import ProductRouter from './src/app/product/router';
import UserRouter from './src/app/user/router'
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use('/product/image', express.static(CONSTANTS.path.product_store))


app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.header('Origin') + req.url);
    next();
})

app.use('/product', ProductRouter)
app.use('/user', UserRouter)


const PORT = Number(process.env.PORT) | 3002;
app.listen(PORT, () => {
    console.log(`server initialzed at ${PORT}`);
})