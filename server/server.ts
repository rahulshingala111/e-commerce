import express, { Express, Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import cors from 'cors'
import multer from 'multer'
import path from 'path';
import fs from 'node:fs'
const app: Express = express();
import { Prisma, PrismaClient } from '@prisma/client'
import CONSTANTS from './src/constants/constant'
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use('/product/image', express.static(CONSTANTS.path.product_store))


app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.header('Origin') + req.url);
    next();
})

app.get('/product/ten', async (req: Request, res: Response) => {
    try {
        const fetchtenproduct = await prisma.product.findMany({
            take: 10
        })
        res.send(fetchtenproduct)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            data: null,
            error: error
        })
    }
})


app.post('/product/add', async (req: Request, res: Response) => {
    try {

        let product: Prisma.productCreateInput;
        product = {
            title: req.query.product_name as string,
            description: req.query.product_description as string,
            price: Number(req.query.product_price)
        }

        const insertedData = await prisma.product.create({ data: product })

        console.log(insertedData);
        const filename = insertedData.id;


        const storage: multer.StorageEngine = multer.diskStorage({
            destination: (req, file, callback) => {
                console.log('file', file);
                callback(null, CONSTANTS.path.product_store)
            },
            filename: (req, file, callback) => {
                console.log(`${filename}${path.extname(file.originalname)}`);

                callback(null, `${filename}${path.extname(file.originalname)}`)
            }
        })

        const upload = multer({ storage: storage }).array('file', 10)

        upload(req, res, async (err) => {
            if (err) {
                console.log(err);
                throw new err;
            }
            //@ts-ignore
            let file = req.files[0]
            if (file) {
                const updateFilePath = await prisma.product.update({
                    where: {
                        id: insertedData.id
                    },
                    data: {
                        img_path: CONSTANTS.path.product_image + "/" + file.filename
                    }
                })
                console.log(updateFilePath);
                res.status(200).json({
                    status: true,
                    data: null,
                    error: null
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            data: null,
            error: error
        })
    }
})

app.get('/product/image/get/:product_id', async (req: Request, res: Response) => {
    try {
        const product_id = Number(req.params.product_id)
        console.log(product_id);

        const getimage = await prisma.product.findUnique({
            where: {
                id: product_id
            }
        })
        if (getimage) {
            const img_path = getimage.img_path as string
            const file = fs.readFileSync(img_path);
            console.log(file);

            console.log(getimage?.img_path);
            res.send(file)
        }
        // res.send(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            data: null,
            error: error
        })
    }
})

const PORT = Number(process.env.PORT) | 3002;
app.listen(PORT, () => {
    console.log(`server initialzed at ${PORT}`);
})