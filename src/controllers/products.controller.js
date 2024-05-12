const Product = require("../models/product.model.js");
const { isValidObjectId } = require("mongoose");
const { matchedData, validationResult } = require("express-validator");
const { description } = require("../utils/validationSchemas.js");

// get all products
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    //query database for products with pagination.
    const products = await Product.find().skip(skip).limit(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// get a product by its ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "product not found." });
    } else {
      return res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// create a new product
const createProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const validatedData = matchedData(req);
  let images = "";
  req.files.forEach((file) => {
    images = images + file.path + ",";
  });
  images = images.substring(0, images.lastIndexOf(","));
  const newProduct = new Product({
    name: validatedData.name,
    description: validatedData.description,
    price: validatedData.price,
    brand: validatedData.brand,
    category: validatedData.category,
    image: images,
  });

  newProduct
    .save()
    .then(() => {
      return res.status(200).json({ msg: "product saved successfully" });
    })
    .catch((error) => {
      return res.status(500).json({ msg: error });
    });
};

// fully update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ msg: "invalid product ID" });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  let images = "";
  req.files.forEach((file) => {
    images = images + file.path + ",";
  });
  images = images.substring(0, images.lastIndexOf(","));
  const validatedData = { ...matchedData(req), images: images };

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      ...validatedData,
    });
    return res.status(200).json({ msg: "Product updated successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// partially update a product
const partiallyUpdateProduct = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }
  const { body } = req;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { ...body }
    );
    console.log(updatedProduct);
    return res.status(200).json({ msg: "product edited successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json("Invalid product ID");
  }
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json("Product not found.");
    }
    return res.status(200).json("Product deleted successfully.");
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  partiallyUpdateProduct,
  deleteProduct
};
