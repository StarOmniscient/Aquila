/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `firstReleaseDate` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Game` table. All the data in the column will be lost.
  - Added the required column `title` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Game` DROP PRIMARY KEY,
    DROP COLUMN `firstReleaseDate`,
    DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `platform` VARCHAR(191) NULL,
    ADD COLUMN `rating` DOUBLE NULL,
    ADD COLUMN `releaseDate` DATETIME(3) NULL,
    ADD COLUMN `status` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Anime` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `coverUrl` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `releaseDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `rating` DOUBLE NULL,
    `episodes` INTEGER NULL,
    `seasons` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NULL,
    `coverUrl` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `releaseDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `rating` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movie` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `coverUrl` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `releaseDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `rating` DOUBLE NULL,
    `runtime` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TV` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `coverUrl` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `releaseDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `rating` DOUBLE NULL,
    `seasons` INTEGER NULL,
    `episodes` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Music` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `artist` VARCHAR(191) NULL,
    `coverUrl` VARCHAR(191) NULL,
    `releaseDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `rating` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnimeList` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `animeId` VARCHAR(191) NOT NULL,
    `progress` INTEGER NULL,
    `score` DOUBLE NULL,
    `status` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookList` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,
    `progress` INTEGER NULL,
    `score` DOUBLE NULL,
    `status` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieList` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `movieId` VARCHAR(191) NOT NULL,
    `score` DOUBLE NULL,
    `status` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TVList` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `tvId` VARCHAR(191) NOT NULL,
    `progress` INTEGER NULL,
    `score` DOUBLE NULL,
    `status` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameList` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `gameId` VARCHAR(191) NOT NULL,
    `progress` INTEGER NULL,
    `score` DOUBLE NULL,
    `status` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicList` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `musicId` VARCHAR(191) NOT NULL,
    `score` DOUBLE NULL,
    `status` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnimeList` ADD CONSTRAINT `AnimeList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeList` ADD CONSTRAINT `AnimeList_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Anime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookList` ADD CONSTRAINT `BookList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookList` ADD CONSTRAINT `BookList_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieList` ADD CONSTRAINT `MovieList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieList` ADD CONSTRAINT `MovieList_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TVList` ADD CONSTRAINT `TVList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TVList` ADD CONSTRAINT `TVList_tvId_fkey` FOREIGN KEY (`tvId`) REFERENCES `TV`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameList` ADD CONSTRAINT `GameList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameList` ADD CONSTRAINT `GameList_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicList` ADD CONSTRAINT `MusicList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicList` ADD CONSTRAINT `MusicList_musicId_fkey` FOREIGN KEY (`musicId`) REFERENCES `Music`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
