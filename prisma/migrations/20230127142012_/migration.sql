/*
  Warnings:

  - Added the required column `imgUrl` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "imgUrl" TEXT NOT NULL;
