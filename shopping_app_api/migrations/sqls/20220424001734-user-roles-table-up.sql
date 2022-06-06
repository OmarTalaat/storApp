CREATE TABLE user_roles (
    user_id bigint REFERENCES users(userid),
    role_id bigint REFERENCES roles(roleid)
);




INSERT INTO user_roles
( user_id, role_id)
VALUES
( 1, 1),
( 1, 3),
( 2 , 2),
(2,3);