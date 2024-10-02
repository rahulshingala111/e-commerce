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

            console.log(req.query);
            const category_id: number = Number(req.query.category_id)
            if (category_id === 0) {
                const products = await prisma.product.findMany({
                    include: {
                        categories: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                    }
                })
                return {
                    status: true,
                    data: products
                }
            }
            else if (category_id) {
                const products = await prisma.product.findMany({
                    where: {
                        categories_id: category_id
                    },
                    include: {
                        categories: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                    }
                })

                return {
                    status: true,
                    data: products
                }

            } else {
                return {
                    status: false,
                    data: null,
                    message: 'send valid query params'
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