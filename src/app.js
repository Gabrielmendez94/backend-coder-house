import  express  from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io';

const app = express();
const httpServer = app.listen(8080,()=> console.log('Servidor escuchando en el puerto 8080'));
app.use(express.json());

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

io.on('connection', socket =>{
    socket.on('message', data=>{
        console.log(data)
    })
    socket.emit('anotherMessage', 'Cliente conectado')
    socket.broadcast.emit('anotherMessageButNotForEveryone', 'Ahora te estoy contactando desde el servidor, a todos menos al remitente')
})
