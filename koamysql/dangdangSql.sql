/*
 Navicat Premium Data Transfer

 Source Server         : locX
 Source Server Type    : MySQL
 Source Server Version : 50741 (5.7.41)
 Source Host           : localhost:3306
 Source Schema         : dangdang

 Target Server Type    : MySQL
 Target Server Version : 50741 (5.7.41)
 File Encoding         : 65001

 Date: 29/03/2023 23:11:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `ISBN` varchar(20) NOT NULL,
  `bookname` varchar(50) DEFAULT NULL,
  `author` varchar(20) NOT NULL,
  `publishid` int(11) DEFAULT NULL,
  `publishername` varchar(20) DEFAULT NULL,
  `monthsalecount` int(11) DEFAULT NULL,
  `bookpicname` varchar(255) DEFAULT NULL,
  `secondctgyid` int(11) DEFAULT NULL,
  `thirdctgyid` int(11) DEFAULT NULL,
  `originalprice` double(10,2) DEFAULT NULL,
  `discount` double(6,2) DEFAULT NULL,
  PRIMARY KEY (`ISBN`),
  KEY `fk_secid` (`secondctgyid`) USING BTREE,
  KEY `fk_thrdid` (`thirdctgyid`) USING BTREE,
  CONSTRAINT `fk_secid` FOREIGN KEY (`secondctgyid`) REFERENCES `secondctgy` (`secondctgyid`) ON UPDATE CASCADE,
  CONSTRAINT `fk_thrdid` FOREIGN KEY (`thirdctgyid`) REFERENCES `thirdctgy` (`thirdctgyid`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of books
-- ----------------------------
BEGIN;
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-101', '童年(小学语文\"快乐读书吧\".五年级阅读,高尔基自传体三部曲之一', '高尔基1', 1, '人民出版社', 7898, '1童年.png', 3, 13, 39.00, 0.98);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-102', '童年(高尔基自传小说3部曲之一.北师大教授郑海凌依据俄文原版翻', '郑海凌2', 1, '人民出版社', 7898, '2童年.png', 3, 13, 29.00, 0.98);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-103', '童年(快乐读书吧六年级上册推荐阅读(中小学生阅读指导丛书)无障碍', '王珍', 1, '人民出版社', 13452, '3童年.png', 3, 13, 27.00, 0.97);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-104', '童年(快乐读书吧 六年级上指定阅读语文 阅读丛书', '张海迪', 13, '陕西师范大学出版社', 23567, '4童年.png', 3, 13, 19.80, 0.90);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-105', '(未删减版) 六年级上 任教版名著阅读课程书 教材推荐书目 ', '周毅', 1, '人民出版社', 23567, '5童年.png', 3, 13, 37.80, 0.88);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-106', '（无障碍英语导读版快乐读书吧阅读丛书）六年级上', '张海迪', 1, '人民出版社', 19689, '6童年.png', 3, 13, 37.80, 0.88);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-107', '六年级下.任教版名著阅读课程书 教材推荐书目人', '周毅', 1, '人民出版社', 7455, '7童年.png', 3, 13, 8.80, 0.98);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-108', '童年 快乐读书吧六年级上册阅读(中学生课外指导书)插画无', '钟宏', 1, '人民出版社', 20873, '8童年.png', 3, 13, 37.80, 0.92);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-109', '新版童年(中学生课外指导书)插画无', '吴蔡婷', 1, '人民出版社', 9458, '9童年.png', 3, 13, 49.80, 0.89);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-201', '加量版漫画(幼儿园课外指导书)插画无', '海青', 1, '人民出版社', 9879, '6半小时漫画.png', 3, 15, 49.80, 0.89);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-202', '趣味童年(幼儿园课外指导书)插画无', '周婷', 1, '人民出版社', 8898, '8皮皮鲁转.png', 3, 15, 43.80, 0.88);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-203', '丛林漫画(幼儿园课外指导书)插画无', '汤姆森', 1, '人民出版社', 45689, '3汤姆历险记.png', 3, 15, 46.80, 0.89);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-204', '趣味童年(幼儿园课外指导书)插画无', '余秋雨', 1, '人民出版社', 29459, '2小王子.png', 3, 13, 58.80, 0.92);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-205', '瓦尔登湖:世界上最修心的地方', '梭罗', 1, '人民出版社', 15678, '瓦尔登湖.png', 5, 26, 46.80, 0.89);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-206', '活着,得有点兴致', '汪曾祺', 10, '江苏凤凰文艺出版社', 78120, '活着,得有点兴致.png', 5, 26, 28.80, 0.89);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-207', '紫图经典文库三岛由纪夫大集合(10册)', '三岛由纪夫', 12, '时代文艺出版社', 15678, '紫图经典文库.png', 5, 26, 36.80, 0.89);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-208', '庄子说什么', '韩鹏杰', 12, '时代文艺出版社', 78909, '庄子说什么.png', 5, 26, 28.80, 0.88);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-209', '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', '贾平凹', 12, '江苏凤凰文艺出版社', 13452, '人生从容.png', 5, 26, 9.89, 0.93);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-210', '有本事-继<<无所谓>>后睽违三年,冯唐全新书', '冯唐', 6, '北京联合出版公司', 8765, '有本事.png', 5, 26, 34.00, 0.93);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-211', '人生海海(敢死不是勇气,活着才需要勇气', '麦家', 12, '时代文艺出版社', 13452, '人生海海.png', 5, 27, 27.89, 0.89);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-212', '云边有个小卖部', '张嘉佳', 12, '时代文艺出版社', 8765, '云边有个小卖部.png', 5, 27, 10.99, 0.93);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-213', '追风筝的人', '卡麦得.胡塞尼', 12, '时代文艺出版社', 8198, '追风筝的人.png', 5, 27, 7.99, 0.90);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-214', '白夜行', '韩鹏杰', 12, '时代文艺出版社', 68798, '白夜行.png', 5, 26, 28.80, 0.88);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-215', '三体全集(全3册)', '刘慈欣', 4, '南海出版社', 8765, '三体全集.png', 5, 26, 9.89, 0.93);
INSERT INTO `books` (`ISBN`, `bookname`, `author`, `publishid`, `publishername`, `monthsalecount`, `bookpicname`, `secondctgyid`, `thirdctgyid`, `originalprice`, `discount`) VALUES ('978-7-216', '理想之城(全两册)', '若花燃燃', 4, '南海出版社', 13999, '理想之城.png', 5, 29, 7.99, 0.90);
COMMIT;

-- ----------------------------
-- Table structure for evaluate
-- ----------------------------
DROP TABLE IF EXISTS `evaluate`;
CREATE TABLE `evaluate` (
  `evaluateid` int(11) NOT NULL,
  `content` varchar(200) NOT NULL,
  `evaluator` varchar(20) NOT NULL COMMENT '评价人',
  `ISBN` varchar(20) NOT NULL COMMENT '图书主键',
  `headportrait` varchar(30) NOT NULL COMMENT '头像',
  `givealikenum` varchar(20) NOT NULL COMMENT '点赞数',
  `evaluatedegree` tinyint(1) NOT NULL COMMENT '好评，差评，中评',
  `pubdate` datetime(6) DEFAULT NULL COMMENT '发表日期',
  `isanonymous` tinyint(1) NOT NULL COMMENT '是否为匿名用户',
  PRIMARY KEY (`evaluateid`) USING BTREE,
  KEY `fk_ISBN` (`ISBN`),
  CONSTRAINT `fk_ISBN` FOREIGN KEY (`ISBN`) REFERENCES `books` (`ISBN`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of evaluate
-- ----------------------------
BEGIN;
INSERT INTO `evaluate` (`evaluateid`, `content`, `evaluator`, `ISBN`, `headportrait`, `givealikenum`, `evaluatedegree`, `pubdate`, `isanonymous`) VALUES (1, '好书', '文龙', '978-7-208', 'wangboyu.png', '300', 1, '2023-01-09 00:00:00.000000', 0);
INSERT INTO `evaluate` (`evaluateid`, `content`, `evaluator`, `ISBN`, `headportrait`, `givealikenum`, `evaluatedegree`, `pubdate`, `isanonymous`) VALUES (2, '好书2', '文龙208', '978-7-208', 'wangboyu.png', '400', 2, '2023-01-09 00:00:00.000000', 0);
INSERT INTO `evaluate` (`evaluateid`, `content`, `evaluator`, `ISBN`, `headportrait`, `givealikenum`, `evaluatedegree`, `pubdate`, `isanonymous`) VALUES (3, '好书3', '文龙208', '978-7-208', 'wangboyu.png', '500', 3, '2023-01-09 00:00:00.000000', 0);
INSERT INTO `evaluate` (`evaluateid`, `content`, `evaluator`, `ISBN`, `headportrait`, `givealikenum`, `evaluatedegree`, `pubdate`, `isanonymous`) VALUES (4, '好书4', '文龙206', '978-7-206', 'wangboyu.png', '300', 1, '2023-01-09 00:00:00.000000', 0);
INSERT INTO `evaluate` (`evaluateid`, `content`, `evaluator`, `ISBN`, `headportrait`, `givealikenum`, `evaluatedegree`, `pubdate`, `isanonymous`) VALUES (5, '好书5', '文龙206', '978-7-206', 'wangboyu.png', '310', 1, '2023-01-09 00:00:00.000000', 0);
INSERT INTO `evaluate` (`evaluateid`, `content`, `evaluator`, `ISBN`, `headportrait`, `givealikenum`, `evaluatedegree`, `pubdate`, `isanonymous`) VALUES (6, '好书6', '文龙206', '978-7-206', 'wangboyu.png', '320', 1, '2023-01-09 00:00:00.000000', 0);
INSERT INTO `evaluate` (`evaluateid`, `content`, `evaluator`, `ISBN`, `headportrait`, `givealikenum`, `evaluatedegree`, `pubdate`, `isanonymous`) VALUES (7, '好书7', '文龙209', '978-7-209', 'wangboyu.png', '340', 1, '2023-01-09 00:00:00.000000', 0);
INSERT INTO `evaluate` (`evaluateid`, `content`, `evaluator`, `ISBN`, `headportrait`, `givealikenum`, `evaluatedegree`, `pubdate`, `isanonymous`) VALUES (8, '好书8', '文龙209', '978-7-209', 'wangboyu.png', '305', 1, '2023-01-09 00:00:00.000000', 0);
INSERT INTO `evaluate` (`evaluateid`, `content`, `evaluator`, `ISBN`, `headportrait`, `givealikenum`, `evaluatedegree`, `pubdate`, `isanonymous`) VALUES (9, '好书1', '文龙208', '978-7-208', 'wangboyu.png', '300', 1, '2023-01-09 00:00:00.000000', 0);
COMMIT;

-- ----------------------------
-- Table structure for firstctgy
-- ----------------------------
DROP TABLE IF EXISTS `firstctgy`;
CREATE TABLE `firstctgy` (
  `firstCtgyId` int(11) NOT NULL AUTO_INCREMENT,
  `firstctgyname` varchar(20) NOT NULL,
  PRIMARY KEY (`firstCtgyId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of firstctgy
-- ----------------------------
BEGIN;
INSERT INTO `firstctgy` (`firstCtgyId`, `firstctgyname`) VALUES (1, '童书');
INSERT INTO `firstctgy` (`firstCtgyId`, `firstctgyname`) VALUES (2, '电子书');
INSERT INTO `firstctgy` (`firstCtgyId`, `firstctgyname`) VALUES (3, '女装');
INSERT INTO `firstctgy` (`firstCtgyId`, `firstctgyname`) VALUES (4, '食品');
INSERT INTO `firstctgy` (`firstCtgyId`, `firstctgyname`) VALUES (5, '男装');
INSERT INTO `firstctgy` (`firstCtgyId`, `firstctgyname`) VALUES (6, '数码相机');
INSERT INTO `firstctgy` (`firstCtgyId`, `firstctgyname`) VALUES (7, '创意文具');
INSERT INTO `firstctgy` (`firstCtgyId`, `firstctgyname`) VALUES (8, '童装童鞋');
COMMIT;

-- ----------------------------
-- Table structure for historykeyword
-- ----------------------------
DROP TABLE IF EXISTS `historykeyword`;
CREATE TABLE `historykeyword` (
  `historykeywordid` int(11) NOT NULL AUTO_INCREMENT,
  `historykeyword` varchar(30) NOT NULL,
  `clickcount` int(11) DEFAULT NULL,
  PRIMARY KEY (`historykeywordid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of historykeyword
-- ----------------------------
BEGIN;
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (1, '人生从容', 130);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (2, '人生海海', 17);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (3, '六年级上册', 5);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (4, '六年友谊', 2);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (5, '六年的苦练', 1);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (6, '大六山', 5);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (7, '五六', 6);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (8, '六年级下', 5);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (9, '快乐读书吧', 8);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (10, '北师大教授', 2);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (11, '人生', 5);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (12, '六年级', 42);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (14, '中学生课外指导', 4);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (15, '中学生', 7);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (16, '中小学生阅读', 3);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (17, '中小学生', 1);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (18, '文龙666', 4);
INSERT INTO `historykeyword` (`historykeywordid`, `historykeyword`, `clickcount`) VALUES (19, '文龙777', 1);
COMMIT;

-- ----------------------------
-- Table structure for keyword
-- ----------------------------
DROP TABLE IF EXISTS `keyword`;
CREATE TABLE `keyword` (
  `keywordid` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(30) NOT NULL,
  PRIMARY KEY (`keywordid`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of keyword
-- ----------------------------
BEGIN;
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (1, '童年');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (2, '小学阅文');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (3, '快乐读书吧');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (4, '北师大教授');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (5, '六年级上册');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (6, '六年级');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (7, '高尔基');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (8, '郑海凌');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (9, '中小学生阅读');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (10, '中小学生');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (11, '任教版');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (12, '六年级上');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (13, '六年级下');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (14, '五六');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (15, '六年友谊');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (16, '六年的苦练');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (17, '六六');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (18, '大六山');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (19, '英语导读');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (20, '中学生课外指导');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (21, '中学生');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (22, '加量版漫画');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (23, '漫画');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (24, '幼儿园');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (25, '丛林漫画');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (26, '活着');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (27, '人生');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (28, '人生从容');
INSERT INTO `keyword` (`keywordid`, `keyword`) VALUES (29, '人生海海');
COMMIT;

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `replyid` int(11) NOT NULL AUTO_INCREMENT,
  `replycontent` varchar(255) DEFAULT NULL,
  `replydate` date NOT NULL,
  `evalid` int(11) NOT NULL,
  `replyor` varchar(255) NOT NULL,
  PRIMARY KEY (`replyid`) USING BTREE,
  KEY `fk_evalid` (`evalid`) USING BTREE,
  CONSTRAINT `fk_evalid` FOREIGN KEY (`evalid`) REFERENCES `evaluate` (`evaluateid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of reply
-- ----------------------------
BEGIN;
INSERT INTO `reply` (`replyid`, `replycontent`, `replydate`, `evalid`, `replyor`) VALUES (4, '好书111', '2023-06-10', 1, '文龙666');
INSERT INTO `reply` (`replyid`, `replycontent`, `replydate`, `evalid`, `replyor`) VALUES (5, '好书555', '2023-06-15', 1, '文龙666');
INSERT INTO `reply` (`replyid`, `replycontent`, `replydate`, `evalid`, `replyor`) VALUES (6, '好书666', '2023-06-16', 1, '文龙666');
INSERT INTO `reply` (`replyid`, `replycontent`, `replydate`, `evalid`, `replyor`) VALUES (7, '好书777', '2023-06-17', 1, '文龙666');
INSERT INTO `reply` (`replyid`, `replycontent`, `replydate`, `evalid`, `replyor`) VALUES (8, '好书888', '2023-06-18', 1, '文龙666');
INSERT INTO `reply` (`replyid`, `replycontent`, `replydate`, `evalid`, `replyor`) VALUES (9, '好书5558889', '2023-03-26', 1, '文龙666');
COMMIT;

-- ----------------------------
-- Table structure for secondctgy
-- ----------------------------
DROP TABLE IF EXISTS `secondctgy`;
CREATE TABLE `secondctgy` (
  `secondctgyid` int(11) NOT NULL AUTO_INCREMENT,
  `secctgyname` varchar(20) NOT NULL,
  `firstctgyId` int(11) NOT NULL,
  PRIMARY KEY (`secondctgyid`),
  KEY `fk_firstctgyid` (`firstctgyId`),
  CONSTRAINT `fk_firstctgyid` FOREIGN KEY (`firstctgyId`) REFERENCES `firstctgy` (`firstCtgyId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of secondctgy
-- ----------------------------
BEGIN;
INSERT INTO `secondctgy` (`secondctgyid`, `secctgyname`, `firstctgyId`) VALUES (1, '0-2岁', 1);
INSERT INTO `secondctgy` (`secondctgyid`, `secctgyname`, `firstctgyId`) VALUES (2, '3-6岁', 1);
INSERT INTO `secondctgy` (`secondctgyid`, `secctgyname`, `firstctgyId`) VALUES (3, '7-10岁', 1);
INSERT INTO `secondctgy` (`secondctgyid`, `secctgyname`, `firstctgyId`) VALUES (4, '11-14岁', 1);
INSERT INTO `secondctgy` (`secondctgyid`, `secctgyname`, `firstctgyId`) VALUES (5, '文艺', 2);
INSERT INTO `secondctgy` (`secondctgyid`, `secctgyname`, `firstctgyId`) VALUES (6, '人文社科', 2);
INSERT INTO `secondctgy` (`secondctgyid`, `secctgyname`, `firstctgyId`) VALUES (7, '教育', 2);
COMMIT;

-- ----------------------------
-- Table structure for shopcart
-- ----------------------------
DROP TABLE IF EXISTS `shopcart`;
CREATE TABLE `shopcart` (
  `shopcartid` int(11) NOT NULL AUTO_INCREMENT,
  `bookisbn` varchar(20) NOT NULL,
  `bookname` varchar(50) NOT NULL,
  `bookpicname` varchar(60) NOT NULL,
  `bookprice` double NOT NULL,
  `userid` int(11) NOT NULL,
  `purcharsenum` int(11) DEFAULT '0',
  PRIMARY KEY (`shopcartid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of shopcart
-- ----------------------------
BEGIN;
INSERT INTO `shopcart` (`shopcartid`, `bookisbn`, `bookname`, `bookpicname`, `bookprice`, `userid`, `purcharsenum`) VALUES (24, '978-7-103', '童年(快乐读书吧六年级上册推荐阅读(中小学生阅读指导丛书)无障碍', '3童年.png', 26.19, 1, 6);
INSERT INTO `shopcart` (`shopcartid`, `bookisbn`, `bookname`, `bookpicname`, `bookprice`, `userid`, `purcharsenum`) VALUES (25, '978-7-101', '童年(小学语文\"快乐读书吧\".五年级阅读,高尔基自传体三部曲之一', '1童年.png', 38.22, 1, 2);
COMMIT;

-- ----------------------------
-- Table structure for thirdctgy
-- ----------------------------
DROP TABLE IF EXISTS `thirdctgy`;
CREATE TABLE `thirdctgy` (
  `thirdctgyid` int(11) NOT NULL AUTO_INCREMENT,
  `thirdctgyname` varchar(20) DEFAULT NULL,
  `secctgyid` int(11) DEFAULT NULL,
  PRIMARY KEY (`thirdctgyid`),
  KEY `fk_secctgyid` (`secctgyid`),
  CONSTRAINT `fk_secctgyid` FOREIGN KEY (`secctgyid`) REFERENCES `secondctgy` (`secondctgyid`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of thirdctgy
-- ----------------------------
BEGIN;
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (1, '图画故事', 1);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (2, '认知', 1);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (3, '益智游戏', 1);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (4, '纸板书', 1);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (5, '艺术课堂', 1);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (6, '入园准备', 1);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (7, '绘本', 2);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (8, '科普百科', 2);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (9, '少儿英语', 2);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (10, '乐高学习', 2);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (11, '入学准备', 2);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (12, '文学', 3);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (13, '科普百科', 3);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (14, '卡通动漫', 3);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (15, '童话', 3);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (16, '少儿英语', 3);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (17, '励志', 4);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (18, '地理', 4);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (19, '政治', 4);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (20, '趣味幽默', 4);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (21, '少儿英语', 4);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (22, '益智游戏', 4);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (23, '艺术课堂', 4);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (24, '游戏/手工', 4);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (25, '绘画', 4);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (26, '小说', 5);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (27, '哲理文学', 5);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (28, '传记', 5);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (29, '青春文学', 5);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (30, '动漫/幽默', 5);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (31, '艺术', 5);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (32, '古籍', 5);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (33, '法律', 5);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (34, '经济', 5);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (35, '宗教哲学', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (36, '历史', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (37, '传记', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (38, '教育', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (39, '社会科学', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (40, '艺术', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (41, '工具书', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (42, '教师用书', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (43, '考研', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (44, '公务员', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (45, '宗教哲学', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (46, '历史', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (47, '传记', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (48, '教育', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (49, '社会科学', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (50, '艺术', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (51, '工具书', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (52, '教师用书', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (53, '考研', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (54, '公务员', 6);
INSERT INTO `thirdctgy` (`thirdctgyid`, `thirdctgyname`, `secctgyid`) VALUES (55, '图书100', NULL);
COMMIT;

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `psw` varchar(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `valid` tinyint(4) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
BEGIN;
INSERT INTO `userinfo` (`userid`, `username`, `psw`, `address`, `valid`, `birth`) VALUES (1, '文龙', '123456', '江西赣州', 1, '2023-03-15');
INSERT INTO `userinfo` (`userid`, `username`, `psw`, `address`, `valid`, `birth`) VALUES (2, 'adv', 'adv ', '上海虹口', 1, '2023-03-15');
INSERT INTO `userinfo` (`userid`, `username`, `psw`, `address`, `valid`, `birth`) VALUES (3, '文龙666', '123456', '北京中关村', 1, '2023-02-28');
INSERT INTO `userinfo` (`userid`, `username`, `psw`, `address`, `valid`, `birth`) VALUES (4, '文龙777', '123456', '北京中关村', 1, '2023-02-28');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
