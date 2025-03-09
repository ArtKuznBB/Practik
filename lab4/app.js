const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

// Підключення до MongoDB через Mongoose
const url = "mongodb://localhost:27017/productsdb";

mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const productSchema = new mongoose.Schema({
    productName: String,
    quantity: Number
});

const Product = mongoose.model('Product', productSchema);

app.post('/add', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.send(savedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.delete('/products', async (req, res) => {
    try {
        await Product.deleteMany({});
        res.send({ message: 'Всі товари видалені' });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.send(product);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.delete('/product/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({ message: 'Товар видалено' });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.put('/product/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
