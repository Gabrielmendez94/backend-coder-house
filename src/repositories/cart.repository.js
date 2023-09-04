export default class CartsRepository {   
    constructor(dao) {
        this.dao = dao;
    }

    createCart = async () => {
        const newCart = await this.dao.createCart();
        return newCart;
    }

/*    getCarts = async () =>{
        const getCarts = await this.dao.getCarts();
        return getCarts;
    }

    addToCart = async(cartId, prodId)=>{
        const addCart = await this.dao.addToCart(cartId, prodId);
        return addCart;
    }*/

    getCartById = async (cartId) => {
        const cart = await this.dao.getCartById(cartId);
        return cart;
    }
    
    updateCartProducts = async (cartId, newCartProducts) => {
        const cart = await this.dao.updateCartProducts(cartId, newCartProducts);
        return cart;
    }
}