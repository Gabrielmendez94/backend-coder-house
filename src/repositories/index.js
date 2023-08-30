import {TicketsDaoFactory, CartsDaoFactory, ProductsDaoFactory, MessagesDaoFactory} from '../dao/factory.js';
import TicketsRepository from './ticket.repository.js';
import CartsRepository from './cart.repository.js';
import ProductsRepository from './products.repository.js';
import MessagesRepository from './messages.repository.js';

const ticketsManager = TicketsDaoFactory.getDao();
const cartsManager = CartsDaoFactory.getDao();
const productsManager = ProductsDaoFactory.getDao();
const messagesManager = MessagesDaoFactory.getDao();

export const ticketsRepository = new TicketsRepository(ticketsManager);
export const cartsRepository = new CartsRepository(cartsManager);
export const productsRepository = new ProductsRepository(productsManager);
export const messagesRepository = new MessagesRepository(messagesManager);