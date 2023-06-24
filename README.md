# e-commerce-app-thesis-project

## What e-commerce-app does

The e-commerce app is designed to streamline the process of buying and selling products. It offers a range of features such as user registration, login, and logout functionality. Additionally, the app ensures that users' shopping carts persist across login and logout sessions, allowing them to easily resume their shopping experience. The app also implements effective stock management during the checkout process and automatically removes products with zero quantity from the marketplace, ensuring accurate inventory representation.

## Future Improvements

There are several areas that require attention for future development. Here are some of the key priorities:

- **Integration of Transaction Records:** The backend API currently maintains transaction records, but this functionality needs to be integrated into the frontend. This will enable users to view their transaction history and provide better transparency.
- **Real Transactions with Stripe:** Currently, the checkout process does not involve real transactions. To enable users to make actual payments and receive payments, integration with a payment gateway like Stripe will be used. This will enhance the app's functionality and make it a fully functional e-commerce platform.
- **UI Improvement** Not much time was spent on the UI design and responsiveness, but this shouldn't take long.

## A quick glimpse into the app's UI

![Home Page](/app%20screenshots/Screenshot%202023-06-18%20at%206.46.13%20PM.png)
*Home Page*

![Login Page](/app%20screenshots/Screenshot%202023-06-18%20at%206.46.53%20PM.png)
*Login Page*

![Registration Page](/app%20screenshots/Screenshot%202023-06-24%20at%205.39.46%20PM.png)
*Registration Page*

![Product Details Page](<app screenshots/Screenshot 2023-06-18 at 7.42.22 PM.png>)
*Product Details Page*

![Shopping Cart](/app%20screenshots/Screenshot%202023-06-18%20at%206.47.10%20PM.png)
*Shopping Cart Page*

![Navbar](/app%20screenshots/Screenshot%202023-06-18%20at%206.47.37%20PM.png)
*Navbar*

![List Product Page](/app%20screenshots/Screenshot%202023-06-18%20at%206.47.56%20PM.png)
*List Product Page*

![User Store](/app%20screenshots/Screenshot%202023-06-18%20at%206.48.08%20PM.png)
*User Store Page*

## Set up

The first thing you will need to do is `npm i` in the root (top-level folder), client, and server directories from your terminal.

Next, you would need to create a .env file in your server directory and add a port number to run your backend server, like so: `PORT=3000`.

## Start the app

To start your backend API, go to the **server** directory and run `npm run serve` in your terminal.

To start your Vite server to serve your frontend assets go to the **client** directory and run `npm run dev` in your terminal.
