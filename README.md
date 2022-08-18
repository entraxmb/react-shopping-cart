# react-shopping-cart

A React based shoping cart, utilising the Context API to handle state management.

The application has the following requirements:

## requirements of cart

A shopping cart that can receive a selection of the below products and calculate the bill. The bill should include:
• Subtotal before special offers applied
• Special offers applied and their individual saving
• Final total with savings applied

## scenarios

Scenarios
• Buy a soup and two breads - only one bread should be reduced
• Buy three cheeses - only one should be free
• Buy four cheeses - two now should be free
• Butter alone
• Butter with other things
• A mixture of the above scenarios

## demo content

### products & prices

• Bread £1.10
• Milk 50p
• Cheese 90p
• Soup 60p
• Butter £1.20

### special offers

• When you buy a Cheese, you get a second Cheese free!
• When you buy a Soup, you get a half price Bread!
• Get a third off Butter!

## notes

I have the discounts outstanding, though the 3rd off for butter is implemented when buying from the main page.

My function for the discount checking would occur as the shopping cart is rendered to the screen.

It would cycle through each element and would check the 'offers' if one has been applied.

The 'offers' is to be set out as below:

id | offerOnProduct | itemOffered | discount
• 1 | Cheese | Cheese | 100%
• 2 | Soup | Bread | 50%
• 3 | Butter | | 1/3 off

The reducers in the application are where I am doing majority of the heavy lifiting for the functionality.

## Accessing the site

The site is running on https://rct.mbproj.com

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### `npm run cypress`

Launches the test runner

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
