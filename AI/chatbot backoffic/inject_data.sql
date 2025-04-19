CREATE DATABASE IF NOT EXISTS retail_management;
USE retail_management;
-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL,
    store_id INT,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    store_id INT,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100) NOT NULL
);

-- Insert sample data
-- Stores
INSERT INTO stores (name, location) VALUES
('Downtown Store', '123 Main St'),
('Mall Store', '456 Shopping Mall'),
('Outlet Store', '789 Discount Ave');

-- Users
INSERT INTO users (username, role, store_id) VALUES
('john', 'user', 1),
('sarah', 'admin', 2),
('mike', 'super_admin', NULL);

-- Products
INSERT INTO products (name, price, stock, store_id) VALUES
-- Store 1 products
('Running Shoes', 89.99, 45, 1),
('Casual Shoes', 59.99, 30, 1),
('Dress Shoes', 129.99, 15, 1),
('Hiking Boots', 149.99, 20, 1),
('Sandals', 39.99, 50, 1),
-- Store 2 products
('Nike Air Max', 119.99, 25, 2),
('Adidas Sneakers', 99.99, 35, 2),
('Kids Shoes', 49.99, 40, 2),
('Women\'s Heels', 79.99, 30, 2),
('Men\'s Loafers', 89.99, 20, 2),
-- Store 3 products
('Budget Sneakers', 29.99, 100, 3),
('Clearance Boots', 49.99, 75, 3),
('Discount Sandals', 19.99, 120, 3),
('Sale Running Shoes', 59.99, 80, 3),
('Bargain Slippers', 14.99, 150, 3);

-- Orders
INSERT INTO orders (user_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 5, 1),
(2, 6, 3),
(2, 9, 1),
(3, 11, 5),
(3, 14, 2);

-- Suppliers
INSERT INTO suppliers (name, contact_email) VALUES
('Footwear Wholesale', 'orders@footwearwholesale.com'),
('Shoe Suppliers Inc', 'sales@shoesuppliers.com'),
('Budget Footwear', 'contact@budgetfootwear.com');