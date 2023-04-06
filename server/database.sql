CREATE DATABASE fossologydemo;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate v4(),
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    email varchar(30) NOT NULL,
    password text NOT NULL
);



-- INSERT FAKE USERS
INSERT INTO users (first_name, last_name, email, password)
VALUES ('Abhinav', 'Pratap', 'theapratap@gmail.com', '123456');