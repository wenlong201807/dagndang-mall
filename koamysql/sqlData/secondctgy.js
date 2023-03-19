// DROP TABLE IF EXISTS secondctgy;
// CREATE TABLE secondctgy (
// secondctgyid int NOT NULL AUTO_INCREMENT,
// secctgyname varchar(20) NOT NULL,
// firstctgyId int NOT NULL,
// PRIMARY KEY (secondctgyid),
// INDEX fk_firstctgyid(firstctgyId),
// CONSTRAINT fk_firstctgyid FOREIGN KEY (firstctgyId) REFERENCES firstctgy (firstCtgyId)
// )

// INSERT INTO secondctgy VALUES (1, '0-2岁', 1);
// INSERT INTO secondctgy VALUES (2, '3-6岁', 1);
// INSERT INTO secondctgy VALUES (3, '7-10岁', 1);
// INSERT INTO secondctgy VALUES (4, '11-14岁', 1);
// INSERT INTO secondctgy VALUES (5, '文艺', 2);
// INSERT INTO secondctgy VALUES (6, '人文社科', 2);
// INSERT INTO secondctgy VALUES (7, '教育', 2);