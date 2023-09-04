import productModel from "../models/products.model.js";

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

    getProducts = async (limit = 10, page = 1, sort, category, available) =>{
        try{
            let query = this.productModel.find();
            if (category){
              const trimmedCategory = category.trim();
              const categoryRegex = new RegExp(`^${trimmedCategory}$`, 'i');
                query = query.where('category'.equals(categoryRegex));
            }
            if (available){
              const lowerAvailable = available.toLowerCase();
              if (lowerAvailable === 'true') {
                query = query.where('stock').gt(0);
              } else {
                query = query.where('stock').equals(0);
              }
            }
            if (sort) {
              const lowerSort = sort.toLowerCase();
              if (lowerSort === 'asc') {
                query = query.sort({ price: 1 });
              } else {
                query = query.sort({ price: -1 });
              }
            }

            const products = await this.productsModel.paginate(query, {
              limit: parseInt(limit) || 10,
              lean: true,
              page: parseInt(page) || 1,
              customLabels: {
                docs: 'products',
                totalDocs: 'totalProducts',
              }
            });
            return products;
          } catch(error){
            throw new Error (`Failed to retrieve: ${error.message}`);
        }
    }

    getProductById = async (idNumber) => {

        try {
            const productID = await this.productModel.findById(idNumber);
            return productID;
        } catch(error){
            throw new Error (`Falied to retrieve product: ${error.message}`);
        }
    }

    getProductByCode = async (productCode) => {
      try {
        const product = await this.productModel.findOne({ code: productCode });
        return product;
      } catch (error) {
        throw new Error(`Failed to retrieve product: ${error.message}`);
      }
    }

    updateProduct = async (productId, updatedFields) => {
        try {
          const { code, price, stock, thumbnail, ...otherFields } = updatedFields;
          const updatedProduct = await this.productModel.findByIdAndUpdate(
            productId,
            {
              $set: {
                ...otherFields,
                ...(code && { code }),
                ...(price && { price }),
                stock: stock !== undefined ? stock : 0,
                ...(thumbnail && { thumbnail }),
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