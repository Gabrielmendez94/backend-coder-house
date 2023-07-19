import  express  from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import messagesRouter from './routes/messages.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { productsUpdated, chat } from './utils/socketUtils.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

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
app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl: 3600
    }),
    secret: "CoderSecretSHHHHH",
    resave: false,
    saveUninitialized: false
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);
