import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
}

const categorySchema: Schema<ICategory> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;