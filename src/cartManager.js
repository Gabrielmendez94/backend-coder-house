import fs from 'fs';

export default class CartManager{
    constructor(path){
        this.cart = [];
        this.id = 0;
        this.path = path;
    }

    loadCart(){
        if(fs.existsSync(this.path)){
            const db = fs.promises.readFile(this.path, 'utf8');
            this.cart = JSON.parse(db);
        } else {
            this.cart = [];
        }
        this.id = this.cart[this.cart.length-1] ? (this.cart[this.cart.length-1].id+1) : 1;
    }

    updateCart(){
        fs.promises.writeFile(this.path, JSON.stringify(this.cart));
        return;
    }

    addCart(){
        this.loadCart();

        const newCart = {
            id: this.id++,
            products: []
        }

        this.cart.push(newCart);
        this.updateCart();
    }

    getCartByID(id){
        this.loadCart()
        const cartID = this.cart.find(cart => cart.id === id);
        if(!cartID){
            return "Not Found"
        }else {
            return cartID.products;
        }
    }

    addProductCart(cartID, prodID){
        this.loadCart();
        let foundProd = false;
        let quantity = 1
        const cartProducts = this.getCartByID(cartID);

        cartProducts.map(prod => {
            if(prod.product === prodID){
                foundProd = true;
                return {
                    ...prod,
                    quantity: ++prod.quantity
                }
            }
        })
        if(!foundProd){
            const prod = {
                product: prodID,
                quantity: quantity
            }
            cartProducts.push(prod);
        }
        this.updateCart();
    }
}

export const cartManager = new CartManager();