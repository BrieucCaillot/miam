CREATE TABLE `foods` (
	`id` int NOT NULL AUTO_INCREMENT,
	`foodCategoryId` int NOT NULL,
	`name` varchar(500) NOT NULL,
	`description` varchar(500) NOT NULL,
	`subdescription` varchar(250) NOT NULL,
	`price` DECIMAL(4,2) NOT NULL,
	`available` tinyint(1) NOT NULL,
	`quantity` varchar(250) NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `foodcategories` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(250) NOT NULL,
	`image` varchar(250) NOT NULL,
	`available` tinyint(1) NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
	`id` int NOT NULL AUTO_INCREMENT,
	`firstname` varchar(191) NOT NULL,
	`lastname` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL UNIQUE,
	`password` varchar(191) NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `orders` (
	`id` int NOT NULL AUTO_INCREMENT,
	`userId` int NOT NULL,
	`price` DECIMAL(4,2) NOT NULL,
	`status` int(1) NOT NULL,
	`address` varchar(250) NOT NULL,
	`time` TIME NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `images` (
	`id` int NOT NULL AUTO_INCREMENT,
	`foodsId` int NOT NULL,
	`image` varchar(500) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `newsletters` (
	`id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(250) NOT NULL,
	`status` int(1) NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `foods` ADD CONSTRAINT `foods_fk0` FOREIGN KEY (`foodCategoryId`) REFERENCES `foodcategories`(`id`);

ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`ordersId`) REFERENCES `orders`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk0` FOREIGN KEY (`userId`) REFERENCES `users`(`id`);

ALTER TABLE `images` ADD CONSTRAINT `images_fk0` FOREIGN KEY (`foodsId`) REFERENCES `foods`(`id`);
