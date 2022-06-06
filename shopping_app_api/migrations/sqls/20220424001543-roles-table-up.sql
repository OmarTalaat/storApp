CREATE TABLE roles(
    roleid SERIAL PRIMARY KEY,
    name VARCHAR(15)
);



INSERT INTO roles
(name)
VALUES ('Admin'),('Moderator'),('User'),('Employee');