import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
const prisma = new PrismaClient();
class ProductService {


    public ProductTenService = async (req: Request) => {
        try {
            const fetchtenproduct = await prisma.product.findMany({
                take: 10,
                include: {
                    categories: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    brand: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            })
            return {
                status: true,
                data: fetchtenproduct
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

    public GetCategoriesService = async (req: Request) => {
        try {
            console.log(req.params);
            const category = await prisma.categories.findMany()
            return {
                status: true,
                data: category
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

    public GetItemService = async (req: Request) => {
        try {
            console.log(req.params.product_id);
            if (req.params.product_id) {
                const id: number = Number(req.params.product_id);
                const fetchItem = await prisma.product.findUnique({
                    where: { id: id }
                })
                console.log(fetchItem);

                return {
                    status: true,
                    data: fetchItem
                }
            } else {
                return {
                    staus: false,
                    data: null
                }
            }
        } catch (error) {
            console.log(error);
            return {
                staus: false,
                data: null,
                error: error
            }
        }
    }

    public AddToCartService = async (req: Request) => {
        try {

            console.log(req.header);


            return true;

        } catch (error) {
            console.log(error);
            return {
                staus: false,
                data: null,
                error: error
            }
        }
    }

    public GetProductService = async (req: Request) => {
        try {
            if (Object.keys(req.query).length !== 0) {
                const object = req.query;

                let query: Prisma.productFindManyArgs = { where: {}, take: 10, skip: 0 }

                console.log("object", req.query);
                if (object.hasOwnProperty('category_id') && object.category_id !== '0') {
                    query.where = {
                        ...query.where,
                        categories_id: Number(object.category_id)
                    }
                }
                if (object.hasOwnProperty('brand_id')) {
                    const brand_id: Array<number> = JSON.parse(object.brand_id as string)
                    if (brand_id.length > 0) {
                        query.where = {
                            ...query.where,
                            brand_id: { in: brand_id },
                        };
                    }
                }
                if (object.hasOwnProperty('pg')) {
                    const pg: number = Number(object.pg)
                    query.skip = pg <= 0 ? 0 : ((pg - 1) * 10)
                }
                console.log("query", query);

                const products = await prisma.product.findMany({
                    ...query,
                    include: {
                        categories: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        brand: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                })
                if (products.length > 0) {
                    return {
                        status: true,
                        message: 'data fetched successfully',
                        data: products
                    }
                } else {
                    return {
                        status: false,
                        message: 'No data found!',
                        data: null
                    }
                }

            } else {
                return {
                    status: false,
                    data: null,
                    message: 'send params correctly'
                }
            }

        } catch (error) {
            console.log(error);
            return {
                staus: false,
                data: null,
                message: 'server error!! something went wrong',
                error: error
            }
        }
    }

    public GetBrandsService = async (req: Request) => {
        try {
            const getbrands = await prisma.brand.findMany()
            return {
                status: true,
                data: getbrands
            }
        } catch (error) {
            console.log(error);
            return {
                staus: false,
                data: null,
                error: error
            }
        }
    }
    public WriteCommentService = async (req: Request) => {
        try {
            if (req.body.comment && req.body.product_id && req.body.rating) {
                const comment: string = req.body.comment
                const product_id: number = Number(req.body.product_id)
                const rating: number = Number(req.body.rating)

                const insertComment = await prisma.review.create({
                    data: {
                        review_string: comment,
                        product_id: product_id,
                        rating: rating
                    }
                })
                console.log(insertComment);
                return {
                    status: true,
                    data: insertComment,
                    message: 'comment added'
                }


            } else {
                return {
                    staus: false,
                    data: null,
                    message: "send params correctly "
                }
            }
        } catch (error) {
            console.log(error);
            return {
                staus: false,
                data: null,
                error: error
            }
        }
    }
    public ReadCommentService = async (req: Request) => {
        try {
            if (req.query.product_id) {
                const product_id: number = Number(req.query.product_id)

                const getProduct = await prisma.review.findMany({
                    where: {
                        product_id: product_id
                    }
                })
                return {
                    status: true,
                    data: getProduct,
                    messages: "fetched success"
                }
            } else {
                return {
                    staus: false,
                    data: null,
                    message: 'send params correclty'
                }
            }
        } catch (error) {
            console.log(error);
            return {
                staus: false,
                data: null,
                error: error
            }
        }
    }
}
export default new ProductService();