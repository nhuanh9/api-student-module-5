# Install dependencies
```$ npm install```
# Running server
```$ node app.js```
- The server listens at port 3000
# APIs
#### Book model
    {
        id: 1,
        name: 'Clean Code',
        price: 1000,
        description: 'Clean Code Book'
    }

#### Getting all products
```GET http://localhost:3000/products```
#### Getting a product by id
```GET http://localhost:3000/products/1```
#### Creating a product
```POST http://localhost:3000/products```
#### Deleting a product by id
```DELETE http://localhost:3000/products/1```
#### Updating a product by id
```PUT http://localhost:3000/products/1```
