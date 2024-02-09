/*
  Warnings:

  - Added the required column `phone` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Services" ALTER COLUMN "time" SET DEFAULT 30;

-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "delivery" BOOLEAN NOT NULL,
ADD COLUMN     "place" TEXT;

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "where" TEXT,
    "observation" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);
