CREATE TABLE orders (
    orderid SERIAL PRIMARY KEY,
    status VARCHAR(15),
    adress VARCHAR,
    countryName VARCHAR(50),
    zip VARCHAR(20),
    nameoncard VARCHAR ,
    creditcardNumber VARCHAR ,
    cvv VARCHAR(10),
    exirationDate VARCHAR ,
    total float,
    user_id bigint REFERENCES users(userid)
);



