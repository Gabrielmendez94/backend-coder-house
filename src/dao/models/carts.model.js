import mongoose from "mongoose";

const collectionCarts = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
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

cartSchema.pre('findOneAndUpdate', function(){
  this.populate('products.product');
});

cartSchema.pre('findByIdAndUpdate', function(){
  this.populate('products.product');
});

cartSchema.pre('save', function(){
  this.populate('products.product');
});

const cartModel = mongoose.model(collectionCarts, cartSchema);

export default cartModel;