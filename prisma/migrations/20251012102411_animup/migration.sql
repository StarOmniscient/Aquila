/*
  Warnings:

  - A unique constraint covering the columns `[anilistID]` on the table `Anime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[malID]` on the table `Anime` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Anime` ADD COLUMN `anilistID` VARCHAR(191) NULL,
    ADD COLUMN `malID` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Anime_anilistID_key` ON `Anime`(`anilistID`);

-- CreateIndex
CREATE UNIQUE INDEX `Anime_malID_key` ON `Anime`(`malID`);
