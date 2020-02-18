CREATE DATABASE  IF NOT EXISTS `HQTCSDL` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `HQTCSDL`;
-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
--
-- Host: 35.196.56.35    Database: HQTCSDL
-- ------------------------------------------------------
-- Server version	5.7.14-google-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '5cf31f57-1e2f-11ea-af37-42010a8e0002:1-966234';

--
-- Table structure for table `_Group`
--

DROP TABLE IF EXISTS `_Group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_Group` (
  `_id` int(11) NOT NULL,
  `_name` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_Group`
--

LOCK TABLES `_Group` WRITE;
/*!40000 ALTER TABLE `_Group` DISABLE KEYS */;
INSERT INTO `_Group` VALUES (1,'1'),(2,'1'),(3,'1');
/*!40000 ALTER TABLE `_Group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_Group_Project`
--

DROP TABLE IF EXISTS `_Group_Project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_Group_Project` (
  `_project_id` int(11) NOT NULL,
  `_group_id` int(11) NOT NULL,
  UNIQUE KEY `_project_id` (`_project_id`,`_group_id`),
  KEY `_group_id` (`_group_id`),
  CONSTRAINT `_Group_Project_ibfk_1` FOREIGN KEY (`_project_id`) REFERENCES `_Project` (`_id`),
  CONSTRAINT `_Group_Project_ibfk_2` FOREIGN KEY (`_group_id`) REFERENCES `_Group` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_Group_Project`
--

LOCK TABLES `_Group_Project` WRITE;
/*!40000 ALTER TABLE `_Group_Project` DISABLE KEYS */;
INSERT INTO `_Group_Project` VALUES (2,2),(3,3);
/*!40000 ALTER TABLE `_Group_Project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_Group_Student`
--

DROP TABLE IF EXISTS `_Group_Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_Group_Student` (
  `_id_Group` int(11) DEFAULT NULL,
  `_id_Student` varchar(11) DEFAULT NULL,
  UNIQUE KEY `_id_Group` (`_id_Group`,`_id_Student`),
  KEY `_id_Student` (`_id_Student`),
  CONSTRAINT `_Group_Student_ibfk_1` FOREIGN KEY (`_id_Student`) REFERENCES `_Student` (`_id`),
  CONSTRAINT `_Group_Student_ibfk_2` FOREIGN KEY (`_id_Group`) REFERENCES `_Group` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_Group_Student`
--

LOCK TABLES `_Group_Student` WRITE;
/*!40000 ALTER TABLE `_Group_Student` DISABLE KEYS */;
INSERT INTO `_Group_Student` VALUES (2,'1653033'),(2,'1653061'),(2,'1653068'),(3,'1653033'),(3,'1653061'),(3,'1653069');
/*!40000 ALTER TABLE `_Group_Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_Project`
--

DROP TABLE IF EXISTS `_Project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_Project` (
  `_id` int(11) NOT NULL,
  `_code` varchar(10) NOT NULL,
  `_name` varchar(50) NOT NULL,
  `_quantity` int(11) DEFAULT NULL,
  `_lecturer` varchar(20) DEFAULT NULL,
  `_description` varchar(255) DEFAULT NULL,
  `_remaining` int(11) DEFAULT NULL,
  `_subject_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `idx` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_Project`
--

LOCK TABLES `_Project` WRITE;
/*!40000 ALTER TABLE `_Project` DISABLE KEYS */;
INSERT INTO `_Project` VALUES (1,'CTT001','Lap trinh socket',10,'Dam Quang Khai','...',10,'Mang may tinh'),(2,'CTT002','So do nghiep vu',5,'Tran Minh Nhut','...',4,'Cong nghe phan mem'),(3,'CTT003','Nhan dien hinh anh',3,'Trinh Dai Phuc','...',0,'May hoc');
/*!40000 ALTER TABLE `_Project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_Student`
--

DROP TABLE IF EXISTS `_Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_Student` (
  `_id` varchar(11) NOT NULL,
  `_name` varchar(70) NOT NULL,
  `_identification_card_number` varchar(7) NOT NULL,
  `_gender` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `idx` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_Student`
--

LOCK TABLES `_Student` WRITE;
/*!40000 ALTER TABLE `_Student` DISABLE KEYS */;
INSERT INTO `_Student` VALUES ('1653005','Bach','123452','M'),('1653009','Canh','123451','M'),('1653012','Duc','123455','M'),('1653015','Dung','123450','F'),('1653021','Hai','123457','M'),('1653033','Khai','123456','M'),('1653061','Nhut','123453','M'),('1653068','Phuc','123454','M'),('1653069','Yen','123458','F'),('1653096','Huong','123459','F');
/*!40000 ALTER TABLE `_Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'HQTCSDL'
--

--
-- Dumping routines for database 'HQTCSDL'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_createUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_createUser`(IN `p_Name` VARCHAR(45), IN `p_Passw` VARCHAR(20))
BEGIN
    DECLARE `_HOST` CHAR(14) DEFAULT '@\'%\'';
    SET `p_Name` := CONCAT('\'', REPLACE(TRIM(`p_Name`), CHAR(39), CONCAT(CHAR(92), CHAR(39))), '\''),
    `p_Passw` := CONCAT('\'', REPLACE(`p_Passw`, CHAR(39), CONCAT(CHAR(92), CHAR(39))), '\'');
    SET @`sql` := CONCAT('CREATE USER ', `p_Name`, `_HOST`, ' IDENTIFIED BY ', `p_Passw`);
    PREPARE `stmt` FROM @`sql`;
    EXECUTE `stmt`;
    SET @`sql` := CONCAT('GRANT EXECUTE ON PROCEDURE HQTCSDL.sp_infoProject TO ', `p_Name`, `_HOST`);
    PREPARE `stmt` FROM @`sql`;
    EXECUTE `stmt`;
    SET @`sql` := CONCAT('GRANT EXECUTE ON PROCEDURE HQTCSDL.sp_infoAProject TO ', `p_Name`, `_HOST`);
    PREPARE `stmt` FROM @`sql`;
    EXECUTE `stmt`;
    SET @`sql` := CONCAT('GRANT EXECUTE ON PROCEDURE HQTCSDL.sp_infoGroupInProject TO ', `p_Name`, `_HOST`);
    PREPARE `stmt` FROM @`sql`;
    EXECUTE `stmt`;
    SET @`sql` := CONCAT('GRANT SELECT ON HQTCSDL.* TO ', `p_Name`, `_HOST`);
    PREPARE `stmt` FROM @`sql`;
    EXECUTE `stmt`;
    DEALLOCATE PREPARE `stmt`;
    FLUSH PRIVILEGES; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_deleteGroupInProject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_deleteGroupInProject`(in gid int, in pid int)
BEGIN
DECLARE errno INT;
DECLARE mess TEXT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
 GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO, mess = MESSAGE_TEXT;
 SELECT errno AS MYSQL_ERROR, mess AS MYSQL_ERROR_MESSAGE;
 SELECT 'Roll Back' as error;
 ROLLBACK;
END;
SET SQL_SAFE_UPDATES = 0;
START TRANSACTION;
IF NOT EXISTS (SELECT NULL FROM _Group_Project WHERE _group_id = gid AND _project_id = pid FOR UPDATE)
	THEN SELECT "Nhom khong ton tai hoac da bi xoa" as error;
    ROLLBACK;
ELSEIF NOT EXISTS (SELECT NULL FROM _Project WHERE _id = pid FOR UPDATE)
	THEN SELECT "Do an khong ton tai" as error;
    ROLLBACK;
ELSE
	BEGIN
		DO SLEEP(5);
		DELETE FROM _Group_Student WHERE _id_Group = gid;
        DELETE FROM _Group_Project WHERE _group_id = gid AND _project_id = pid;
        DELETE FROM _Group WHERE _id = gid;
        UPDATE _Project SET _remaining = _remaining + 1 WHERE _id = pid; 
        SELECT "Da xoa nhom" as success;
    END;
END IF;
COMMIT;
SET SQL_SAFE_UPDATES = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_infoAProject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_infoAProject`(IN id INT)
BEGIN
	DO SLEEP(5);
    IF NOT EXISTS (SELECT NULL FROM _Project WHERE _id = id)
		THEN SELECT "Do an khong ton tai" as error;
        ROLLBACK;
	ELSE
		SELECT _id, _name, _subject_name, _code, _lecturer, _description, _quantity, _remaining, _subject_name
		FROM _Project
		WHERE id = _id;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_infoGroupInProject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_infoGroupInProject`(IN pid INT, IN student NVARCHAR(11))
BEGIN
	DO SLEEP(5);
	IF NOT EXISTS (SELECT NULL 
			   FROM _Group_Project gp
               JOIN _Group_Student gs
               ON gp._group_id = gs._id_Group
               WHERE gp._project_id = pid AND student = gs._id_Student)
	THEN SELECT "Nhom khong ton tai" as error; 
    ROLLBACK;
    ELSE
		BEGIN
		DECLARE gid INT;
		SELECT gp._group_id
		INTO gid
		FROM _Group_Project gp JOIN _Group_Student gs 
		ON gp._group_id = gs._id_Group 
		WHERE gp._project_id = pid AND student = gs._id_Student;
		
		SELECT gs._id_Student, g._name, g._id
		FROM _Group_Student gs JOIN _Group g
		ON gs._id_group = g._id AND g._id = gid;
        END;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_infoProject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_infoProject`()
BEGIN
	SELECT _id, _name, _subject_name, _code, _lecturer, _description, _quantity, _remaining, _subject_name
    FROM _Project;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_registerGroup` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_registerGroup`(IN gname NVARCHAR(2), IN pid INT, IN student1 NVARCHAR(11), IN student2 NVARCHAR(11), IN student3 NVARCHAR(11))
BEGIN
 DECLARE errno INT;
 DECLARE mess TEXT;
 DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
 GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO, mess = MESSAGE_TEXT;
 SELECT errno AS MYSQL_ERROR, mess AS MYSQL_ERROR_MESSAGE;
 SELECT 'Roll back' as error;
END;
SET TRANSACTION ISOLATION LEVEL repeatable read;
START TRANSACTION;
IF NOT EXISTS (SELECT NULL FROM _Project p WHERE pid = p._id AND p._remaining > 0)
	THEN SIGNAL SQLSTATE '01000' SET MESSAGE_TEXT = 'ERROR Het vi tri';
    SELECT 'Het vi tri' as error;
    ROLLBACK;
ELSEIF EXISTS (SELECT NULL FROM _Group g JOIN _Group_Project gp ON g._id = gp._group_id WHERE gname = g._name AND pid = gp._project_id)
	THEN SIGNAL SQLSTATE '01000' SET MESSAGE_TEXT = 'ERROR: Nhom da ton tai';
    SELECT 'Nhom da ton tai' as error;
    ROLLBACK;
ELSEIF NOT EXISTS (SELECT NULL FROM _Student WHERE student1 IN (SELECT _id FROM _Student)
					AND student2 IN (SELECT _id FROM _Student)
                    AND student3 IN (SELECT _id FROM _Student))
		THEN SIGNAL SQLSTATE '01001' SET MESSAGE_TEXT = 'ERROR: Sinh vien khong ton tai';
		SELECT 'Sinh vien khong ton tai' as error;
        ROLLBACK;
	ELSEIF EXISTS (
		SELECT NULL
        FROM _Group_Project gp JOIN _Group_Student gs ON gp._group_id = gs._id_Group AND gp._project_id = pid
        WHERE student1 = gs._id_Student OR student2 = gs._id_Student OR student3 = gs._id_Student
    )
		THEN SIGNAL SQLSTATE '01002' SET MESSAGE_TEXT = 'ERROR: Sinh vien da co nhom trong project';
        SELECT 'Sinh vien da co nhom trong project' as error;
        ROLLBACK;
    ELSE
		BEGIN
			DECLARE group_id INT;
            UPDATE _Project SET _remaining = _remaining - 1 WHERE _id = pid; 
            DO SLEEP(5);
			SELECT g1._id + 1
			INTO group_id 
			FROM _Group g1 
			WHERE NOT EXISTS (SELECT NULL FROM _Group g2 WHERE g2._id = g1._id + 1)
			LIMIT 1;
			INSERT INTO _Group VALUES (group_id, gname);
			INSERT INTO _Group_Student VALUES (group_id, student1);
			INSERT INTO _Group_Student VALUES (group_id, student2);
			INSERT INTO _Group_Student VALUES (group_id, student3);
			INSERT INTO _Group_Project VALUES (pid, group_id);

            SELECT 'SUCCESS: Nhom tao thanh cong' as success;
		END ;
    END IF;
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-25 17:38:06
