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
                    name: req.query.categories_name as string,
                    description: req.query.categories_description as string
                }
            })

            return {
                status: true,
                data: insertIntoCategories
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
                },
                brand: {
                    connect: { id: Number(req.query.product_brand) }
                },
                sub_categories: {
                    connect: { id: Number(req.query.sub_categories_id) }
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

    public BrandsGetSerive = async (req: Request) => {
        try {
            const getBrands = await prisma.brand.findMany()

            return {
                status: true,
                data: getBrands
            }

        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error
            }
        }
    }

    public BrandsAddService = async (req: Request) => {
        try {
            if (req.body.brand) {
                const brand = req.body.brand as string
                const insertBrand = await prisma.brand.create({
                    data: {
                        name: brand
                    }
                })
                return {
                    status: true,
                    data: insertBrand
                }
            } else {
                return {
                    stauts: false,
                    data: null,
                    message: 'enter query proper'
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error
            }
        }
    }
    public BannersAddService = async (req: Request, res: Response) => {

        console.log(req.query);
        if (!req.query) {
            return {
                status: false
            }
        }
        const params = {
            category: req.query.category as string,
            status: req.query.status === 'true' ? true : false
        }
        const insertBanner = await prisma.banners.create({
            data: {
                categories: params.category,
                is_active: params.status,
                img_path: ''
            }
        })
        const bannerName = insertBanner.id


        const storage: multer.StorageEngine = multer.diskStorage({
            destination: (req, file, callback) => {
                console.log('file', file);
                callback(null, CONSTANTS.path.banner_store)
            },
            filename: (req, file, callback) => {
                console.log(`${bannerName}${path.extname(file.originalname)}`);
                callback(null, `${bannerName}${path.extname(file.originalname)}`)
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
                const updateFilePath = await prisma.banners.update({
                    where: {
                        id: bannerName
                    },
                    data: {
                        img_path: CONSTANTS.path.banner_image + "/" + file.filename
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

    }
    public AddSubCategoriesService = async (req: Request) => {
        try {
            console.log(req.body);
            if (req.body) {
                const params = {
                    name: req.body.name as string,
                    description: req.body.description as string,
                    categories_id: Number(req.body.categories_id)
                }

                const insert = await prisma.sub_categories.create({
                    data: {
                        name: params.name,
                        description: params.name,
                        categories: {
                            connect: {
                                id: params.categories_id
                            }
                        }
                    }
                })

                return {
                    stauts: true,
                    data: insert,
                    message: 'insert success'
                }

            } else {
                //
            }

        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error
            }
        }
    }

    public GetSubCategoreisService = async (req: Request) => {
        try {

            const categories_id = Number(req.query.categories_id)

            const sub_categories = await prisma.sub_categories.findMany({
                where: {
                    categories_id: categories_id
                }
            })

            return {
                stauts: true,
                data: sub_categories
            }

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