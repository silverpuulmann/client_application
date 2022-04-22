--liquibase formatted sql
--changeset silver:1:countries
CREATE TABLE IF NOT EXISTS COUNTRY(ID INT PRIMARY KEY AUTO_INCREMENT, NAME VARCHAR(255));
MERGE INTO COUNTRY (ID, NAME)
VALUES
    (1, 'Estonia'),
    (2, 'Latvia'),
    (3, 'Lithuania'),
    (4, 'Finland'),
    (5, 'Sweden');

--changeset silver:2:users
CREATE TABLE IF NOT EXISTS CLIENT(ID INT PRIMARY KEY AUTO_INCREMENT, ADDRESS VARCHAR(255), EMAIL VARCHAR(255), FIRST_NAME VARCHAR(255),
LAST_NAME VARCHAR(255), PASSWORD VARCHAR(255), USER_NAME VARCHAR(255), COUNTRY_ID INT, CREATED_BY_ID INT);
MERGE INTO CLIENT (ID, ADDRESS, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, USER_NAME, COUNTRY_ID, CREATED_BY_ID)
    VALUES
    (1, 'Hapuoblika 4-2', 'John@Smith.com', 'John', 'Smith', 'Parool1', 'User1', 1, 1),
    (2, 'Viigimarja 25', 'Bob@Smith.com', 'Bob', 'Smith', 'Parool2', 'User2', 2, 1),
    (3, 'Tõnismäe 13-1', 'Billy@Smith.com', 'Billy', 'Smith', 'Parool3', 'User3', 4, 1);
