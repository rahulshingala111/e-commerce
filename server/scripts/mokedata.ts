import {Prisma, PrismaClient} from "@prisma/client";
import {faker} from "@faker-js/faker";

const prisma = new PrismaClient();

const insertMockData = async () => {
    try {
        const BrandArray: Array<Prisma.brandCreateManyInput> = Array.from({length: 5}, () => ({
            name: faker.company.name(),
        }));

        const categoriesArray: Array<Prisma.categoriesCreateManyInput> = Array.from({length: 5}, () => ({
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
        }))

        const sub_categoriesArray: Array<Prisma.sub_categoriesCreateManyInput> = Array.from({length: 5}, (_, index: number) => ({
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            categories_id: index + 1
        }))

        const max = 5
        const min = 1
        const ProductArray: Array<Prisma.productCreateManyInput> = Array.from({length: 5}, (_, index: number) => ({
            title: faker.commerce.productName(),
            description: faker.commerce.productMaterial(),
            price: Number(faker.commerce.price({min: 1, max: 5000, dec: 0})),
            img_path: "product/image/1.jpg",
            metadata: {},
            categories_id: Number(Math.floor(Math.random() * (max - min + 1)) + min),
            sub_categories_id: Number(Math.floor(Math.random() * (max - min + 1)) + min),
            brand_id: Number(Math.floor(Math.random() * (max - min + 1)) + min)
        }))


        await prisma.brand.createMany({
            data: BrandArray,
        });
        await prisma.categories.createMany({
            data: categoriesArray,
        });
        await prisma.sub_categories.createMany({
            data: sub_categoriesArray,
        });
        await prisma.product.createMany({
            data: ProductArray,
        });


    } catch (e) {
        console.error("Something went wrong:", e);
    } finally {
        await prisma.$disconnect(); // Ensure the database connection is closed
        console.log("Script ran successfully");
    }
};

// Run the function
insertMockData();
