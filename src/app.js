import  express  from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import messagesRouter from './routes/messages.router.js'
import viewsRouter from './routes/views.router.js'
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { productsUpdated, chat } from './utils/socketUtils.js';

const app = express();
const httpServer = app.listen(8080,()=> console.log('Servidor escuchando en el puerto 8080'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const MONGO = "mongodb+srv://mendezgabriel1994:yG4UDmf73boeVmki@cluster0.x3zdcqe.mongodb.net/ecommerce";
const connection = mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

export const io = new Server(httpServer);
app.set('io', io);
io.on('connection', socket => {
    console.log('New client connected', socket.id);
    productsUpdated(io);
    chat(socket, io);
});

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/messages', messagesRouter);
app.use('/', viewsRouter);
