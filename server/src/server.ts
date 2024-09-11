import express, { Express, Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import cors from 'cors'
import multer from 'multer'
import path from 'path';
import fs from 'node:fs'
const app: Express = express();
import { Prisma, PrismaClient } from '@prisma/client'
import { error } from 'console';
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
const products = [
    {
        id: 1,
        name: 'Classic White T-Shirt',
        price: 15.99,
        description: 'A comfortable and classic white t-shirt made from 100% cotton.',
        imageUrl: 'https://via.placeholder.com/150/000000/FFFFFF?text=Classic+White+T-Shirt',
    },
    {
        id: 2,
        name: 'Vintage Leather Wallet',
        price: 49.99,
        description: 'A stylish and durable leather wallet with multiple card slots.',
        imageUrl: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=Vintage+Leather+Wallet',
    },
    {
        id: 3,
        name: 'Wireless Headphones',
        price: 79.99,
        description: 'High-quality wireless headphones with noise-cancellation feature.',
        imageUrl: 'https://via.placeholder.com/150/FF4500/FFFFFF?text=Wireless+Headphones',
    },
    {
        id: 4,
        name: 'Eco-Friendly Water Bottle',
        price: 25.99,
        description: 'Reusable and eco-friendly water bottle, BPA-free.',
        imageUrl: 'https://via.placeholder.com/150/00CED1/FFFFFF?text=Eco-Friendly+Water+Bottle',
    },
    {
        id: 5,
        name: 'Running Shoes',
        price: 59.99,
        description: 'Lightweight and comfortable running shoes for everyday workouts.',
        imageUrl: 'https://via.placeholder.com/150/4B0082/FFFFFF?text=Running+Shoes',
    },
    {
        id: 6,
        name: 'Bluetooth Speaker',
        price: 39.99,
        description: 'Portable Bluetooth speaker with deep bass and long battery life.',
        imageUrl: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=Bluetooth+Speaker',
    },
    {
        id: 7,
        name: 'Sunglasses',
        price: 19.99,
        description: 'Trendy sunglasses with UV protection for sunny days.',
        imageUrl: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=Sunglasses',
    },
    {
        id: 8,
        name: 'Smartwatch',
        price: 129.99,
        description: 'Smartwatch with heart rate monitor, GPS, and customizable watch faces.',
        imageUrl: 'https://via.placeholder.com/150/008080/FFFFFF?text=Smartwatch',
    },
    {
        id: 9,
        name: 'Yoga Mat',
        price: 29.99,
        description: 'Non-slip yoga mat with extra cushioning for a comfortable workout.',
        imageUrl: 'https://via.placeholder.com/150/FF69B4/FFFFFF?text=Yoga+Mat',
    },
    {
        id: 10,
        name: 'Stainless Steel Watch',
        price: 199.99,
        description: 'Elegant stainless steel watch with water resistance up to 100 meters.',
        imageUrl: 'https://via.placeholder.com/150/808080/FFFFFF?text=Stainless+Steel+Watch',
    }
];

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.header('Origin') + req.url);
    next();
})

app.get('/product/ten', async (req: Request, res: Response) => {
    // await prisma.user.create({
    //     data: {
    //         name: 'Alice',
    //         email: 'alice@prisma.io'
    //     },
    // })
    res.status(200).json(products);
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
                callback(null, 'uploads/products')
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
                        img_path: file.destination + "/" + file.filename
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

app.get('/product/get/:product_id', async (req: Request, res: Response) => {
    try {
        const product_id = Number(req.params.product_id)
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