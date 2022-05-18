import {Schema} from "mongoose";

export const ProductSchema = new Schema({
  code: {
    type: String,
    minlength: 6,
    maxlength: 6,
    required: [true, 'CODE_IS_BLANK'],
  },
  name: {
    type: String,
    maxlength: 64,
    required: [true, 'NAME_IS_BLANK'],
  },
  description: {
    type: String,
    maxlength: 255,
  },
  image: {
    type: String,
    required: [true, 'IMAGE_IS_BLANK'],
  },
  price: {
    type: Number,
  }
}, {
  versionKey: false,
  timestamps: true,
})