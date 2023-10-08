# Product Management System

The Product Management System is a web application built using Node.js and Express.js that allows users to manage and track various products. This README provides an overview of the core functionalities and how to use the system.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)


## Features

The Product Management System offers the following core features:

1. **Get All Products**: Retrieve a list of all available products.

2. **Get Product by ID**: Fetch product details using a unique product ID.

3. **Find Products by Title**: Search for products with a specific title keyword.

4. **Create Product**: Add a new product to the system with details such as title, type, price, and stock.

5. **Update Product**: Modify an existing product's details, including title, type, price, and stock.

6. **Delete Product**: Remove a product from the system using its unique ID.

## Installation

To run the Product Management System locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/kongcmk/product-management-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd product-management-system
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

The application should now be running locally on `http://localhost:8000`.

## Usage

To use the Product Management System, you can interact with it via API requests or use a front-end application that communicates with these endpoints.

## API Endpoints

The following are the API endpoints provided by the system:

- **GET `/products`**: Get a list of all products.

- **GET `/products/id/:Id`**: Get product details by ID.

- **GET `/products/search?title={keyword}`**: Find products by title keyword.

- **POST `/products`**: Create a new product.

- **PUT `/products/id/:Id`**: Update an existing product.

- **DELETE `/products/id/:Id`**: Delete a product by ID.