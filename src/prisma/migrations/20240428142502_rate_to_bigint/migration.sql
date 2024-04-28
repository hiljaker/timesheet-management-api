/*
  Warnings:

  - You are about to alter the column `rate` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `employees` MODIFY `rate` BIGINT NOT NULL;
