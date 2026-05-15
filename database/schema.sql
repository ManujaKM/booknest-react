-- ════════════════════════════════════════════════════════════════════════════
--  BookNest Database Schema
--  Compatible : MySQL 8.0+ / MariaDB 10.6+ (Aiven MySQL)
--  Run this entire file in HeidiSQL Query tab after connecting to Aiven.
-- ════════════════════════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS booknest CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE booknest;

-- ── 1. Users ─────────────────────────────────────────────────────────────────
-- All four roles live in this one table (role column controls access).
CREATE TABLE IF NOT EXISTS users (
  id            INT          AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,                    -- store bcrypt hash only
  role          ENUM('customer','shopowner','admin','delivery')
                             NOT NULL DEFAULT 'customer',
  avatar_url    TEXT,
  phone         VARCHAR(30),
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── 2. Shops ─────────────────────────────────────────────────────────────────
-- One shop per approved shop owner (owner_id → users.id where role='shopowner').
CREATE TABLE IF NOT EXISTS shops (
  id          INT          AUTO_INCREMENT PRIMARY KEY,
  owner_id    INT          NOT NULL,
  name        VARCHAR(150) NOT NULL,
  address     TEXT,
  city        VARCHAR(100),
  postcode    VARCHAR(20),
  country     VARCHAR(100) DEFAULT 'UK',
  phone       VARCHAR(30),
  email       VARCHAR(150),
  approved_at TIMESTAMP,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 3. Books ─────────────────────────────────────────────────────────────────
-- Each book belongs to one shop. cover_url may be an https:// URL or base64 data URI.
CREATE TABLE IF NOT EXISTS books (
  id          INT            AUTO_INCREMENT PRIMARY KEY,
  shop_id     INT            NOT NULL,
  title       VARCHAR(255)   NOT NULL,
  author      VARCHAR(150)   NOT NULL,
  isbn        VARCHAR(20),
  category    VARCHAR(100),
  price       DECIMAL(10,2)  NOT NULL,
  stock       INT            NOT NULL DEFAULT 0,
  cover_url   MEDIUMTEXT,                                 -- supports base64 or URL
  description TEXT,
  created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 4. Orders ────────────────────────────────────────────────────────────────
-- One row per checkout. Stripe IDs stored here for payment reconciliation.
CREATE TABLE IF NOT EXISTS orders (
  id                       VARCHAR(20)   PRIMARY KEY,    -- e.g. ORD-A1B2C3
  customer_id              INT           NOT NULL,
  status                   ENUM('pending','dispatched','delivered','cancelled')
                                         NOT NULL DEFAULT 'pending',
  total_amount             DECIMAL(10,2) NOT NULL,
  stripe_payment_method_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  delivery_name            VARCHAR(100),
  delivery_phone           VARCHAR(30),
  delivery_address         TEXT,
  delivery_city            VARCHAR(100),
  delivery_postcode        VARCHAR(20),
  created_at               TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at               TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- ── 5. Order Items ───────────────────────────────────────────────────────────
-- Line items for each order (supports multi-book carts).
-- unit_price snapshots the book price at time of purchase.
CREATE TABLE IF NOT EXISTS order_items (
  id         INT           AUTO_INCREMENT PRIMARY KEY,
  order_id   VARCHAR(20)   NOT NULL,
  book_id    INT           NOT NULL,
  shop_id    INT           NOT NULL,
  quantity   INT           NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id)  REFERENCES books(id),
  FOREIGN KEY (shop_id)  REFERENCES shops(id)
) ENGINE=InnoDB;

-- ── 6. Shop Applications ─────────────────────────────────────────────────────
-- Stores the apply-to-become-shop-owner form submissions.
-- Admin sets status to 'approved' and generates access_code.
CREATE TABLE IF NOT EXISTS shop_applications (
  id             INT          AUTO_INCREMENT PRIMARY KEY,
  applicant_name VARCHAR(100) NOT NULL,
  email          VARCHAR(150) NOT NULL,
  shop_name      VARCHAR(150) NOT NULL,
  description    TEXT,
  status         ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  access_code    VARCHAR(20),                             -- generated on approval
  reviewed_by    INT,                                     -- admin users.id
  reviewed_at    TIMESTAMP,
  created_at     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ── 7. Wishlists ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlists (
  id         INT       AUTO_INCREMENT PRIMARY KEY,
  user_id    INT       NOT NULL,
  book_id    INT       NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_wishlist (user_id, book_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 8. Delivery Assignments ──────────────────────────────────────────────────
-- Links an order to a delivery driver. Tracks pickup/delivery timestamps.
CREATE TABLE IF NOT EXISTS delivery_assignments (
  id           INT         AUTO_INCREMENT PRIMARY KEY,
  order_id     VARCHAR(20) NOT NULL UNIQUE,
  driver_id    INT,                                       -- delivery users.id
  assigned_at  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
  picked_up_at TIMESTAMP,
  delivered_at TIMESTAMP,
  notes        TEXT,
  FOREIGN KEY (order_id)  REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ════════════════════════════════════════════════════════════════════════════
--  Seed: default admin account
--  Password: Admin@123  (bcrypt hash — change this immediately!)
-- ════════════════════════════════════════════════════════════════════════════
INSERT IGNORE INTO users (name, email, password_hash, role)
VALUES (
  'Admin',
  'admin@booknest.com',
  '$2b$12$KIX7Oz5v0z5kJqT4w5HmQ.rAqVoEdJ6d5GX/dg4kXgUjH2UfFnpAm',
  'admin'
);
