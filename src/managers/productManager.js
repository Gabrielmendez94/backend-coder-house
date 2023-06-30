import productModel from "../dao/models/products.model.js";

export default class ProductManager {
    constructor(){
        this.productModel = productModel;
    }

    addProduct = async (newFields) => {
        try {
            const newProduct = await this.productModel.create(newFields);
            return newProduct;
        } catch(error){
            throw new Error (`Failed to add product: ${error.message} `);
        }
    }

    getProducts = async (limit = null) =>{
        try{
            let query = this.productModel.find();
            if (limit){
                query = query.limit(parseInt(limit));
            }
            const products = await query.exec();
            return products;
        }
        catch(error){
            throw new Error (`Failed to retrieve: ${error.message}`);
        }
    }

    getProductById = async (idNumber) => {

        try {
            const productID = await this.productModel.findById(idNumber);
            if (!productID){
                throw new Error ('Product not found');
            }
            return productID;
        } catch(error){
            throw new Error (`Falied to retrieve product: ${error.message}`);
        }
    }

    updateProduct = async (productId, updatedFields) => {
        try {
          const { code, price, stock, thumbnails, ...otherFields } = updatedFields;
    
          if (code) {
            const existingProduct = await this.productModel.findOne({ code: code });
            if (existingProduct && existingProduct._id.toString() !== productId) {
              throw new Error('The specified code is in use by another existing product');
            }
          }
    
          const updatedProduct = await this.productModel.findByIdAndUpdate(
            productId,
            {
              $set: {
                ...otherFields,
                ...(code && { code }),
                ...(price && { price }),
                stock: stock !== undefined ? stock : 0,
                ...(thumbnails && { thumbnails }),
              },
            },
            { new: true, runValidators: true }
          );
    
          if (!updatedProduct) {
            throw new Error('Product not found');
          }
      
          return updatedProduct;
    
        } catch (error) {
          throw new Error(`Failed to update product: ${error.message}`);
        }
      }

    deleteProduct = async (IDNumber) => {
        try{
            const productID = await this.productModel.findByIdAndDelete(IDNumber);
            if(!productID){
                throw new Error (`Product not found`);
            }
        } catch(error){
            throw new Error (`Failed to delete product : ${error.message}`);
        }
    }
}