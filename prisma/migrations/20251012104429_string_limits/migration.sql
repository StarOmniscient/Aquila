-- AlterTable
ALTER TABLE `Anime` MODIFY `title` TEXT NOT NULL,
    MODIFY `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Book` MODIFY `title` TEXT NOT NULL,
    MODIFY `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Game` MODIFY `description` LONGTEXT NULL,
    MODIFY `title` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Movie` MODIFY `title` TEXT NOT NULL,
    MODIFY `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Music` MODIFY `title` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `TV` MODIFY `title` TEXT NOT NULL,
    MODIFY `description` LONGTEXT NULL;
