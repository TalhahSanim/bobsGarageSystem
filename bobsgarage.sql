-- MySQL dump 10.13  Distrib 26.7.0, for Win64 (x86_64)
--
-- Host: localhost    Database: bobsGarageSystem
-- ------------------------------------------------------
-- Server version	26.7.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '3fa71bb2-a247-11f1-9bfc-1d09d513dc1a:1-2565,
524bc4a2-a985-11f1-b5f4-244bfe5dad7c:1-538';

--
-- Current Database: `bobsGarageSystem`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `bobsGarageSystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `bobsGarageSystem`;

--
-- Table structure for table `enquiries`
--

DROP TABLE IF EXISTS `enquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enquiries` (
  `enquiryId` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `response` text,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `repliedAt` datetime DEFAULT NULL,
  `readByUser` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  `serviceId` int NOT NULL,
  PRIMARY KEY (`enquiryId`),
  KEY `userId` (`userId`),
  KEY `serviceId` (`serviceId`),
  CONSTRAINT `enquiries_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `enquiries_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `services` (`serviceId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiries`
--

LOCK TABLES `enquiries` WRITE;
/*!40000 ALTER TABLE `enquiries` DISABLE KEYS */;
INSERT INTO `enquiries` VALUES (1,'Hi, how long does this service usually take?',NULL,'pending',NULL,0,'2026-11-08 07:45:45','2026-11-08 07:45:45',7,3),(2,'Hi, how long does this service usually take?','Usually about an hour. Book any weekday morning.','responded','2026-11-08 07:52:19',1,'2026-11-08 07:49:12','2026-11-08 07:54:51',3,1),(3,'hi is this avilable to get it done',NULL,'pending',NULL,0,'2026-11-08 12:49:57','2026-11-08 12:49:57',7,1),(4,'hey im interested in this service what types of wraps do you have?','we have multi color ranging from white to green','responded','2026-11-09 06:24:16',1,'2026-11-08 13:44:24','2026-11-09 06:24:43',4,3);
/*!40000 ALTER TABLE `enquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourites` (
  `favouriteId` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL DEFAULT 'new',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  `serviceId` int NOT NULL,
  PRIMARY KEY (`favouriteId`),
  UNIQUE KEY `favourites_user_id_service_id` (`userId`,`serviceId`),
  KEY `serviceId` (`serviceId`),
  CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `services` (`serviceId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
INSERT INTO `favourites` VALUES (1,'new','2026-11-05 09:34:39','2026-11-10 08:41:45',5,1),(44,'new','2026-11-08 13:39:16','2026-11-10 08:41:45',4,3),(45,'new','2026-11-09 08:35:40','2026-11-10 08:41:44',4,6),(52,'new','2026-11-10 03:11:36','2026-11-10 08:41:41',9,1);
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preferences`
--

DROP TABLE IF EXISTS `preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preferences` (
  `preferenceId` int NOT NULL AUTO_INCREMENT,
  `theme` varchar(255) NOT NULL DEFAULT 'light',
  `fontSize` varchar(255) NOT NULL DEFAULT 'medium',
  `sortOrder` varchar(255) NOT NULL DEFAULT 'default',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`preferenceId`),
  UNIQUE KEY `userId` (`userId`),
  CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preferences`
--

LOCK TABLES `preferences` WRITE;
/*!40000 ALTER TABLE `preferences` DISABLE KEYS */;
INSERT INTO `preferences` VALUES (1,'dark','medium','default','2026-11-05 09:35:24','2026-11-05 09:35:41',5),(2,'light','medium','default','2026-11-06 00:00:45','2026-11-06 06:12:47',3),(3,'dark','large','default','2026-11-06 02:23:10','2026-11-10 20:29:04',8),(4,'dark','medium','default','2026-11-07 23:55:42','2026-11-09 04:02:12',7),(5,'light','medium','fee-DESC','2026-11-08 00:02:54','2026-11-09 08:05:45',4),(6,'light','medium','default','2026-11-09 21:05:28','2026-11-09 23:01:44',9);
/*!40000 ALTER TABLE `preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `serviceId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `fee` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`serviceId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Garage Expansion','Customization','Custom  job','https://images.unsplash.com/photo-1551522435-a13afa10f103?w=800&auto=format&fit=crop',19000.99,'2026-10-26 06:25:01','2026-11-01 12:51:26'),(3,'Custom Wrap','Car Design','Add a unique style to a vehicle','https://images.unsplash.com/photo-1566274360936-69fae8dc1d95?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',19.22,'2026-10-26 07:32:15','2026-11-05 12:48:34'),(6,'Oil Changes','Routine Maintenence','vehicle oil change to prevent leakages and to ensure vehicle performs','https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format&fit=crop',250.00,'2026-11-09 08:28:49','2026-11-09 08:47:02'),(7,'Logbook Service','Maintenance','Manufacturer logbook service that keeps your new car warranty valid. Oil, filters, fluids and a full safety check.','https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop',349.00,'2026-11-09 21:21:31','2026-11-09 21:21:31'),(8,'Brake Pad Replacement','Repair','Front or rear brake pads replaced and discs inspected for wear. Includes a road test.','https://images.unsplash.com/photo-1588017530244-c57df911f73b?w=800&auto=format&fit=crop',229.00,'2026-11-09 21:21:31','2026-11-09 21:21:31'),(9,'Wheel Alignment','Tyres','Four wheel alignment to stop uneven tyre wear and pulling to one side.','https://images.unsplash.com/photo-1697396248143-e6fa96564d35?w=800&auto=format&fit=crop',99.00,'2026-11-09 21:21:31','2026-11-09 21:21:31'),(10,'Tyre Rotation Plus','Tyres','All four tyres rotated and pressure set so they wear evenly and last longer','https://images.unsplash.com/photo-1571335746824-742511d49bce?w=800&auto=format&fit=crop',49.00,'2026-11-09 21:21:31','2026-11-10 20:20:59'),(11,'Battery Replacement','Electrical','Battery tested and replaced with a new one, plus a charging system check.','https://images.unsplash.com/photo-1765211003026-f7666ea3a948?w=800&auto=format&fit=crop',189.00,'2026-11-09 21:21:31','2026-11-09 21:21:31'),(12,'Air Conditioning Regas','Maintenance','Air conditioning system checked for leaks and regassed so it blows cold again.','https://images.unsplash.com/photo-1778938525731-0a254548f58f?w=800&auto=format&fit=crop',159.00,'2026-11-09 21:21:31','2026-11-09 21:21:31'),(14,'Clutch Replacement','Repair','Worn clutch kit replaced, including the pressure plate and release bearing.','https://images.unsplash.com/photo-1774977866250-89aec8731911?w=800&auto=format&fit=crop',1250.00,'2026-11-09 21:21:31','2026-11-09 21:21:31'),(15,'Coolant Flush','Maintenance','Old coolant drained and replaced to stop overheating and corrosion.','https://images.unsplash.com/photo-1661332548369-9c2789e3705e?w=800&auto=format&fit=crop',139.00,'2026-11-09 21:21:31','2026-11-09 21:21:31'),(16,'Roadworthy Inspection','Inspection','Full roadworthy check before you sell or register your car, with a certificate when it passes.','https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&auto=format&fit=crop',180.00,'2026-11-09 21:21:31','2026-11-09 21:21:31'),(17,'Interior Detailing','Detailing','Vacuum, steam clean and wipe down the whole interior so your car looks and smells like new','https://images.unsplash.com/photo-1732357624591-f2137085659b?w=800&auto=format&fit=crop',224.50,'2026-11-09 12:52:33','2026-11-09 12:52:33');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `email_27` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-10-27 07:51:57','2026-10-27 07:51:57','Talhah','Sanim','tal@email.com','https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original','$2b$12$OU33Y3TMthPD8BXm3Kz70e5Kx2CVBLsErLa.H5pp/VS8Et2/2W5Bm',0),(3,'2026-10-27 10:00:08','2026-11-04 02:21:05','John','Blue','talhah@example.com','https://images.unsplash.com/photo-1642086893711-1591cbfa61fe?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D','$2b$12$tejakgldbugxkcRcqLpR1.oSjWCpjeWeqqovnY.N54wem4633uVnq',0),(4,'2026-10-28 09:25:34','2026-11-10 20:52:50','Travis','Green','travisgreen@email.com','https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg','$2b$12$LbsY/yj0goi5/RYgkAgFCuF4RVkXbkdUmnqQx5y5fV7o8B3s48T/S',0),(5,'2026-10-28 09:25:39','2026-11-10 03:07:06','James','Stripe','james@stripe.com','/uploads/avatar-5-1793945180698.jpg','$2b$12$ZJ7ZypPIefoLl4maMuxGT.GTAxB93Ag7t/RhVn2y5qcTj8f1moPUS',0),(6,'2026-10-28 09:32:20','2026-11-10 20:53:39','Steve','Purple','name@name.com','https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg','$2b$12$XQ3TtW63hFkkeMFJUaQr3OhA/CpWlRDriHJELXxBfwCBVg9LzKtui',0),(7,'2026-10-28 09:59:06','2026-11-10 20:53:18','Red','Blue','test@test.com','/uploads/avatar-7-1794096086787.webp','$2b$12$sZf0757aSXxd/dGYAzPe2OHvjlIJBDUjJOspEAbxAbyc/Nu2g0RlG',1),(8,'2026-10-31 09:35:27','2026-11-10 20:53:55','Sara','Green','razorasus@asus.com','https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D','$2b$12$x1UmYUe8PhAGZsAk3K5mz.KA7e/ID5dy.E6XalfNkYkHRgUQNFgci',1),(9,'2026-11-09 21:05:28','2026-11-09 21:05:28','Abdul','Sanim','abdulsanim@corp.com','','$2b$12$slFitKLpskifcANdK.CB4eAOqk7nyFIKpMZlcjL/5w2fNt78il09W',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-11  8:00:55
