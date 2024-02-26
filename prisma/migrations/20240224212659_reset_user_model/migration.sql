/*
  Warnings:

  - You are about to drop the column `full_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_salt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `primary_email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_primary_email_key";

-- DropIndex
DROP INDEX "User_username_primary_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "full_name",
DROP COLUMN "password",
DROP COLUMN "password_salt",
DROP COLUMN "phone",
DROP COLUMN "primary_email",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_email_key" ON "User"("username", "email");
