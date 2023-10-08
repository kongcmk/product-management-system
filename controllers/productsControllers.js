const express = require("express");
const fs = require("fs");
const { parse } = require("path");
const { v4: uuidv4 } = require("uuid");
const filePath = "database/products.json";

// Define controller functions for products routes

//GET ALL PRODUCTS
exports.getAllProducts = (req, res) => {
  // const filePath = "database/products.json";

  try {
    // Read the file synchronously
    const jsonData = fs.readFileSync(filePath, "utf-8");

    // Parse the JSON data from the file
    const products = JSON.parse(jsonData);

    // Send the parsed JSON data as the response
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//GET PRODUCT
exports.getProductById = (req, res) => {
  try {
    const requestId = req.params.Id;
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(jsonData);

    const product = products.find((product) => product.id === requestId);

    if (!product) {
      return res
        .status(404)
        .json({ error: `Product with ID ${requestId} not found` });
    }

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).JSON(console.error({ error: `Internal Server Error` }));
  }
};

//GET find product by title keyword
exports.getProductByTitle = (req, res) => {
  try {
    const title = req.query.title;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(jsonData);

    // Filter products by title
    const matchingProducts = products.filter((product) =>
      product.title.toLowerCase().includes(title.toLowerCase())
    );

    if (matchingProducts.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found with the specified title" });
    }

    res
    .status(200)
    .json({ products: matchingProducts });

  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

//POST create product
exports.createProduct = (req, res) => {
  try {
    // Define the file path to your JSON file
    const filePath = "database/products.json";

    // Load products from the JSON file
    let products = [];

    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, "utf-8");
      products = JSON.parse(jsonData);
    }

    // Create a new product from req body
    const newProduct = {
      id: uuidv4(),
      title: req.body.title,
      type: req.body.type,
      price: req.body.price,
      stock: req.body.stock,
      createdAt: new Date().toISOString(), //current date and time
      updatedAt: null,
    };

    // Add the new product to the existing products
    products.push(newProduct);

    // Write the updated product array back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding product" });
  }
};

//PUT update product
exports.updateProduct = (req, res) => {
  try {
    const requestId = req.params.Id;
    const updateProductData = req.body;

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(jsonData);

    //find index by id
    const productIndex = products.findIndex(
      (product) => product.id === requestId
    );

    if (!productIndex === -1) {
      return res
        .status(404)
        .json({ error: `Product with ID ${requestId} not found` });
    }

    products[productIndex] = {
      ...products[productIndex],
      ...updateProductData,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");
    res.status(200).json({
      message: "Product updated successfully",
      product: products[productIndex],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error updating product` });
  }
};

//DELETE delete product
exports.deleteProductById = (req, res) => {
  try {
    const requestId = req.params.Id;
    const jsonData = fs.readFileSync(filePath, "utf-8")
    const products = JSON.parse(jsonData);

    const productIndex = products.findIndex((product) => product.id === requestId);

    if (productIndex === -1) {
      return res.status(400).json({error:  `Product with ID ${requestId} not found` })
    }

    products.splice(productIndex, 1);

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");

    res.status(200).json({
      message: "Product Deleting successfully",
    });

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({Error: "Error deleting product"})
  }

}