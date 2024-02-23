/*
  Warnings:

  - You are about to drop the column `email_confirmed` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `password_salt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `primary_email` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `email_confirmed` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `password_salt` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `primary_email` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `email_confirmed` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `password_salt` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `primary_email` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Worker` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('OWNER', 'WORKER', 'CLIENT');

-- DropIndex
DROP INDEX "Client_primary_email_key";

-- DropIndex
DROP INDEX "Client_username_idx";

-- DropIndex
DROP INDEX "Client_username_key";

-- DropIndex
DROP INDEX "Worker_username_name_idx";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "email_confirmed",
DROP COLUMN "full_name",
DROP COLUMN "password",
DROP COLUMN "password_salt",
DROP COLUMN "phone",
DROP COLUMN "primary_email",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "email_confirmed",
DROP COLUMN "full_name",
DROP COLUMN "password",
DROP COLUMN "password_salt",
DROP COLUMN "primary_email",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "email_confirmed",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "password_salt",
DROP COLUMN "primary_email",
DROP COLUMN "username";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_salt" TEXT NOT NULL,
    "primary_email" TEXT NOT NULL,
    "ownerId" TEXT,
    "workerId" TEXT,
    "clientId" TEXT,
    "phone" TEXT NOT NULL,
    "userType" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
