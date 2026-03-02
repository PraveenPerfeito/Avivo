CREATE DATABASE IF NOT EXISTS user_directory;
USE user_directory;

DROP TABLE IF EXISTS crypto_wallets;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS banks;
DROP TABLE IF EXISTS hair_profiles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS addresses;

CREATE TABLE IF NOT EXISTS addresses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  address_line VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  state_code VARCHAR(10) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  lat DECIMAL(10,6) NOT NULL,
  lng DECIMAL(10,6) NOT NULL,
  country VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  maiden_name VARCHAR(100) NOT NULL DEFAULT '',
  age INT NOT NULL,
  gender ENUM('male', 'female', 'other') NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  image VARCHAR(512) NOT NULL,
  blood_group VARCHAR(5) NOT NULL,
  height DECIMAL(6,2) NOT NULL,
  weight DECIMAL(6,2) NOT NULL,
  eye_color VARCHAR(50) NOT NULL,
  ip VARCHAR(45) NOT NULL,
  address_id INT NOT NULL,
  mac_address VARCHAR(17) NOT NULL,
  university VARCHAR(255) NOT NULL,
  ein VARCHAR(20) NOT NULL,
  ssn VARCHAR(20) NOT NULL,
  user_agent TEXT NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_address FOREIGN KEY (address_id) REFERENCES addresses(id)
);

CREATE TABLE IF NOT EXISTS hair_profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  color VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  CONSTRAINT fk_hair_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS banks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  card_expire VARCHAR(10) NOT NULL,
  card_number VARCHAR(32) NOT NULL,
  card_type VARCHAR(100) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  iban VARCHAR(64) NOT NULL,
  CONSTRAINT fk_banks_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  department VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(100) NOT NULL,
  address_id INT NOT NULL,
  CONSTRAINT fk_companies_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_companies_address FOREIGN KEY (address_id) REFERENCES addresses(id)
);

CREATE TABLE IF NOT EXISTS crypto_wallets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  coin VARCHAR(50) NOT NULL,
  wallet VARCHAR(128) NOT NULL,
  network VARCHAR(100) NOT NULL,
  CONSTRAINT fk_crypto_user FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO addresses (id, address_line, city, state, state_code, postal_code, lat, lng, country)
VALUES
  (1, '626 Main Street', 'Phoenix', 'Mississippi', 'MS', '29112', -77.162130, -92.084824, 'United States'),
  (2, '385 Fifth Street', 'Houston', 'Alabama', 'AL', '38807', 22.815468, 115.608581, 'United States'),
  (3, '1642 Ninth Street', 'Washington', 'Alabama', 'AL', '32822', 45.289366, 46.832664, 'United States'),
  (4, '238 Jefferson Street', 'Seattle', 'Pennsylvania', 'PA', '68354', 16.782513, -139.347230, 'United States'),
  (5, '607 Fourth Street', 'Jacksonville', 'Colorado', 'CO', '26593', 0.505589, -157.432810, 'United States'),
  (6, '263 Tenth Street', 'San Francisco', 'Wisconsin', 'WI', '37657', 71.814525, -161.150263, 'United States'),
  (7, '395 Main Street', 'Los Angeles', 'New Hampshire', 'NH', '73442', 79.098326, -119.624845, 'United States'),
  (8, '1896 Washington Street', 'Dallas', 'Nevada', 'NV', '88511', 20.086743, -34.577107, 'United States'),
  (9, '1622 Lincoln Street', 'Fort Worth', 'Pennsylvania', 'PA', '27768', 54.911930, -79.498328, 'United States'),
  (10, '1460 Sixth Street', 'San Antonio', 'Idaho', 'ID', '21965', 44.346545, -26.944701, 'United States');

INSERT INTO users (
  id, first_name, last_name, maiden_name, age, gender, email, phone, username, password, birth_date,
  image, blood_group, height, weight, eye_color, ip, address_id, mac_address, university, ein, ssn,
  user_agent, role
)
VALUES
  (1, 'Emily', 'Johnson', 'Smith', 29, 'female', 'emily.johnson@x.dummyjson.com', '+81 965-431-3024', 'emilys', 'emilyspass', '1996-05-30', 'https://dummyjson.com/icon/emilys/128', 'O-', 193.24, 63.16, 'Green', '42.48.100.32', 1, '47:fa:41:18:ec:eb', 'University of Wisconsin--Madison', '977-175', '900-590-289', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36', 'admin'),
  (2, 'Michael', 'Williams', '', 36, 'male', 'michael.williams@x.dummyjson.com', '+49 258-627-6644', 'michaelw', 'michaelwpass', '1989-08-10', 'https://dummyjson.com/icon/michaelw/128', 'B+', 186.22, 76.32, 'Red', '12.13.116.142', 2, '79:15:78:99:60:aa', 'Ohio State University', '912-602', '108-953-962', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/97.0.1072.76 Safari/537.36', 'admin'),
  (3, 'Sophia', 'Brown', '', 43, 'female', 'sophia.brown@x.dummyjson.com', '+81 210-652-2785', 'sophiab', 'sophiabpass', '1982-11-06', 'https://dummyjson.com/icon/sophiab/128', 'O-', 177.72, 52.60, 'Hazel', '214.225.51.195', 3, '12:a3:d3:6f:5c:5b', 'Pepperdine University', '963-113', '638-461-822', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36', 'admin'),
  (4, 'James', 'Davis', '', 46, 'male', 'james.davis@x.dummyjson.com', '+49 614-958-9364', 'jamesd', 'jamesdpass', '1979-05-04', 'https://dummyjson.com/icon/jamesd/128', 'AB+', 193.31, 62.10, 'Amber', '101.118.131.66', 4, '10:7d:df:1f:97:58', 'University of Southern California', '904-810', '116-951-314', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36', 'admin'),
  (5, 'Emma', 'Miller', 'Johnson', 31, 'female', 'emma.miller@x.dummyjson.com', '+91 759-776-1614', 'emmaj', 'emmajpass', '1994-06-13', 'https://dummyjson.com/icon/emmaj/128', 'AB-', 192.80, 63.62, 'Green', '224.126.22.183', 5, '32:b9:7e:8d:f5:e8', 'Northeastern University', '403-505', '526-210-885', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0', 'admin');

INSERT INTO hair_profiles (user_id, color, type)
VALUES
  (1, 'Brown', 'Curly'),
  (2, 'Green', 'Straight'),
  (3, 'White', 'Wavy'),
  (4, 'Blonde', 'Straight'),
  (5, 'White', 'Straight');

INSERT INTO banks (user_id, card_expire, card_number, card_type, currency, iban)
VALUES
  (1, '05/28', '3693233511855044', 'Diners Club International', 'GBP', 'GB74MH2UZLR9TRPHYNU8F8'),
  (2, '01/30', '3530633803003665', 'JCB', 'USD', 'DE26362283149158045865'),
  (3, '10/27', '6011212053392887', 'Discover', 'EUR', 'DE12191213468288004835'),
  (4, '07/30', '5303440212268149', 'Mastercard', 'CAD', 'DE01300746880579852937'),
  (5, '07/30', '5237188057591130', 'Mastercard', 'NZD', 'DE19182355652037133559');

INSERT INTO companies (user_id, department, name, title, address_id)
VALUES
  (1, 'Engineering', 'Dooley, Kozey and Cronin', 'Sales Manager', 6),
  (2, 'Support', 'Spinka - Dickinson', 'Support Specialist', 7),
  (3, 'Research and Development', 'Schiller - Zieme', 'Accountant', 8),
  (4, 'Support', 'Pagac and Sons', 'Research Analyst', 9),
  (5, 'Human Resources', 'Graham - Gulgowski', 'Quality Assurance Engineer', 10);

INSERT INTO crypto_wallets (user_id, coin, wallet, network)
VALUES
  (1, 'Bitcoin', '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a', 'Ethereum (ERC20)'),
  (2, 'Bitcoin', '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a', 'Ethereum (ERC20)'),
  (3, 'Bitcoin', '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a', 'Ethereum (ERC20)'),
  (4, 'Bitcoin', '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a', 'Ethereum (ERC20)'),
  (5, 'Bitcoin', '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a', 'Ethereum (ERC20)');
