/*
  Warnings:

  - You are about to drop the column `ownerId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Client_id_userId_key";

-- DropIndex
DROP INDEX "Worker_id_userId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ownerId";
