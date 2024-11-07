import mongoose, { Document, mongo, Schema } from "mongoose";

interface IProduct extends Document {
  name: string;
  category:
    | "Clothing"
    | "Jewelries"
    | "Toys"
    | "Wallets"
    | "Handbags"
    | "Office";
  price: number;
  image: string;
  images: string[];
  hasSale: boolean;
  salePrice: number;
}

const productSchema: Schema<IProduct> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: [
        "Clothing",
        "Jewelries",
        "Toys",
        "Wallets",
        "Handbags",
        "Office",
      ],
      message: "Invalid category",
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  images: {
    type: [String],
    default: [],
  },
  hasSale: {
    type: Boolean,
    default: false,
  },
  salePrice: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
