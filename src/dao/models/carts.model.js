import mongoose from "mongoose";
const {Schema} = mongoose;

const cartsCollection = 'carts';

const cartsSchema = new Schema({
    cartNumber : {
        products : {
         type: String,
         required: true,
         unique: true,
     
         quantity : {
             type : Number,
             required: true,
             min: 1
            },
        }
     }
})

const cartModel = mongoose.model(cartsCollection,cartsSchema);

export default cartModel;