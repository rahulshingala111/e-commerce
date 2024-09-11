-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "img_path" TEXT,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
