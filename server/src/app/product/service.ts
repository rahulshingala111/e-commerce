import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import fs from 'node:fs';
import multer from 'multer';
import path from 'path'
import CONSTANTS from "../../config/constant";
const prisma = new PrismaClient();
class ProductService {


    public ProductTenService = async (req: Request) => {
        try {
            const fetchtenproduct = await prisma.product.findMany({
                take: 10,
                // include: {
                //     categories: {
                //         select: {
                //             id: true,
                //             name: true
                //         }
                //     },
                // }
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
}
export default new ProductService();