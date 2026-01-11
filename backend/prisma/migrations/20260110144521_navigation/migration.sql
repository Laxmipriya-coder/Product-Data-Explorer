/*
  Warnings:

  - The primary key for the `ProductDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductDetail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- AlterTable
ALTER TABLE "ProductDetail" DROP CONSTRAINT "ProductDetail_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("productId");
