import TicketManager from "./mongo/ticketsManager.js";
import CartManager from "./mongo/cartManager.js";
import ProductManager from './mongo/productManager.js';
import MessagesManager from "./mongo/messagesManager.js";
import UserManager from "./mongo/usersManager.js";
import config from "../config/config.js";

const PERSISTENCE = config.factory.persistence;

export class TicketsDaoFactory{
    static getDao(){
        switch(PERSISTENCE){
            case 'MONGO':
                return new TicketManager();
            case 'FILE':
                throw new Error('File persistence not implemented yet');
            default:
                return new TicketManager();
        }
    }
}

export class CartsDaoFactory{
    static getDao(){
        switch(PERSISTENCE){
            case 'MONGO':
                return new CartManager();
            case 'FILE':
                throw new Error('File persistence not implemented yet');
            default:
                return new CartManager();
        }
    }
}

export class ProductsDaoFactory{
    static getDao(){
        switch(PERSISTENCE){
            case 'MONGO':
                return new ProductManager();
            case 'FILE':
                throw new Error('File persistence not implemented yet');
            default:
                return new ProductManager();
        }
    }
}

export class MessagesDaoFactory{
    static getDao(){
        switch(PERSISTENCE){
            case 'MONGO':
                return new MessagesManager();
            case 'FILE':
                throw new Error('File persistence not implemented yet');
            default:
                return new MessagesManager();
        }
    }
}

export class UsersDaoFactory{
    static getDao(){
        switch(PERSISTENCE){
            case 'MONGO':
                return new UserManager();
            case 'FILE':
                throw new Error('File persistence not implemented yet');
            default:
                return new UserManager();
        }
    }
}