# Money Manager Application

A Money Manager App made with React, ChakraUI, & Firebase

![screencapture-localhost-3000-home-2022-01-15-16_17_54](https://user-images.githubusercontent.com/50259107/149618771-71eb50ea-af2d-415e-bfea-96b87b6c5c99.png)

## Overview

In the project directory, you can run:

## Getting Started

1. Clone the repository and `cd` into its root directory
2. Run `npm install` to install dependencies
3. Run `npm start` from the project directory to run in development mode
4. Create a project in firebase console (if you don't have one), and copy the firebaseConfig 
5. Create a .env file in your root directory and paste all values from your firebaseConfig you copied

This application is served at [http://localhost:3000](http://localhost:3000) by default.

## Usages

In every pages of the app, you can toggle either `light` or `dark` color mode based on your preferences.

You will need to create an account by either `Sign in`, `Sign up`, or `Log in with Google` in order to use the money manager app.

Once you've successfully authenticated, you'll be redirected to the Home Page where you can `CREATE` your first Income or Expense transaction.

In the Home Page, you can Create or Delete Transactions along with visualizing your total Income and Expense in a form of Charts.

The Navigation Bar in the Home Page will show your Username at the right corner and it provides you `Log out` menu for you to log out. 

**Note:** You authenticated account is registered in Firebase Auth and your transactions list is stored in Firebase Firestore.
