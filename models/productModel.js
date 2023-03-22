import mongoose from "mongoose";
import slugify from "slugify";
const ISRAELI_PHONE_REGEX =
  /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field!"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Category is a required field!"],
    },
    isActive: Boolean,
    details: {
      description: {
        type: String,
        required: [true, "description is a required field!"],
        minlength: [10, "Minimum description length is 10 chars!"],
      },
      price: {
        type: Number,
        required: true,
        min: [0.1, "Price must be positive!"],
      },
      discount: {
        type: Number,
        default: 0,
      },
      imagesArray: {
        type: [String],
        minlength: [2, "Must contain at least two images!"],
      },
      phoneNumber: {
        type: String,
        required: true,
        match:ISRAELI_PHONE_REGEX
      },
      dateAdded: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
      // Hide the _id and the __v field from the frontend
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      // Hide the _id and the __v field from the frontend
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Middleware - Create slug from name
ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model("Product", ProductSchema);
