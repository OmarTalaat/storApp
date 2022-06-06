CREATE TABLE items (
    itemid SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(orderid),
    product_id bigint REFERENCES products(productid)
);