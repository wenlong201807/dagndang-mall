// INSERT INTO userinfo VALUES (1, 'admin', '123', 'dd', 1);
// INSERT INTO userinfo VALUES (2, 'wangwu', '123', 'ss', 1);

/*
DROP TABLE IF EXISTS userinfo;
CREATE TABLE userinfo (
userid int NOT NULL AUTO_INCREMENT,
username varchar(30) NOT NULL,
psw varchar(20) NOT NULL,
address varchar(50) NULL DEFAULT NULL,
valid tinyint NULL DEFAULT NULL,
PRIMARY KEY (userid)
)
*/
