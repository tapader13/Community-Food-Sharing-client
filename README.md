# Community Food Sharing and Surplus Reduction Platform

## Purpose

The **Community Food Sharing and Surplus Reduction Platform** is designed to help reduce food waste and foster community support by enabling users to donate, request, and manage food items seamlessly with secure process. It provides a responsive and secure interface for food sharing and ensures user-friendly interaction with modern design.

## Live URL

[Live Website](#https://as11-a6789.web.app/)

## Key Features

### General

- Fully responsive design for mobile, tablet, and desktop.
- Clean and user-friendly UI with proper alignment and spacing.
- Authentication using Firebase (email/password and Google-based login).
- Password validation with error feedback.

### Pages and Functionalities

- **Home Page**  
  - Attractive banner and featured food items.  
  - Extra sections for additional context.  

- **Available Foods Page**  
  - Displays all available food items in card format.  
  - Sorting by expiry date and searching by food name.  

- **Add Food (Private)**  
  - Form to add food items with fields such as name, quantity, location, and expiry date.  
  - Default food status set to "Available."  

- **Manage My Foods (Private)**  
  - Displays all foods added by the logged-in user.  
  - Includes options to update and delete food items.  

- **My Food Requests (Private)**  
  - Displays all food requests made by the logged-in user.  

- **Food Details Page**  
  - Shows detailed information about a selected food item.  
  - Allows logged-in users to request food.  

### Security

- JWT-based authentication for private routes.
- Firebase and MongoDB credentials are secured using environment variables.
- Authorization ensures users can only access their own data.

### Additional Features

- **TanStack Query**: Used for fetching and updating data.  
- **Change Layout**: Toggle between 3-column and 2-column layouts on the Available Foods page.  
- **Custom Hook**: Axios instance with a secure setup also for auth provied all over app use hook.

## Technologies Used

### Client-Side

- **React**: Frontend framework with vite.
- **Tailwind CSS**: Styling.
- **Firebase**: Authentication and deployment.
- **TanStack Query**: API fetching and caching.
- **React Hook Form**: Form handling and validation.
- **SweetAlert2**: Alerts and confirmations.
- **React Hot Toast**: Notifications.
- **Axios**: API calls.
- **Swiper**: Sliders.
- **DatePicker**: React date picker use for seamlessly date manegment.

### Server-Side

- **Node.js**: Backend runtime.
- **Express**: Server framework.
- **MongoDB**: Database.
- **JWT**: Authentication.
- **dotenv**: Managing environment variables.
- **Cors**: Cross-Origin Resource Sharing.
- **Nodemon**: Development automation.
- **Cookie-parser**: Use for parsing cookie from client side.
