/*
  Warnings:

  - Made the column `lastRunAt` on table `Workflow` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Workflow" ALTER COLUMN "lastRunAt" SET NOT NULL;
