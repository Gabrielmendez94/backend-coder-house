import mongoose from "mongoose";

const collectionCarts = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],
    default: [],
  },
});

cartSchema.pre('findOne', function() {
  this.populate('products.product');
});

const cartModel = mongoose.model(collectionCarts, cartSchema);

export default cartModel;