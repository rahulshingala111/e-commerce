import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import CONSTANTS from "../../config/constant";
import multer from "multer";
import path from "path";
const prisma = new PrismaClient();
class AdminService {
    public CategorieAddService = async (req: Request) => {
        try {
            const insertIntoCategories = await prisma.categories.create({
                data: {
                    name: req.query.categorie_name as string,
                    description: req.query.categorie_description as string
                }
            })

            return insertIntoCategories;
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error
            }
        }
    }

    public CategorieGetService = async (req: Request) => {
        try {
            console.log(req.query);

            const getCategories = await prisma.categories.findMany()

            return {
                status: true,
                message: "fetched successfull",
                data: getCategories
            };
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error
            }
        }
    }


    public ProductAddService = async (req: Request, res: Response) => {
        try {

            let product: Prisma.productCreateInput;
            product = {
                title: req.query.product_name as string,
                description: req.query.product_description as string,
                price: Number(req.query.product_price),
                categories: {
                    connect: { id: Number(req.query.product_categorie) }
                }
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
}
export default new AdminService()