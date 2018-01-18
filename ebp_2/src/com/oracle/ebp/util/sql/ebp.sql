-- MySQL dump 10.10
--
-- Host: localhost    Database: shopping
-- ------------------------------------------------------
-- Server version	5.0.18-nt

drop database IF EXISTS ebp;
create database ebp;
use ebp;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;  --（不需要改）
CREATE TABLE `user` (
  `uid` int(11) PRIMARY KEY auto_increment,
  `username` varchar(20) NOT NULL,	-- 登录名
  `password` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,		-- 真实姓名
  `gender` int NOT NULL,		-- 0为女,1为男
  `age` int NOT NULL,
  `idCard` varchar(18) NOT NULL,
  `address` varchar(255) NOT NULL,
  `telno` varchar(15) NOT NULL,
  -- `regTime` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  `regTime` timestamp NOT NULL default CURRENT_TIMESTAMP,  --注册时间（自动生成）
  `balance` double(10,2) default 0.00,	-- 账户余额
  `status` int(11) default 1		-- 0为禁用状态,1为激活状态
)DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `oid` int(11) PRIMARY KEY auto_increment,
  `commitTime` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `amount` double(10,2) NOT NULL ,  --订单总金额
  `uid` int(11) NOT NULL,
  FOREIGN KEY(uid) REFERENCES user(uid)  --订单数据属于哪个用户
)DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

--
-- Table structure for table `orderList`
--

DROP TABLE IF EXISTS `orderList`;
CREATE TABLE `orderList` (
  `lid` int(11) PRIMARY KEY auto_increment,
  `descs` varchar(255) NOT NULL, --描述(可改为外键到商品表的tid)
  `price` double(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,		-- 购票张数
  `amount` double(10,2) NOT NULL,  --该项金额
  `oid` int(11) NOT NULL,
   FOREIGN KEY(oid) REFERENCES orders(oid)
)DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

--
-- Table structure for table `adminUser`
--

DROP TABLE IF EXISTS `adminUser`;
CREATE TABLE `adminUser` (
  `aid` int(11) PRIMARY KEY auto_increment,
  `userName` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
)DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;  --商品（固定在一项上）
CREATE TABLE `ticket` (
  `tid` int(11) PRIMARY KEY auto_increment,
  `descs` varchar(255) NOT NULL,
  `startTime` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `amount` int(11) NOT NULL,		-- 总票数
  `balance` int(11) NOT NULL,		-- 剩余票数
  `price` double(10,2) NOT NULL,	-- 单价
  `status` int				-- 0为已停售状态,1为售票状态
)DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `ticketdetail`;
CREATE TABLE `ticketdetail` (
  `tdid` int(11) PRIMARY KEY auto_increment,
  `tId` int(11) NOT NULL,					-- 对应的票的id
  `descs` varchar(255) NOT NULL,			-- 描述内容，以特定字符分割
  `images` varchar(255) NOT NULL, 			-- 描述图片url，以逗号分割
  `sequence` varchar(255) NOT NULL, 		-- 记录图片和文字描述的顺序
  FOREIGN KEY(tId) REFERENCES ticket(tid)   
)DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


DROP TABLE IF EXISTS `shoppingcart`;
CREATE TABLE `shoppingcart` (
  `scid` int(11) PRIMARY KEY auto_increment,			 -- 购物车id
  `addTime` timestamp NOT NULL default CURRENT_TIMESTAMP,-- 购物车产生时间
  `userId` int(11) NOT NULL,
  FOREIGN KEY(userId) REFERENCES user(uid)
)DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `shoppingcartdetail`;
CREATE TABLE `shoppingcartdetail` (
  `scdid` int(11) PRIMARY KEY auto_increment,			-- 购物车细节id
  `scid` int(11) NOT NULL,								-- 对应购物车id
  `tId` int(11) NOT NULL,								-- 对应票的id
  `quantity` int(11) NOT NULL,							-- 购票数量
  FOREIGN KEY(scid) REFERENCES shoppingcart(scid),
  FOREIGN KEY(tId) REFERENCES ticket(tid)
)DEFAULT CHARSET=utf8;


-- Add Information for table `user`
insert into user values(1, 'jack', '123456', 'jack', 1, 21,'13648783263278847X', 'jbbjhkjl', '13801380000', '2012-09-09', 0, 1);

-- Add Information for table `adminUser`
insert into adminUser values(1, 'admin', '123456');

-- Add Information for table `orders`
insert into orders values(1, '2015-08-14 10:20:28', 200, 1);
insert into orders values(2, '2015-08-14 16:39:52', 300, 1);

-- Add Information for table `orderlist`
insert into orderlist values(1, 'addv', 100, 2, 200, 1);
insert into orderlist values(2, 'kjigh', 100, 2, 200, 2);
insert into orderlist values(3, 'dfasdf', 50, 2, 100, 2);

-- Add Information for table `ticket`
insert into ticket values(1, 'gdutyidg', '2015-08-13 08:30:00', 1200, 380, 86.00, 1);
insert into ticket values(2, 'kwegyhb', '2015-08-25 10:12:00', 200, 180, 186.00, 1);
insert into ticket values(3, 'ryg', '2015-05-26 10:56:00', 800, 320, 72.00, 1);
insert into ticket values(4, 'fgh', '2015-05-27 12:30:00', 300, 68, 65.00, 1);
insert into ticket values(5, 'ewrg', '2015-05-28 23:05:00', 650, 310, 90.00, 1);
insert into ticket values(6, 'asdvhg', '2015-08-12 01:22:00', 860, 120, 230.00, 1);
insert into ticket values(7, 'tdgf', '2015-08-13 06:15:00', 260, 30, 89.00, 1);
insert into ticket values(8, 'yre', '2015-08-29 22:30:00', 430, 10, 180.00, 0);
insert into ticket values(9, 'dvfb', '2015-08-14 21:38:00', 690, 62, 120.00, 1);
insert into ticket values(10, 'fbfb', '2015-08-15 15:29:00', 560, 120, 230.00, 1);
insert into ticket values(11, '3wds', '2015-08-16 17:32:00', 340, 0, 215.00, 0);
insert into ticket values(12, 'uyihg', '2015-08-17 13:00:00', 980, 620, 390.00, 1);
insert into ticket values(13, 'yufgv', '2015-08-18 16:03:00', 560, 80, 268.00, 1);
insert into ticket values(14, 'trgfvb', '2015-08-19 09:20:00', 268, 30, 32.00, 1);
insert into ticket values(15, 'ujhng', '2015-08-20 09:56:00', 128, 108, 67.00, 1);
insert into ticket values(16, 'edc', '2015-08-21 11:30:00', 120, 98, 53.00, 1);
insert into ticket values(17, 'nhju', '2015-08-11 14:23:00', 190, 36, 99.00, 1);
insert into ticket values(18, 'ytfd', '2015-08-23 17:48:00', 200, 8, 96.00, 1);
insert into ticket values(19, 'jmhngfvc', '2015-08-24 20:32:00', 330, 19, 196.00, 1);
