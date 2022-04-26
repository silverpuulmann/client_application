##CLIENT APPLICATION

This is a simple client management application. 

Technology stack for the application is:
Back-end:
* Java 11
* Spring Boot 2.6.6
* H2 in-file database for storing data
* Liquibase to create database files if they do not exist (db_init/changelog.sql)

Front-end:
* React 18.0.0
* Bootstrap 5.1.3
* Axios 0.26.1

#####To run the application:
This is text for test

####Users for testing
There are 3 users to log in with:
1. User1, pw: Parool1
2. User2, pw: Parool2
3. User3, pw: Parool3

####Postman
There is a Postman collection added to the project in ./postman catalog.
This can be used for testing the API functionality.

####Notes
To access the local H2 database:
1. Go to: http://localhost:8080/h2-console/
2. Set JDBC URL to:  jdbc:h2:./db/data
3. Log in using User Name: sa, Password: (empty)

To clear the database delete files in project ./db folder.