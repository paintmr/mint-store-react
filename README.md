# Welcome to Mint-Store-React

To use the app, please go to https://mintstore.bytepalette.com/

# App description

This is a React mobile web app. It helps people find the discount coupons from shops like restaurants, hotels, and bars, so people can enjoy their life in a cost-effective way.

# Technologies used

- HTML, CSS, JavaScript
- React
- Create React App
- React-Slick
- React-Redux
- Middleware(Redux-Thunk, dataFetching)
- React-Router, PrivateRoute
- Reselect
- Dynamic imports and route-centric code plitting
- Debug tools(React Developer Tools, Redux DevTools)
- Git, GitHub

# Pages

The app consists of the following pages:

    Home 👉 ProductDetails

    Search 👉 SearchRedults

    Login 👉 Purchase 👉 UserCentre

# Home page

On the Home page, when it is mounted, it displays product data in components like the discount list and recommended list.

When the user scrolls the screen, she can get more of the recommended list until she gets the end of the list.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-home1.png?raw=true)![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-home2.png?raw=true)

# Product Details page

Every time the user click a product in the discount list or the recommended list, she is directed to the detail page of that product, which shows not only product details but also shops related to the product.

To make this works, Redux provides not only product details but also shops related to the product.

When a user who has logged in clicks one of the two "Buy Now" buttons, she is directed to the Purchase page.

When a user who has **_not_** logged in clicks one of the two "Buy Now" buttons, she is redirected to the Login page.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-product-details1.png?raw=true)![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-product-details2.png?raw=true)

# Search page

When the user clicks the search bar at the top of the Home page, she is directed to the Search page.

When she enters something into the input box, a related search keyword list occurs for her reference.

When she clickes the little corss icon at the end of the input box, she clears her input and the related keyword list disappears.

When she clicks the cancel button, she goes back to the Home page.

When she clicks the keyword either in the related search keyword list or the popular search keyword list, the keyword is added to the search history list, and she is directed to the search result page.

The user may clear all search results by clicking the "Clear History" button.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-search1.png?raw=true)![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-search2.png?raw=true)

# Search Results page

On the search results page, the user sees shops related to the keyword she has just clicked.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-search-results.png?raw=true)

# Login page

When the user clickes the account icon at the top-right corner of the Home page, she is either directed to the UserCentre page if she has logged in or redirected to the Login page if she has not logged in.

Building a PrivateRoute component can make this happen.

When the user has inputed a random number and a password, she can login. And the number and login status are stored by localStorage.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-login.png?raw=true)

# Purchase page

When the user clicks one of the two "Buy" buttons on the ProductDetails page, she is directed to the Purchase page.

When the user has placed orders, a dialog pops out to show the success.

When the user clicks the word 'my orders', she is directed to the UserCenter page to view her orders.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-purchase.png?raw=true)

# UserCentre page

The user can see different order list when she clicks the tabs: All, Available, Completed, Refund.

The user can delete any order by clicking the "Delete" button.

The user can comment an order by clicking the "Comment" button.

Only completed orders which have not been commented have a "Comment" button.

Every time the user has deleted or commented an order, a dialog pops up to let her know the result.

The user can click the home button on the top-left corner to go back to the Home page and the logout button on the top-right corner to log out.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-user-centre.png?raw=true)

# Redux folder structure

The Redux folder consists of the middleware folder, the modules folder, and store.js.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-redux.png?raw=true)
The dataFetching middleware is used to process data fetching actions.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-middleware-data-fetching.png?raw=true)

# React-Slick

React-Slick is a popular and customizable carousel/slider library for React applications.

On the Home page, the category area and the promotion area (marked with the blue boxes in the picture) are made with the help of React-Slick.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-react-slick.png?raw=true)

# Private Route

The Private Route makes sure that only users who have logged in can visit the Purchase page and the User Centre page.

# Reslect

ordersSelector gets the order data displayed on the User Centre page.

As long as the two input selectors (tabIndexSelector and getAllOrdersSelector) don't change, ordersSelector would not make any recomputation, which improves the app performance.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-reselect.png?raw=true)

# Dynamic imports and route-centric code splitting

All pages are dynamically imported and the code is split based on routes.

The function asyncComponent() makes this happen. It takes the dynamic importing function as its argument and returns a React class component once the component is loaded.
![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-dynamic-imports1.png?raw=true)![enter image description here](https://github.com/paintmr/mint-store-react/blob/main/App%20UI%20mockups/readMe%20description%20pictures/development-portfolio-mint-store-dynamic-imports2.png?raw=true)
