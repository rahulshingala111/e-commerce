import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import fs from 'node:fs';
import multer from 'multer';
import path from 'path'
import CONSTANTS from "../../constants/constant";
const prisma = new PrismaClient();
class ProductService {


    async ImageProductGetRouteService(req: Request) {
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
                // res.send(file)
                return (file)
            }
            // res.send(true)
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error
            }
        }
    }

    async ProductAddService(req: Request, res: Response) {
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
                    return {
                        status: true,
                        data: null,
                        error: null
                    }
                }
            })
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error
            }
        }
    }

    async ProductTenService(req: Request) {
        try {
            const fetchtenproduct = await prisma.product.findMany({
                take: 10
            })
            return fetchtenproduct
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error
            }
        }
    }
}
export default new ProductService();