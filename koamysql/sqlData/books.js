// DROP TABLE IF EXISTS books;
// CREATE TABLE books (
// ISBN varchar(20) NOT NULL,
// bookname varchar(50) NULL DEFAULT NULL,
// author varchar(20) NOT NULL,
// publishid int NULL DEFAULT NULL,
// publishername varchar(20) NULL DEFAULT NULL,
// monthsalecount int NULL DEFAULT NULL,
// bookpicname varchar(255) NULL DEFAULT NULL,
// secondctgyid int NULL DEFAULT NULL,
// thirdctgyid int NULL DEFAULT NULL,
// originalprice double(10, 2) NULL DEFAULT NULL,
// discount double(6, 2) NULL DEFAULT NULL,
// PRIMARY KEY (ISBN),
// INDEX fk_secid(secondctgyid) USING BTREE,
// INDEX fk_thrdid(thirdctgyid) USING BTREE,
// CONSTRAINT fk_secid FOREIGN KEY (secondctgyid) REFERENCES secondctgy (secondctgyid) ON UPDATE CASCADE,
// CONSTRAINT fk_thrdid FOREIGN KEY (thirdctgyid) REFERENCES thirdctgy (thirdctgyid) ON UPDATE CASCADE
// )

/*
INSERT INTO books VALUES ('978-7-101', '童年(小学语文"快乐读书吧".五年级阅读,高尔基自传体三部曲之一', '高尔基', 1, '人民出版社', 7898, '1童年.png', 3, 13, 39.00, 0.98);
INSERT INTO books VALUES ('978-7-102', '童年(高尔基自传小说3部曲之一.北师大教授郑海凌依据俄文原版翻', '郑海凌', 1, '人民出版社', 7898, '2童年.png', 3, 13, 29.00, 0.98);
INSERT INTO books VALUES ('978-7-103', '童年(快乐读书吧六年级上册推荐阅读(中小学生阅读指导丛书)无障碍', '王珍', 1, '人民出版社', 13452, '3童年.png', 3, 13, 27.00, 0.97);
INSERT INTO books VALUES ('978-7-104', '童年(快乐读书吧 六年级上指定阅读语文 阅读丛书', '张海迪', 13, '陕西师范大学出版社', 23567, '4童年.png', 3, 13, 19.80, 0.90);
INSERT INTO books VALUES ('978-7-105', '(未删减版) 六年级上 任教版名著阅读课程书 教材推荐书目 ', '周毅', 1, '人民出版社', 23567, '5童年.png', 3, 13, 37.80, 0.88);
INSERT INTO books VALUES ('978-7-106', '（无障碍英语导读版快乐读书吧阅读丛书）六年级上', '张海迪', 1, '人民出版社', 19689, '6童年.png', 3, 13, 37.80, 0.88);
INSERT INTO books VALUES ('978-7-107', '六年级下.任教版名著阅读课程书 教材推荐书目人', '周毅', 1, '人民出版社', 7455, '7童年.png', 3, 13, 8.80, 0.98);
INSERT INTO books VALUES ('978-7-108', '童年 快乐读书吧六年级上册阅读(中学生课外指导书)插画无', '钟宏', 1, '人民出版社', 20873, '8童年.png', 3, 13, 37.80, 0.92);
INSERT INTO books VALUES ('978-7-109', '新版童年(中学生课外指导书)插画无', '吴蔡婷', 1, '人民出版社', 9458, '9童年.png', 3, 13, 49.80, 0.89);
INSERT INTO books VALUES ('978-7-201', '加量版漫画(幼儿园课外指导书)插画无', '海青', 1, '人民出版社', 9879, '6半小时漫画.png', 3, 15, 49.80, 0.89);
INSERT INTO books VALUES ('978-7-202', '趣味童年(幼儿园课外指导书)插画无', '周婷', 1, '人民出版社', 8898, '8皮皮鲁转.png', 3, 15, 43.80, 0.88);
INSERT INTO books VALUES ('978-7-203', '丛林漫画(幼儿园课外指导书)插画无', '汤姆森', 1, '人民出版社', 45689, '3汤姆历险记.png', 3, 15, 46.80, 0.89);
INSERT INTO books VALUES ('978-7-204', '趣味童年(幼儿园课外指导书)插画无', '余秋雨', 1, '人民出版社', 29459, '2小王子.png', 3, 13, 58.80, 0.92);
INSERT INTO books VALUES ('978-7-205', '瓦尔登湖:世界上最修心的地方', '梭罗', 1, '人民出版社', 15678, '瓦尔登湖.png', 5, 26, 46.80, 0.89);
INSERT INTO books VALUES ('978-7-206', '活着,得有点兴致', '汪曾祺', 10, '江苏凤凰文艺出版社', 78120, '活着,得有点兴致.png', 5, 26, 28.80, 0.89);
INSERT INTO books VALUES ('978-7-207', '紫图经典文库三岛由纪夫大集合(10册)', '三岛由纪夫', 12, '时代文艺出版社', 15678, '紫图经典文库.png', 5, 26, 36.80, 0.89);
INSERT INTO books VALUES ('978-7-208', '庄子说什么', '韩鹏杰', 12, '时代文艺出版社', 78909, '庄子说什么.png', 5, 26, 28.80, 0.88);
INSERT INTO books VALUES ('978-7-209', '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', '贾平凹', 12, '江苏凤凰文艺出版社', 13452, '人生从容.png', 5, 26, 9.89, 0.93);
INSERT INTO books VALUES ('978-7-210', '有本事-继<<无所谓>>后睽违三年,冯唐全新书', '冯唐', 6, '北京联合出版公司', 8765, '有本事.png', 5, 26, 34.00, 0.93);
INSERT INTO books VALUES ('978-7-211', '人生海海(敢死不是勇气,活着才需要勇气', '麦家', 12, '时代文艺出版社', 13452, '人生海海.png', 5, 27, 27.89, 0.89);
INSERT INTO books VALUES ('978-7-212', '云边有个小卖部', '张嘉佳', 12, '时代文艺出版社', 8765, '云边有个小卖部.png', 5, 27, 10.99, 0.93);
INSERT INTO books VALUES ('978-7-213', '追风筝的人', '卡麦得.胡塞尼', 12, '时代文艺出版社', 8198, '追风筝的人.png', 5, 27, 7.99, 0.90);
INSERT INTO books VALUES ('978-7-214', '白夜行', '韩鹏杰', 12, '时代文艺出版社', 68798, '白夜行.png', 5, 26, 28.80, 0.88);
INSERT INTO books VALUES ('978-7-215', '三体全集(全3册)', '刘慈欣', 4, '南海出版社', 8765, '三体全集.png', 5, 26, 9.89, 0.93);
INSERT INTO books VALUES ('978-7-216', '理想之城(全两册)', '若花燃燃', 4, '南海出版社', 13999, '理想之城.png', 5, 29, 7.99, 0.90);


*/