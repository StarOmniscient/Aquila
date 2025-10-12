/*
  Warnings:

  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameToGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_GameToGenre` DROP FOREIGN KEY `_GameToGenre_A_fkey`;

-- DropForeignKey
ALTER TABLE `_GameToGenre` DROP FOREIGN KEY `_GameToGenre_B_fkey`;

-- DropTable
DROP TABLE `Genre`;

-- DropTable
DROP TABLE `_GameToGenre`;
