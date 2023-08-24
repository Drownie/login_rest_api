# login_rest_api
Rest API that are used for login, and registration.

## How to Install
- Create .env file in the root folder.
- Create variable 'ATLAS_URI' in .env to store mongodb uri.
- Create variable 'SECRET_KEY' in .env to store secret key.
- Install dependencies
    ``` bash
    npm i
    ```

## ALL API
 - (GET) /users/fetch - fetch all user
 - (POST) /users/create - create new user
 - (GET) /users/user/:id - fetch one user
 - (PUT) /users/user/:id - update user
 - (DELETE) / users/user/:id - delete user