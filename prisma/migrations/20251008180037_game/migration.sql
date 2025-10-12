-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `firstReleaseDate` DATETIME(3) NOT NULL,
    `coverId` INTEGER NULL,

    UNIQUE INDEX `Game_coverId_key`(`coverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cover` (
    `id` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameGenre` (
    `gameId` INTEGER NOT NULL,
    `genreId` INTEGER NOT NULL,

    PRIMARY KEY (`gameId`, `genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_coverId_fkey` FOREIGN KEY (`coverId`) REFERENCES `Cover`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameGenre` ADD CONSTRAINT `GameGenre_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameGenre` ADD CONSTRAINT `GameGenre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
