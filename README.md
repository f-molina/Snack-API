# Snack-API

## Installation

### Requirements

To run the project locally you must have: **`node`**, **`npm`** and **`MongoDB`** installed.

You can check if you have them installed with the following commands:

```
npm -v
```

```
node -v
```

```
mongod --version
```

## Dumping the Database

To use the DB dump provided, first, you need to go where mongoDB is installed and paste the dump folder provided inside \bin, a path where \bin is would look like this:

```
C:\Program Files\MongoDB\Server\4.0\bin>
```

Once you paste the dump folder, you need to open a terminal and go to the \bin path where you saved the dump folder and type the following command:

```
C:\Program Files\MongoDB\Server\4.0\bin>mongorestore --db snacks dump/snacks
```

You should see a “done” message, that means it was restored and it is ready to use. The Database has two collections: users and products so that you can test the API, there are currently two users in the user collection (admin, guest), in order to use the admin account use the following credentials:
email: admin@admin.com, password: admin. For the guest user: email: guest1@gmail.com, password: guest

## Setting up the project

Clone the repository and once it is in your machine, run the following command from the terminal on the path where you cloned the repository to install the modules:

```
npm install
```

Once you installed the modules you need to change 2 files so that you can run it locally. The first one is "app.js", on line 16 change the URI so that it looks like this:

```
mongoose.connect('mongodb://localhost/snacks', {
  useNewUrlParser: true
}).then(db => console.log("DB connected"))
  .catch(err => console.log(err));
  ```
The second file is located in /middlewares/swagger.js, on line 12 change the host to:

```
var swaggerDefinition = {
    swagger: "2.0",
    info: {
      title: 'Snack API',
      version: '1.0.0',
      description: 'Rest API that allows a small snack store to manage their products',
    },
    host: 'localhost:3000',
    basePath: '/api/v1',
  };
```

Once you changed both files, you can run the following command to start the nodemon script which starts and runs the server with no interruption

```
npm run devstart
```

## API Endpoints

### Products

### GET
`/api/v1/products`. Get a list of products sorted by name <br>
`/api/v1/products/productlikes`. Get a list of products sorted by likes <br>
`/api/v1/products/search/{name}`. Search for a product by it's name <br>

### POST
`/api/v1/products/create`. Create a product (admin only)

### PUT
`/api/v1/products/update/{id}`. Update a product's price by id. (admin only) <br>
`/api/v1/products/like/{name}`. Like a product (logged in users only) <br>
`/api/v1/products/buy/{name}`. Buy a product by it's name (logged in users only)

### DELETE
`/api/v1/products/delete/{id}`. Delete a product by id (admin only)

### Users

### POST
`/api/v1/users/register`. Register an user with email and password. <br>
`/api/v1/users/login`. Sign in with email and password. <br>

### GET
`/api/v1/users/logout`. Logout. <br>
`/api/v1/users`. Shows a list of users in JSON format.

## Heroku app

http://snacks-challenge.herokuapp.com/
