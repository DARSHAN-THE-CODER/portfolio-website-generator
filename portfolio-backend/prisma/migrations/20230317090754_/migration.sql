/*
  Warnings:

  - Changed the type of `percentage` on the `Skills` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "percentage",
ADD COLUMN     "percentage" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AllowedDomains" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "AllowedDomains_pkey" PRIMARY KEY ("id")
);
