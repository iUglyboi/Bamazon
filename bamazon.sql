DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER(30) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INTEGER(10) NOT NULL,
  stock_quantity INTEGER(45) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('iPad Pro', 'Electronics', 600, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('iPhone XS Max', 'Electronics', 1100, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Printer Paper', 'Office Supplies', 10, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('100x Paper Clips', 'Office Supplies', 4, 1300);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Tyler the Creator Album: Yonkers', 'Music', 45, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Jordan\'s', 'Shoes', 250, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Pillows', 'Home', 30, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Ciroc', 'Liquor', 45, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Candle', 'Home', 15, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Crown Royal', 'Liquor', 40, 8);

