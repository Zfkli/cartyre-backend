-- Create tbl_customers_a187793
CREATE TABLE tbl_customers_a187793 (
    fld_customer_id VARCHAR(255) PRIMARY KEY,
    fld_customer_fname VARCHAR(255),
    fld_customer_lname VARCHAR(255),
    fld_customer_gender VARCHAR(255),
    fld_customer_phone VARCHAR(255)
);

-- Create tbl_orders_a187793
CREATE TABLE tbl_orders_a187793 (
    fld_order_id VARCHAR(255) PRIMARY KEY,
    fld_order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fld_staff_id VARCHAR(255),
    fld_customer_id VARCHAR(255),
    FOREIGN KEY (fld_staff_id) REFERENCES tbl_staffs_a187793(fld_staff_id) ON DELETE SET NULL,
    FOREIGN KEY (fld_customer_id) REFERENCES tbl_customers_a187793(fld_customer_id) ON DELETE SET NULL
);

-- Create tbl_orders_details_a187793
CREATE TABLE tbl_orders_details_a187793 (
    fld_order_detail_id VARCHAR(255) PRIMARY KEY,
    fld_order_id VARCHAR(255) NOT NULL,
    fld_product_id VARCHAR(255) NOT NULL,
    fld_order_detail_quantity INT,
    FOREIGN KEY (fld_order_id) REFERENCES tbl_orders_a187793(fld_order_id) ON DELETE CASCADE,
    FOREIGN KEY (fld_product_id) REFERENCES tbl_products_a187793(fld_product_id) ON DELETE CASCADE
);

-- Create tbl_products_a187793
CREATE TABLE tbl_products_a187793 (
    fld_product_id VARCHAR(255) PRIMARY KEY,
    fld_product_name VARCHAR(255),
    fld_price FLOAT,
    fld_brand VARCHAR(255),
    fld_tyre_size VARCHAR(255),
    fld_stock_left INT,
    fld_warranty_length INT,
    fld_product_image VARCHAR(255) NOT NULL
);

-- Create tbl_staffs_a187793
CREATE TABLE tbl_staffs_a187793 (
    fld_staff_id VARCHAR(255) PRIMARY KEY,
    fld_staff_name VARCHAR(255),
    fld_staff_gender VARCHAR(255),
    fld_staff_age INT,
    fld_staff_salary INT,
    fld_staff_email VARCHAR(255) NOT NULL
);
