/*
  Warnings:

  - You are about to drop the column `aniListRatimg` on the `Anime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Anime` DROP COLUMN `aniListRatimg`,
    ADD COLUMN `aniListRating` DOUBLE NULL,
    ADD COLUMN `studio` VARCHAR(191) NULL;
