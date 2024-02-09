-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_salt" TEXT NOT NULL,
    "primary_email" TEXT NOT NULL,
    "email_confirmed" BOOLEAN NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_primary_email_key" ON "Users"("primary_email");

-- CreateIndex
CREATE INDEX "Users_username_idx" ON "Users"("username");
