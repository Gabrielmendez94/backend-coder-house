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
import mailingRouter from './routes/mailing.router.js';
import twilioRouter from './routes/twilio.router.js';
import mockingRouter from './routes/mocking.routes.js';
import logsRouter from './routes/logs.router.js';
import config from './config/config.js';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { productsUpdated, chat } from './utils/socketUtils.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import { addLogger, loggerInfo } from './utils/loggers/logger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';

const app = express();
const PORT = config.port, MONGO_PASS = config.dbPswd, MONGO_USER = config.dbUser, MONGO_HOST =config.dbHost;

app.use(addLogger);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const httpServer = app.listen(PORT,()=> {
    const info = loggerInfo();
    info.info(`The server is working correctly on the port ${PORT}`);
});

//MONGO CONNECTION
const MONGO = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/ecommerce`;
const connection = mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//CONFIGURACIÓN SWAGGER
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info:{
            title: 'Documentacion API Ecommerce',
            description: 'Documentacion para uso de Swagger!'
        }
    },
    apis: [`C:/Users/usuario/Desktop/backend-coder-house/src/docs/*.yaml`]
};
// CREACION DEL SPECS
const specs = swaggerJSDoc(swaggerOptions);
// DECLARACION SWAGGER API - ENDPOINT
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

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
    store: MongoStore.create({
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


//ROUTERS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mailing', mailingRouter);
app.use('/api/twilio', twilioRouter);
app.use('/api/mocking', mockingRouter);
app.use('/api/logs', logsRouter);
app.use('/', viewsRouter);
