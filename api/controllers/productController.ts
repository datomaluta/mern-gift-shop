import Product from "../models/productModel";
import APIFeatures from "../utils/apiFeatures";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

export const createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    staus: "success",
    data: {
      product: product,
    },
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product: product,
    },
  });
});

export const getProducts = catchAsync(async (req, res, next) => {
  const totalDocumentsInstance = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  const totalDocuments = await totalDocumentsInstance.query;

  const features = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  const page = parseInt(req?.query?.page as string, 10) || 1;
  const limit = parseInt(req?.query?.limit as string, 10) || 1000;

  res.status(200).json({
    status: "success",
    results: products.length,
    totalDocuments: totalDocuments.length,
    totalPages: Math.ceil((totalDocuments.length || 0) / limit),
    hasNextPage: page < Math.ceil((totalDocuments.length || 0) / limit),
    data: {
      products,
    },
  });
});
