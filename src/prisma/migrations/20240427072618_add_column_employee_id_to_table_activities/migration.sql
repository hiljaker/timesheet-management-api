-- AlterTable
ALTER TABLE `activities` ADD COLUMN `employeeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
