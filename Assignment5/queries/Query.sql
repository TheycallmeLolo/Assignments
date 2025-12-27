CREATE DATABASE retail_Store;

USE retail_Store;

CREATE TABLE tbl_Suppliers
(
    supplierId    INT PRIMARY KEY AUTO_INCREMENT,
    supplierName  TEXT,
    contactNumber TEXT
);

CREATE TABLE tbl_Products
(
    productId     INT AUTO_INCREMENT PRIMARY KEY,
    productName   TEXT,
    price         DECIMAL(10, 2),
    stockQuantity INT,
    FK_supplierID INT,
    CONSTRAINT FK_Suppliers_Products FOREIGN KEY (FK_supplierID) REFERENCES tbl_Suppliers (supplierId)
);

CREATE TABLE tbl_Sales
(
    saleID       INT PRIMARY KEY AUTO_INCREMENT,
    quantitySold INT,
    saleDate     DATE,
    FK_productId INT,
    CONSTRAINT FK_Product_Sales FOREIGN KEY (FK_productId) REFERENCES tbl_Products (productId)
);

ALTER TABLE tbl_Products
    ADD category VARCHAR(50);
ALTER TABLE tbl_Products
    DROP category;

ALTER TABLE tbl_Suppliers
    MODIFY contactNumber VARCHAR(15);

ALTER TABLE tbl_Products
    MODIFY ProductName VARCHAR(255) NOT NULL;

INSERT INTO tbl_Suppliers (supplierName, contactNumber) VALUE
    ('FreshFoods', '01001234567'),
    ('ExpiredFoods', '0147851485');

INSERT INTO tbl_Products (productName, price, stockQuantity, FK_supplierID)
VALUES ('Milk', '15.00', '50', '1'),
       ('Bread', '10.00', '30', '1'),
       ('Eggs', '20.00', '60', '1');

INSERT INTO tbl_Sales (quantitySold, saleDate, FK_productId) VALUE
    ('0', null, '4'),
    ('2', '2025-05-02', '1'),
    ('5', '2025-05-02', '2');

UPDATE tbl_Products
SET price = 25.00
WHERE productId = 2;

DELETE
FROM tbl_Products
WHERE productId = 3;

SELECT FK_productId,
       productName,
       SUM(QuantitySold) AS TotalQuantitySold
FROM tbl_Sales
         INNER JOIN tbl_products
                    ON tbl_Sales.FK_productId = tbl_Products.productId
GROUP BY FK_productId;


SELECT MAX(stockQuantity)
INTO @MAX
FROM tbl_Products;

SELECT *
FROM tbl_Products
WHERE stockQuantity = @MAX;

SELECT *
FROM tbl_products
ORDER BY StockQuantity DESC
LIMIT 1;

SELECT *
FROM tbl_Products
WHERE stockQuantity = (SELECT MAX(stockQuantity)
                       FROM tbl_Products);

#  Find suppliers with names starting with 'F'
SELECT *
FROM tbl_Suppliers
WHERE supplierName LIKE 'F%';

#  Show all products that have never been sold.
SELECT *
FROM tbl_Products
WHERE productId NOT IN (SELECT FK_productId FROM tbl_Sales);

#  Get all sales along with product name and sale date.
SELECT saleID, productName, saleDate
FROM tbl_Sales
         INNER JOIN tbl_products
                    ON tbl_Sales.FK_productId = tbl_Products.productId;

#  Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables.
CREATE USER store_manager@'localhost' IDENTIFIED BY '80085';
GRANT SELECT, INSERT, UPDATE ON *.* TO store_manager@'localhost';
REVOKE UPDATE ON *.* FROM store_manager@'localhost';
GRANT DELETE ON *.* TO store_manager@'localhost';


# BONUS --leet code
CREATE TABLE visits
(
    visit_id    INT UNIQUE AUTO_INCREMENT,
    customer_id INT
);

CREATE TABLE transactions
(
    transaction_id INT UNIQUE,
    visit_id       INT,
    amount         INT
);

INSERT INTO Visits (visit_id, customer_id)
VALUES (1, 23),
       (2, 9),
       (4, 30),
       (5, 54),
       (6, 96),
       (7, 54),
       (8, 54);
INSERT INTO Transactions (transaction_id, visit_id, amount)
VALUES (2, 5, 310),
       (3, 5, 300),
       (9, 5, 200),
       (12, 1, 910),
       (13, 2, 970);



ALTER TABLE transactions
    ADD CONSTRAINT FK_visits_transactions
        FOREIGN KEY transactions (visit_id)
            REFERENCES visits (visit_id);


SELECT visits.customer_id,
       COUNT(visits.visit_id) AS count_no_trans
FROM visits
         LEFT JOIN transactions AS tran
                   ON visits.visit_id = tran.visit_id
WHERE tran.visit_id IS NULL
GROUP BY customer_id;