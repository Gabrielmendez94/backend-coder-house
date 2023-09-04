import mongoose, { mongo } from "mongoose";
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

   code:{
      type: String,
      required: true,
      unique: true,
      validate: {
         validator: async function(value){
            const count = await mongoose.models[collectionProducts].countDocuments({code: value});
            return count === 0;
         },
         message: 'The specified code is in use by another existing product',
      }      
   },
   price : {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
   },
   status:{
      type: Boolean,
      default: true,
   },
   stock : {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative']
     },
   category: {
      type: String,
      required: true
   },
   thumbnail : {
    type: [String],
    default: []
   },
})

prodSchema.plugin(mongoosePaginate);


const productModel = mongoose.model(collectionProducts,prodSchema);
 
export default productModel;