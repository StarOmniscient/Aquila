/*
  Warnings:

  - You are about to drop the column `coverId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `Cover` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_coverId_fkey`;

-- DropForeignKey
ALTER TABLE `GameGenre` DROP FOREIGN KEY `GameGenre_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `GameGenre` DROP FOREIGN KEY `GameGenre_genreId_fkey`;

-- DropIndex
DROP INDEX `Game_coverId_key` ON `Game`;

-- AlterTable
ALTER TABLE `Game` DROP COLUMN `coverId`,
    ADD COLUMN `coverUrl` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Cover`;

-- DropTable
DROP TABLE `GameGenre`;

-- CreateTable
CREATE TABLE `_GameToGenre` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GameToGenre_AB_unique`(`A`, `B`),
    INDEX `_GameToGenre_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GameToGenre` ADD CONSTRAINT `_GameToGenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameToGenre` ADD CONSTRAINT `_GameToGenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
