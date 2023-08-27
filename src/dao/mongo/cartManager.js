import cartModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";

export default class CartManager{
    constructor(){
        this.cartModel = cartModel;
        this.productModel = productModel;
    }

    async createCart(){
        try{
          const newProductCart = await this.cartModel.create({products: []});
          return newProductCart;
        } catch(error){
            throw new Error(`Failed to add cart: ${error.message}`);
        }
    }

    async getCartById(id){
        const cartID = await this.cartModel.findById(id);
        if(!cartID){
            return "Not Found"
        }else {
            return cartID.products;
        }
    }

    async getCarts() {
        try {
          const cartsMgd = await this.cartModel.find();
          return cartsMgd;
        } catch (error) {
          throw new error("Not found");
        }
    }

    async addToCart(cartId, prodId) {
        try {
          const cart = await this.cartModel.findById(cartId);
          if (!cart) {
            throw new Error("Cart not found");
          }
          const existingProductIndex = cart.products.findIndex(prod => prod.product.valueOf() === prodId);
          if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity++;
          } else {
            const newProduct = { product: prodId, quantity: 1 };
            cart.products.push(newProduct);
          }
          await cart.save();
          return true;
        } catch (error) {
          console.log("Error al agregar producto al carrito", error);
          return false;
        }
    }

    async deleteProductsFromCart(cartId, prodId){
      try{
        const cart = await this.cartModel.findById(cartId);
        if(!cart){
          throw new Error('Not found');
        }
        const productIndex = cart.products.findIndex(prod => prod.product === prodId);
        if (productIndex !== -1){
          cart.products.splice(productIndex, 1);
        }
        await cart.save();
        return true;
      } catch(error){
        throw new Error('Not found');
      }
    }

    async actCartId(cartId, updatedProducts) {
      try {
        const cart = await this.cartModel.findById(cartId);
        if (!cart) {
          throw new Error("Carrito no encontrado");
        }
    
        cart.products = updatedProducts;
    
        await cart.save();
        return true;

  } catch (error) {
    throw new Error("no se pudieron encontrar carritos");
  }
}

    async deleteCartId (cartId) {
  try {
    const cart = await this.cartModel.findById(cartId);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    cart.products = [];

    await cart.save();
    return true;
  } catch (error) {
    throw new Error("no se pudieron encontrar carritos");
  }
}


    async actProductsToCart(cartId, prodId, updatedProduct) {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
  
      const product = cart.products.find(prod => prod.product === prodId);
      if (product) {

        product.quantity = updatedProduct.quantity;
  
        await cart.save();
        return true;
      } else {
        throw new Error("Producto no encontrado en el carrito");
      }
    } catch (error) {
      throw new Error("Error al actualizar la cantidad del producto en el carrito");
    }
  }

}