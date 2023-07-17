import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collectionProducts = "products" ;

const prodSchema = new mongoose.Schema({

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
    type: Number,
    required: true
   },
})

prodSchema.plugin(mongoosePaginate);


const productModel = mongoose.model(collectionProducts,prodSchema);
 
export default productModel;