CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(100),
    user_password VARCHAR
);



INSERT INTO users
( username, user_password)
VALUES
( 'Admin', '$2b$10$DaV1APn3ehdp/zbAXpqCWO6KMgUlh.kM2ayRhBxVXjGSncUAuz9zW'),
('Moderator', '$2b$10$DaV1APn3ehdp/zbAXpqCWO6KMgUlh.kM2ayRhBxVXjGSncUAuz9zW')

