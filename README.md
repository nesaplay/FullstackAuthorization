# Fullstack Authorization Project
This is a Client + Server Side Signup/Signin Authorization project. Here I'm showing the usage of encrypted passwords and tokens used to authenticate requests, consumed by React/Redux application. 
```    
Client: Form validation and authenticated API requests. Custom HOC.  
```
```
Server: Passport Strategies with JWT Tokens. Bcrypt password hashing. MongoDB localy wired.    
```

### Client Side 

    -   React + Redux
    -   ReduxForm Validation
    -   ReduxThunk Middleware
    -   HOC Authentication Wrapper

### Server Side 

    -   NodeJS (Express)
    -   MongoDB (Mongoose)
    -   JSON Web Token
    -   PassportJS
    -   Bcrypt

## Installing

A step by step series to get the development env running  

### Server

Install packages 

```
yarn install  
```

Run MongoDB localy

```
mongod
```
Start the server

```
yarn run dev  
```
### Client

Install packages

```
yarn install  
```

Start the server

```
yarn start
```

Ports 8080 and 3090 were chosen randomly