/*
  Warnings:

  - You are about to drop the column `seasons` on the `Anime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Anime` DROP COLUMN `seasons`,
    ADD COLUMN `aniListRatimg` DOUBLE NULL,
    ADD COLUMN `malRating` DOUBLE NULL;

-- CreateTable
CREATE TABLE `AnimeSeason` (
    `id` VARCHAR(191) NOT NULL,
    `animeId` VARCHAR(191) NOT NULL,
    `season` INTEGER NOT NULL,
    `episodes` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnimeSeason` ADD CONSTRAINT `AnimeSeason_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Anime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
