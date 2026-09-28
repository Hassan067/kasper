-- ==========================================================
-- Kasper | Database schema
-- Run once in phpMyAdmin (SQL tab) or: mysql -u root < database/schema.sql
-- Safe to run again: IF NOT EXISTS skips what already exists.
-- ==========================================================

CREATE DATABASE IF NOT EXISTS kasper
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE kasper;

-- Messages sent from the "Contact Us" form
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(254)  NOT NULL,
  message    VARCHAR(2000) NOT NULL,
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Emails from the "Subscribe" form (each email only once)
CREATE TABLE IF NOT EXISTS subscribers (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email      VARCHAR(254) NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_subscribers_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
