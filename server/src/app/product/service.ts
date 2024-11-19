import {Prisma, PrismaClient} from "@prisma/client";
import {Request} from "express"
import CONSTANT from "../../config/constant";
import {ServiceReturnInterface} from "../../config/interface";

const prisma = new PrismaClient();

class ProductService {


    public ProductTenService = async (req: Request): Promise<ServiceReturnInterface> => {
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
                data: fetchtenproduct,
                message: 'product'
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error,
                message: 'error'

            }
        }
    }

    public GetCategoriesService = async (req: Request): Promise<ServiceReturnInterface> => {
        try {
            console.log(req.params);
            const category = await prisma.categories.findMany({
                include: {
                    sub_categories: true
                }
            })
            return {
                status: true,
                data: category,
                message: 'fetched successfully'
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error,
                message: 'something went wrong'
            }
        }
    }

    public GetItemService = async (req: Request): Promise<ServiceReturnInterface> => {
        try {
            console.log(req.params.product_id);
            if (req.params.product_id) {
                const id: number = Number(req.params.product_id);
                const fetchItem = await prisma.product.findUnique({
                    where: {id: id}
                })
                console.log(fetchItem);

                return {
                    status: true,
                    data: fetchItem,
                    message: 'fetched successfully'
                }
            } else {
                return {
                    status: false,
                    data: null,
                    message: 'params missing'
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error,
                message: 'something went wrong'
            }
        }
    }

    public AddToCartService = async (req: Request): Promise<ServiceReturnInterface> => {
        try {
            const params = {
                user_id: Number(req.body.user_id),
                product_id: Number(req.body.product_id),
                qty: Number(req.body.qty)
            }
            const product = await prisma.product.findUniqueOrThrow({
                where: {
                    id: params.product_id
                }
            })
            const cart = await prisma.cart.findFirst({
                where: {
                    user_id: params.user_id,
                    status: CONSTANT.CART_STATUS.ACTIVE
                }
            })
            if (!cart) {
                const newCart = await prisma.cart.create({
                    data: {
                        user_id: params.user_id,
                        status: CONSTANT.CART_STATUS.ACTIVE
                    }
                })
                // new cart item
                const newCartItem = await prisma.cart_item.create({
                    data: {
                        user_id: params.user_id,
                        product_id: params.product_id,
                        qty: params.qty,
                        price: product.price,
                        cart_id: newCart.id
                    }
                })
                return {
                    status: true,
                    message: 'item added',
                    data: newCartItem
                }
            } else {
                const findifItemAlreadyExist = await prisma.cart_item.findFirst({
                    where: {
                        cart_id: cart.id,
                        product_id: params.product_id
                    },
                    take: 1
                })
                let returnData;
                if (findifItemAlreadyExist) {
                    const update_cart = await prisma.cart_item.update({
                        data: {
                            qty: findifItemAlreadyExist.qty + 1
                        },
                        where: {
                            id: findifItemAlreadyExist.id
                        }
                    })
                    returnData = update_cart
                } else {
                    returnData = await prisma.cart_item.create({
                        data: {
                            user_id: params.user_id,
                            product_id: params.product_id,
                            qty: params.qty,
                            price: product.price,
                            cart_id: cart.id
                        }
                    })
                }
                return {
                    status: true,
                    message: 'item added',
                    data: returnData
                }
            }

        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error,
                message: 'something went wrong'
            }
        }
    }

    public GetCartService = async (req: Request): Promise<ServiceReturnInterface> => {
        try {

            if (!req.body.user_id) {
                throw new Error("session expired");
            }

            const user_id = Number(req.body.user_id);
            const findCartItems = await prisma.cart.findFirst({
                where: {
                    user_id: user_id,
                    status: CONSTANT.CART_STATUS.ACTIVE
                },
                include: {
                    cart_item: {
                        include: {
                            product: {}
                        }
                    }
                }
            })
            console.log(findCartItems);
            if (findCartItems) {
                let sum = 0
                findCartItems.cart_item.map((element) => {
                    sum = sum + (element.price * element.qty)
                })
                Object.assign(findCartItems, {total_sum: sum})
                if (findCartItems.cart_item.length > 0) {
                    return {
                        status: true,
                        message: 'fetched successfully',
                        data: findCartItems
                    }
                } else {
                    return {
                        status: false,
                        data: null,
                        message: 'No cart item'
                    }
                }
            } else {
                return {
                    status: false,
                    data: null,
                    message: 'wroing!'
                }
            }


        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error,
                message: 'something went wrong'
            }
        }
    }
    public GetProductService = async (req: Request): Promise<ServiceReturnInterface> => {
        try {
            if (Object.keys(req.query).length !== 0) {
                const object = req.query;

                try {
                    object['filter'] = JSON.parse(object.filter as string)
                } catch (error) {
                    console.log(error)
                }

                let query: Prisma.productFindManyArgs = {where: {}, take: 10, skip: 0}

                if (object.hasOwnProperty('category_id') && object.category_id !== '0') {
                    query.where = {
                        ...query.where,
                        categories_id: Number(object.category_id)
                    }
                }
                if (object.hasOwnProperty('sub_category_id') && object.category_id !== '0') {
                    query.where = {
                        ...query.where,
                        sub_categories_id: Number(object.sub_category_id)
                    }
                }
                if (object.hasOwnProperty('brand_id')) {
                    const brand_id: Array<number> = JSON.parse(object.brand_id as string)
                    if (brand_id.length > 0) {
                        query.where = {
                            ...query.where,
                            brand_id: {in: brand_id},
                        };
                    }
                }
                if (object.hasOwnProperty('pg')) {
                    const pg: number = Number(object.pg)
                    query.skip = pg <= 0 ? 0 : ((pg - 1) * 10)
                }

                if (object.hasOwnProperty('filter')) {
                    console.log('inside filter', object.filter)

                    query.where = {
                        ...query.where,
                        // OR: [
                        //     {
                        //         metadata: {
                        //             path: [],
                        //             equals: ''
                        //         }
                        //     }
                        // ]
                    }
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
                        },
                        review: {
                            select: {
                                id: true,
                                rating: true,
                                review_string: true
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
                status: false,
                data: null,
                message: 'server error!! something went wrong',
                error: error
            }
        }
    }

    public GetBrandsService = async (req: Request): Promise<ServiceReturnInterface> => {
        try {
            const getbrands = await prisma.brand.findMany()
            return {
                status: true,
                data: getbrands,
                message: 'fetched successfully'
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error,
                message: 'something went wrong'
            }
        }
    }
    public WriteCommentService = async (req: Request): Promise<ServiceReturnInterface> => {
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
                    status: false,
                    data: null,
                    message: "send params correctly "
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error,
                message: 'something went wrong'
            }
        }
    }
    public ReadCommentService = async (req: Request): Promise<ServiceReturnInterface> => {
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
                    message: "fetched success"
                }
            } else {
                return {
                    status: false,
                    data: null,
                    message: 'send params correclty'
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error,
                message: 'something went wrong'
            }
        }
    }
    public NewArrivalProductSerivce = async (req: Request): Promise<ServiceReturnInterface> => {
        try {

            const findProduct = await prisma.product.findMany({
                select: {
                    id: true,
                    img_path: true
                },
                take: 9
            })
            return {
                status: true,
                message: "data fetched successfuly",
                data: findProduct
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error,
                message: 'something went wrong'
            }
        }
    }

    public GetSubCategoriesService = async (req: Request): Promise<ServiceReturnInterface> => {
        try {
            if (!req.query.category_id) {
                return {
                    status: false,
                    message: 'missing params',
                    data: null
                }
            }
            const category_id = Number(req.query.category_id)
            const fetchSubCategory = await prisma.sub_categories.findMany({
                where: {
                    categories_id: category_id
                },
                select: {
                    id: true,
                    name: true
                }
            })
            return {
                status: true,
                data: fetchSubCategory,
                message: 'fetched successfully'
            }


        } catch (error) {
            console.log(error);
            return {
                status: false,
                data: null,
                error: error,
                message: 'something went wrong'
            }
        }
    }
}

export default new ProductService();
