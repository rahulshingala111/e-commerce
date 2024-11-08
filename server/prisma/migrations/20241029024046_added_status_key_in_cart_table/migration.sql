/*
  Warnings:

  - You are about to drop the column `status` on the `cart_item` table. All the data in the column will be lost.
  - Added the required column `status` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "status" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "cart_item" DROP COLUMN "status";
