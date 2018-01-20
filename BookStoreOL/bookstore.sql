CREATE DATABASE `bookstore`;

USE `bookstore`;


DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `author` varchar(200) NOT NULL,
  `publishing` varchar(200) NOT NULL,
  `word_number` int DEFAULT 0,
  `version` varchar(15) DEFAULT NULL,
  `total_page` int DEFAULT 0,
  `print_number` int DEFAULT 0,
  `author_summary` text,
  `summary` text,
  `image` varchar(50),
  `price` int,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` int DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `uid` int(12) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `bank_card` varchar(30) DEFAULT NULL,
  `gender` varchar(6) DEFAULT "male",
  PRIMARY KEY (`id`),
  foreign key(uid) references user(id) on delete cascade on update cascade
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `shopkeeper`;

CREATE TABLE `shopkeeper` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `uid` int(12) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `income` int(12) DEFAULT 0,
  PRIMARY KEY (`id`),
  foreign key(uid) references user(id) on delete cascade on update cascade
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `uid` int(12) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`id`),
  foreign key(uid) references user(id) on delete cascade on update cascade
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `cid` int(10) NOT NULL,
  `order_time` bigint(20) NOT NULL,
  `bookid` int(12) NOT NULL,
  `book_num` int(12) DEFAULT 1,
  `full_address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  foreign key(cid) references customer(id) on delete cascade on update cascade,
  foreign key(bookid) references book(id) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
