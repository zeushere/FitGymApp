import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import cors from 'cors'

dotenv.config();


const app = express();
app.use(cors());

app.get('/',((req, res) => {
    res.send('Hello to Memories API');
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/fitgymapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

mongoose.connection.on('connected',() => {
    console.log('Mongoose is connected!!!!!');
});

app.use('/api/uploads/', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

if(process.env.NODE.ENV === 'production') {
    app.use(express.static('client/build'));
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at localhost:${port}`);
});
