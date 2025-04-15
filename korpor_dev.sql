-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2025 at 01:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `korpor_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `blacklisted_tokens`
--

CREATE TABLE `blacklisted_tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blacklisted_tokens`
--

INSERT INTO `blacklisted_tokens` (`id`, `token`, `expires_at`, `created_at`) VALUES
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJlbWFpbCI6InN1cGVyYWRtaW5Aa29ycG9yLmNvbSIsInJvbGUiOiJzdXBlciBhZG1pbiIsImlhdCI6MTc0MjM0MzQzNywiZXhwIjoxNzQyMzQ3MDM3fQ.0iq7awC9OiS3HPJyYWgbEpGFCZhzwCuC4PHubvXB5nw', '2025-03-19 01:17:17', '2025-03-19 00:17:24');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `privileges` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`privileges`)),
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `privileges`, `description`, `created_at`, `updated_at`) VALUES
(1, 'super admin', '[\"all\"]', 'Super administrator with all privileges', '2025-03-11 15:15:35', '2025-03-11 15:15:35'),
(2, 'admin', '[\"users_read\", \"users_write\", \"content_read\", \"content_write\"]', 'Administrator with limited privileges', '2025-03-11 15:15:35', '2025-03-11 15:15:35'),
(3, 'user', '[\"content_read\"]', 'Standard user', '2025-03-11 15:15:35', '2025-03-11 15:15:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `account_no` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `reset_code` varchar(10) DEFAULT NULL,
  `reset_code_expires` datetime DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `role_id` int(11) DEFAULT NULL,
  `approval_status` enum('unverified','pending','approved','rejected') DEFAULT 'unverified',
  `profile_picture` varchar(255) DEFAULT '',
  `cloudinary_public_id` varchar(255) DEFAULT '',
  `expired` tinyint(1) DEFAULT 0,
  `failed_login_attempts` int(11) DEFAULT 0,
  `locked_until` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `refresh_token` varchar(500) DEFAULT NULL,
  `refresh_token_expires` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `account_no`, `name`, `surname`, `email`, `password`, `birthdate`, `reset_code`, `reset_code_expires`, `is_verified`, `role_id`, `approval_status`, `profile_picture`, `cloudinary_public_id`, `expired`, `failed_login_attempts`, `locked_until`, `last_login`, `refresh_token`, `refresh_token_expires`, `created_at`, `updated_at`) VALUES
(16, 1000, 'ahmed', 'jaziri', 'ahmedjaziri41@gmail.com', '$2a$10$QePhf4bq7rxT2arpHiRm3OQD9aIiRHHL0uEx60WTT4ioVxqPpTF32', '2004-01-18', '945203', '2025-03-18 16:49:35', 1, 1, 'approved', '', '', 0, 0, NULL, '2025-03-18 16:32:37', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJ0b2tlblR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzQyMzE1NTU3LCJleHAiOjE3NDI5MjAzNTd9.Q7iR4DKjes-tv-hSGOMN8aawCCNXYhrPohBhVQ0oKeg', '2025-03-25 16:32:37', '2025-03-18 14:40:36', '2025-03-18 16:32:37'),
(17, 1001, 'ahmed', 'jaziri', 'ahmedjaziri51@gmail.com', '$2a$10$v8jkhAzFp5IHu68LuO67qeVaenn4oGL9rwMiMOoag9OQECKcFWnVW', '2003-11-04', NULL, NULL, 1, NULL, 'approved', '', '', 0, 0, NULL, '2025-03-18 16:32:25', NULL, NULL, '2025-03-18 16:15:54', '2025-03-18 16:32:34'),
(18, 951270, 'Super', 'Admin', 'superadmin@korpor.com', '$2b$10$zwUk3AKmeWg9v8Aav48JpuuuUIyb/zIAAnxb7cXLoTgdQOkGamVg.', '1990-01-01', NULL, NULL, 1, 1, 'approved', '', '', 0, 0, NULL, '2025-03-22 23:51:58', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJ0b2tlblR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzQyNjg3NTE4LCJleHAiOjE3NDMyOTIzMTh9.avw_lQz-ex-y7aGiEULnIwyKOaCN6uaGUFKEuq2KSM0', '2025-03-29 23:51:58', '2025-03-18 16:49:52', '2025-03-22 23:51:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blacklisted_tokens`
--
ALTER TABLE `blacklisted_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_token_blacklist` (`token`(255)),
  ADD KEY `idx_token_expires` (`expires_at`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `account_no` (`account_no`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `idx_users_email` (`email`),
  ADD KEY `idx_users_approval_status` (`approval_status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blacklisted_tokens`
--
ALTER TABLE `blacklisted_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
