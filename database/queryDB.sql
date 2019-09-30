CREATE DATABASE panpanvinovino;
USE panpanvinovino;

CREATE TABLE users(
  id INT(11) NOT NULL,
  fullName VARCHAR(50) NOT NULL,
  email VARCHAR(25) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;
/* ------------------- */

CREATE TABLE ingredients(
  id INT(11) NOT NULL,
  ingredientName VARCHAR(50) NOT NULL,
  typeMeasureSolidIngredient VARCHAR(50) NOT NULL DEFAULT 'Kilogramos',
  valueTypeMeasureSolid DECIMAL(20) NOT NULL,
  typeMeasureLiquidIngredient VARCHAR(50) NOT NULL DEFAULT 'Litros',
  valueTypeMeasureLiquid DECIMAL(20) NOT NULL,
  ingredientQuantity DECIMAL(20) NOT NULL,
  user_id INT(11),
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE ingredients
  MODIFY valueTypeMeasureSolid INT(11) NOT NULL;

ALTER TABLE ingredients
  MODIFY valueTypeMeasureLiquid INT(11) NOT NULL;

ALTER TABLE ingredients
  MODIFY ingredientQuantity INT(11) NOT NULL;

ALTER TABLE ingredients
  ADD PRIMARY KEY (id);

ALTER TABLE ingredients
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE ingredients;
/* ------------------- */

CREATE TABLE products(
  id INT(11) NOT NULL,
  breadName VARCHAR(50) NOT NULL,
  breadFlavor VARCHAR(50) NOT NULL,
  breadQuantity INT(11) NOT NULL,
  saleStatus VARCHAR(50) NOT NULL,
  user_id INT(11),
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user2 FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE products
  ADD PRIMARY KEY (id);

ALTER TABLE products
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE products;
/* ------------------- */