/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Workflow` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "publicId" TEXT,
ADD COLUMN     "shared" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_publicId_key" ON "Workflow"("publicId");
