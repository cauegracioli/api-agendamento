/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_salt" TEXT NOT NULL,
    "primary_email" TEXT NOT NULL,
    "email_confirmed" BOOLEAN NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Worker" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_salt" TEXT NOT NULL,
    "primary_email" TEXT NOT NULL,
    "email_confirmed" TEXT NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_username_key" ON "Client"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Client_primary_email_key" ON "Client"("primary_email");

-- CreateIndex
CREATE INDEX "Client_username_idx" ON "Client"("username");

-- CreateIndex
CREATE INDEX "Worker_username_name_idx" ON "Worker"("username", "name");
