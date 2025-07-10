-- CreateTable
CREATE TABLE `temporalUrls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `longUrl` VARCHAR(191) NOT NULL,
    `codeUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `temporalUrls_codeUrl_key`(`codeUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
