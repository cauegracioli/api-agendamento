/*
  Warnings:

  - You are about to drop the column `place` on the `Worker` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,hour,workerId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date,hour,clientId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `servicesId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workerId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "servicesId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "workerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "workerId" TEXT;

-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "place",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "placeId" TEXT;

-- CreateTable
CREATE TABLE "OpeningHours" (
    "id" SERIAL NOT NULL,
    "day_of_week" TEXT NOT NULL,
    "range_hours" TEXT NOT NULL,
    "placeId" TEXT,
    "workerId" TEXT,

    CONSTRAINT "OpeningHours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_date_hour_workerId_key" ON "Schedule"("date", "hour", "workerId");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_date_hour_clientId_key" ON "Schedule"("date", "hour", "clientId");

-- AddForeignKey
ALTER TABLE "OpeningHours" ADD CONSTRAINT "OpeningHours_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningHours" ADD CONSTRAINT "OpeningHours_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
