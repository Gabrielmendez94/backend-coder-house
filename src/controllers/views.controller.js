import ProductManager from '../dao/mongo/productManager.js';
import productModel from '../dao/models/products.model.js';
import CartManager from '../dao/mongo/cartManager.js';

const newProducts = new ProductManager();
const cartManager = new CartManager();

export const viewProducts = async (req, res)=>{
    const limit = req.query.limit;
    const page = req.query.page;
    const products = await productModel.paginate(
        {},
        {
            limit: limit || 5,
            lean: true,
            page: page ?? 1
        }
    )
    res.render('products', {products});
}

export const viewCartsById = async (req, res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartByID(cartId);
        res.render('carts', {
            title: 'Pastelería Susi',
            cart: cart            
        })
          } catch (error) {
            throw new Error (error)
          }
}

export const viewProductsInRealTime = (req, res)=>{
    res.render('realTimeProducts',{
        style: 'style.css'
    })
}

export const chatWeb = (req,res)=>{
    res.render('chat', { style: 'chat.css', title: 'Tienda de ropa'});
}

const publicAccess = (req,res,next) => {
    if(req.session.user) return res.redirect("/products");
    next(); 
  }
  
  const privateAccess = (req,res,next) => {
    if(!req.session.user) return res.redirect("/login")
    next()
  }

export const register = (publicAccess, (req, res) => {
    res.render('register');
})

export const login = (publicAccess, (req, res) => {
    res.render('login');
})

export const redirectioning = (privateAccess, (req, res)=>{
    res.render('user', {
        user: req.session.user
    });
})

export const resetPswd = (req, res)=>{
    res.render('resetPassword')
}