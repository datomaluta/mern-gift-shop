import Category from "../models/categoryModel";
import { catchAsync } from "../utils/catchAsync";

export const createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      category: newCategory,
    },
  });
});
