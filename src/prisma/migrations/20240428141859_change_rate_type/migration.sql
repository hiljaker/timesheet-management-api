/*
  Warnings:

  - You are about to alter the column `rate` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE `employees` MODIFY `rate` DECIMAL(15, 2) NOT NULL;
