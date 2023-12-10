# SwiftGuard: Academia
The SwiftGuard Academia student management system offers a comprehensive suite of tools to facilitate academic progress for both students and teachers. The system is designed to be user-friendly and intuitive, providing functionalities for students to enroll in courses, view grades, and access important academic information. Additionally, teachers can utilize features to assign and grade assignments, communicate with students, and manage classes effectively.

The relational database designed for the data management of students and teachers consists of six basic entities: Instructors, Departments, Students, Sections, Semesters, and Courses. These entities are interconnected through ten relationships to enhance the database design and facilitate efficient data warehousing. The functionalities of the system cater to both student and teacher perspectives, allowing for seamless access to academic performance details, enrollment in courses, and management of instructional responsibilities.

The project utilizes various technologies and software, including ORACLE DBMS for database management, JavaScript for implementation, HTML/CSS and Bootstrap for front-end development, NodeJS framework for backend maintenance, and Microsoft Visual Studio as the integrated development environment (IDE). Furthermore, The Project emphasizes the importance of security integration, highlighting the implementation of input validation, secure cookies, password hashing, and user permissions to ensure the integrity and security of the application.

The security measures implemented in the system, such as input validation to filter out malformed data and block malicious injections, secure cookies with HTTP only and secure attributes, password hashing for irreversible storage, and user permissions for role-based access control, contribute to safeguarding the application against potential vulnerabilities and unauthorized access.
 

 A web-based university portal encapsulating the following features:
* Routing and other REST services handled by ***express JS***.
* Front-End contrived using ***Ejs viewing engine*** and ***Bootstrap 4.0*** 
• Utilized ***Oracle Database 19c*** to maintain and store databases

## How to run:

After forking to your local machine, initialize and install the dependencies using :
```
npm install 

```
By default the application runs on port#3000. You can change this setting in index.js. In order to run the application use the following command :
```
npm start

```
Open your brower and navigate to locahost:3000 (by default) in order to use the application. It is recommended that you are running oracle's VM on your machine alongside its 19c Database service version for this project to work successfully.
