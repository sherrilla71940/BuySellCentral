# e-commerce-app-thesis-project

## What e-commerce-app does

An e-commerce app designed to streamline the process of buying and selling products. It includes essential features such as user registration, login, and logout functionality, and users' shopping carts persist across sessions, allowing them to easily resume their previous shopping experience upon logging back in. Users can add multiple products of varying quantities from different sellers to their shopping carts and check them out simultaneously. The app also ensures accurate inventory representation and removes sold-out products from the marketplace.

The backend was built using TypeScript, Express/Node, PostgreSQL, Sequelize (ORM), and sequelize-typeScript for TypeScript integration with Sequelize.

The frontend was also built using TypeScript along with React, React Router, Vite, CSS modules, Radix UI, Firebase for authentication and authorization, Cloudinary for media upload, and Zustand for state management.

## Future Improvements

There are several areas that require attention for future development. Here are some of the key priorities:

- **Integration of Transaction Records:** The backend API currently maintains transaction for buyers and sellers, but this functionality needs to be integrated into the frontend. This will enable users to view their transaction history and provide better transparency.
- **Real Payment with Stripe:** Currently, the checkout process does not involve real payment. To enable users to make and receive actual payments, integration with a payment gateway like Stripe will be used. This will enhance the app's functionality and make it a fully functional e-commerce platform.
- **Enable Sellers to Update and Delete Their Listed Products** Like transactions, this is already set up in the backend and simply needs to be integrated with the frontend.

## A quick glimpse into the app's UI

![Home Page](/app-screenshots/home-page.png)
_Home Page_

![Login Page](/app-screenshots/login-page.png)
_Login Page_

![Registration Page](/app-screenshots/registration-page.png)
_Registration Page_

![Shopping Cart](/app-screenshots/shopping-cart.png)
_Shopping Cart Page_

![Sort Products](/app-screenshots/sorting.png)
_Sort Products_

![Navbar](/app-screenshots/menu%20component.png)
_Navbar_

![Product Details Page](/app-screenshots/item-details.png)
_Product Details Page_

![Sell Product Page](/app-screenshots/product-form.png)
_Sell Product Page_

![Seller Store](/app-screenshots/seller-store.png)
_Seller Store Page_

## Set up

The first thing you will need to do is `npm i` in the root (top-level folder), client, and server directories from your terminal.

Next, you would need to create a .env file in your server directory and add a port number to run your backend server, like so: `PORT=3000`.

## Start the app

To start your backend API, go to the **server** directory and run `npm run serve` in your terminal.

To start your Vite server to serve your frontend assets go to the **client** directory and run `npm run dev` in your terminal.
