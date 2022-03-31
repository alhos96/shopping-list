#### Shopping List
The software system being produced is called Shopping List. It is application that allows customers to keep track of their shopping lists.

### technologies
This application is developed in nodejs with MongoDB. I have also used following packages:

 - express
 - jsonwebtoken
 - mongoose
 - bcrypt
 - cors
 - dotenv

### description and features
The Shopping List app will provide following functions and features:

User is able to:
 - register
 - login
 - change his password
 - full CRUD operations for personal shopping lists
 - request shopping report for certain period in time

### starting the application

If you can't start the application you probably missed to check some of the checkboxes bellow.

- [ ] After cloning repository please **add your own .env file** at the root folder with following variable: 
  - **PORT** = "example_of_format" - if not provided 5000 will be used
  - **MONGO_URI** = "example_of_format" - if not provided `mongodb://localhost:27017` will be used
  - **JWT_SECRET** = "example_of_format" - if not provided "shoppinglist" will be used
- [ ] run `npm install` to install all the dependencies. 
- [ ] run `npm start` script to start the application in the development mode on http://localhost:3000.. 


### using the application

- [ ] Open Postman or any other API testing application.
- [ ] Setup ` Contet-Type ` in Headers to ` application/json ` 
- [ ] Setup ` authorization ` in Headers containing token that you will get in response when loged in. 

## user

` {
  "email":"someone@someone.com",
  "password":"password123"
} `

**register** new user by sending ` POST ` request to ` http://localhost:5000/user/register `
**login** with your credentials with ` POST ` request to ` http://localhost:5000/user/login `
**change password** by sending ` PATCH ` request to ` http://localhost:5000/user `


## list 

` {
    "title": "List title example",
    "groceries": [{"product":"milk", "amount":3}, {"product":"sugar", "amount":4}, {"product":"flour", "amount":1}]
} `

**create** new list by sending ` POST ` request to ` http://localhost:5000/list `
**update** existing list with ` PATCH ` request to ` http://localhost:5000/list/:listId `
**delete** existing list with ` DELTE ` request to ` http://localhost:5000/list/:listId `
**get report** by sending ` GET ` request to ` http://localhost:5000/list/:fromDate/:toDate `

Have fun!
