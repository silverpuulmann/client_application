##CLIENT APPLICATION

This is a simple client management application. 

Technology stack for the application is:
Back-end:
* Java 11
* Spring Boot 2.6.6
* H2 in-file database for storing data
* Liquibase for database integration (db_init/changelog.sql)

Front-end:
* React 18.0.0
* Bootstrap 5.1.3
* Axios 0.26.1

Integration:
* Frontend maven plugin to build and run the front-end React application 

#####To run the application:
To run the application with maven you should navigate to the project source folder
from command line and first make a clean build using command:
* mvn clean install -DskipTests

And then execute the build using command:
* mvn exec:java -Dexec.mainClass="silver.srini.clients.ClientsApplication" -DskipTests

Then the application can be accessed from http://localhost:8080

It is also possible to start the application using IntelliJ or some other IDE from the ClientsApplication 
class but you should first build the project using maven since the plugin for compiling the front-end React app is included
in the projects pom.xml. 

It is also possible to run the front-end app separately using 'npm start' inside the ./app folder. The front-end
application is then run at http://localhost:3000/ 

#####Possible problems on startup:
* If the back-end application is not started there will be errors on the front-end side and user will
not be able to log in.
* When executing the application from maven Surefire tests sometimes fail because Liquibase checksums do
not match. This is why '-DskipTests' is added to both mvn commands. It is also possible to delete the db created
after building the project (delete the contents of ./db folder).

####Application description
The application uses a simple login page where user can enter username and
password (there are some users listed below which you can use for testing).
If user has entered username and password they are sent to the back-end API which
checks if username matches the password.

If user is logged in successfully he is displayed a list of clients which are 
related to him. This filtering is done by checking the createdBy field in the database.

User has possibilities to add new clients or edit data for the clients previously entered.

There is also a possibility to log out of the application to change users.

#####Possible further developments
With the basic functionality implemented there are some places which can be improved:
* Add some kind of JWT security functionality to the authentication module.
* Add the possibility to delete users.
* Some smaller tweaks for the user interface.

####Users for testing
There are 3 users to log in with:
1. User1, pw: Parool1
2. User2, pw: Parool2
3. User3, pw: Parool3

####Postman
There is a Postman collection added to the project in ./postman catalog.
This can be used for testing the API functionality.

####Database
To access the local H2 database:
1. Go to: http://localhost:8080/h2-console/
2. Set JDBC URL to:  jdbc:h2:./db/data
3. Log in using User Name: sa, Password: (empty)

To clear the database delete files in project ./db folder.