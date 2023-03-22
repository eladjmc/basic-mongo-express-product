import Product from "../models/productModel.js";

export const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getProductsByParams = async (req, res, next) => {
  try {
    if (req.query.min && req.query.max) {
      const min = parseInt(req.query.min);
      const max = parseInt(req.query.max);
      if (min > max) {
        throw new Error("Minimum Price Cannot Be Lower Than Maximum Price");
      }
      const productsInRange = await Product.find({
        "details.price": { $gte: min, $lte: max },
      });
      res.status(200).json({
        success: true,
        data: productsInRange,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getProducts = async (req, res, next) => {
  try {
    if (req.query.min) {
      getProductsByParams(req, res, next);
      return;
    }
    const product = await Product.find();
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteAllProducts = async (req, res, next) => {
  try {
    const product = await Product.deleteMany({});
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("No such product in database");
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    console.log(typeof req.body.isActive !== 'boolean', typeof req.body.details.discount !== 'number' );
    const id = req.params.id;
    if (
        typeof req.body.isActive !== 'boolean' &&
        typeof req.body.details.discount !== 'number'
    ) {
      throw new Error(
        "Active and Discount where not provided, cannot edit other fields"
      );
    }

    const { isActive, details } = { ...req.body };
    const { discount } = { ...details };

    const updatedFields = {};

    if (typeof isActive === 'boolean') {
      updatedFields.isActive = isActive;
    }
    if (typeof discount === 'number') {
        updatedFields['details.discount'] = discount;
    }

    const product = await Product.updateOne(
      { _id: id },
      { $set: updatedFields }
    );

    if (!product) {
      throw new Error("No such product in database");
    }

    res.status(200).json({
      success: true,
      data: "Item Was updated successfully!",
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndRemove(id);
    if (!product) {
      throw new Error("No such product in database");
    }
    res.status(200).json({
      success: true,
      data: `Product with id of ${id} was removed`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
export const getActiveProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: false });
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
