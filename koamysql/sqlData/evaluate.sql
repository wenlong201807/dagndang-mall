drop table if exists `evaluate`;
create table`dangdang`.`evaluate`(
  `evaluateid` int(11) NOT NULL ,
  `content` varchar(200) NOT NULL,
  `evaluator` varchar(20) NOT NULL comment '评价人',
  `ISBN` varchar(20) NOT NULL comment '图书主键',
  `headportrait` varchar(30) NOT NULL comment '头像',
  `givealikenum` varchar(20) NOT NULL comment '点赞数',
  `evaluatedegree` tinyint(1) NOT NULL comment '好评，差评，中评',
  `pubdate` datetime(6)  NULL comment '发表日期',
  isanonymous tinyint(1) NOT NULL comment '是否为匿名用户',
  primary key (`evaluateid`) using BTREE,
  constraint `fk_ISBN` foreign key (`ISBN`) references  `dangdang`.`books` (`ISBN`) on delete cascade
);

DROP TABLE IF EXISTS reply;
CREATE TABLE reply(
  `replyid` int NOT NULL AUTO_INCREMENT,
  `replycontent` varchar(255) NULL,
  `replydate` date not null,
  `evalid` int not null,
  `replyor` varchar(255) not null,
  primary key (`replyid`) using btree,
  index `fk_evalid`(`evalid`) using btree,
  constraint `fk_evalid` foreign key (`evalid`) references `evaluate` (`evaluateid`)
);

insert into `evaluate` values(1, '好书1', '文龙208', '978-7-208', 'wangboyu.png', 300, 1, '2023-01-09', 0);
insert into `evaluate` values(2, '好书2', '文龙208', '978-7-208', 'wangboyu.png', 400, 2, '2023-01-09', 0);
insert into `evaluate` values(3, '好书3', '文龙208', '978-7-208', 'wangboyu.png', 500, 3, '2023-01-09', 0);
insert into `evaluate` values(4, '好书4', '文龙206', '978-7-206', 'wangboyu.png', 300, 1, '2023-01-09', 0);
insert into `evaluate` values(5, '好书5', '文龙206', '978-7-206', 'wangboyu.png', 310, 1, '2023-01-09', 0);
insert into `evaluate` values(6, '好书6', '文龙206', '978-7-206', 'wangboyu.png', 320, 1, '2023-01-09', 0);
insert into `evaluate` values(7, '好书7', '文龙209', '978-7-209', 'wangboyu.png', 340, 1, '2023-01-09', 0);
insert into `evaluate` values(8, '好书8', '文龙209', '978-7-209', 'wangboyu.png', 305, 1, '2023-01-09', 0);

insert into `reply` values(4, '好书111', '2023-06-10', 1, '文龙666');
insert into `reply` values(5, '好书555', '2023-06-15', 1, '文龙666');
insert into `reply` values(6, '好书666', '2023-06-16', 1, '文龙666');
insert into `reply` values(7, '好书777', '2023-06-17', 1, '文龙666');
insert into `reply` values(8, '好书888', '2023-06-18', 1, '文龙666');