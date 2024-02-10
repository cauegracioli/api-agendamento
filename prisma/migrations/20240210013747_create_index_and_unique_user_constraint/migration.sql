/*
  Warnings:

  - A unique constraint covering the columns `[username,primary_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_username_primary_email_idx";

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_primary_email_key" ON "User"("username", "primary_email");
