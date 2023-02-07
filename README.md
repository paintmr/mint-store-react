# Welcome to mint-store-react16

## React Version

    "react": "16.14.0",
    "react-dom": "16.14.0",
    "react-redux": "5.0.7",
    "react-router-dom": "4.3.1",
    "react-scripts": "1.1.4",
    "react-slick": "^0.29.0",
    "redux": "4.0.0",
    "redux-thunk": "2.3.0",
    "web-vitals": "^2.1.0"

## App Structure

The app ui part consists of the following pages:

- Home

## Redux

The Redux in this project has a `'duck' structure`.

The redux file consists of the following folders and file: middleware, modules, and store.js

### Modules

The module file consists of two types of files: the `files to store different types of data` (e.g. products.js, and comments.js in the entities folder), and the `files` `for each page` (e.g. HomePage, ProductDetailPage, LoginPage).

Take redux/modules/home.js and redux/modules/entities/products.js for example.

The home.js file contains all the actions, reducers, and selectors for the HomePage. Once the HomePage is mounted, home.js dispatches request actions to fetch product list data. The actions are processed by reducers in both home.js and products.js. The state in home.js keeps product id arrays for differences sections of the HomePage, while the state in products.js keeps all product data. Then the selectors in home.js get all product data from products.js based on the id arrays home.js keeps.

### Middleware

The dataFetching.js file in the Middleware folder is used to dispatch data-fetching actions (request-sent, request-success, request-failure).

All data-request is sent by this middleware, which prevents redundant code.

The dataFetching.js file detects if the action contains the key 'FETCH_DATA' which contains a string array containing requestType, successType, and failureType. If the key 'FETCH_DATA' exists, the dataFetching.js file will dispatch these three request types. Otherwise, it will pass the action to the next reducer/middleware.
