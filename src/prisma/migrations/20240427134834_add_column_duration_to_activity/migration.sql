/*
  Warnings:

  - Added the required column `duration` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activities` ADD COLUMN `duration` INTEGER NOT NULL;
