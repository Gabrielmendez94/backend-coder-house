import mongoose from "mongoose";

const collectionProducts = "products" 

const prodSchema = new mongoose.Schema({

   title: String,
   description: String,
   price: Number,
   thumbnail: String,
   code: Number,
   stock: Number

/*
   title : {
    type: String,
    required: true
   },

   description : {
    type: String,
    required: true
   },

   price : {
    type: Number,
    required: true,
    min: [0, 'el precio no puede ser negativo']
   },

   thumbnail : {
    type: String,
    required: true
   },

   code : {
    type: Number,
    required: true,
    unique: true
   },

   stock : {
    type: String,
    required: true
   },
*/

})

const productModel = mongoose.model(collectionProducts,prodSchema);
 
export default productModel;