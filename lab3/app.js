const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const app = express();
const port = 3000;

const url = "mongodb://localhost:27017/";
const dbName = "productsdb";

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Підключення до MongoDB
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);

  const db = client.db(dbName);
  const collection = db.collection('products');

  app.post('/add', (req, res) => {
    const product = req.body;
    collection.insertOne(product, (err, result) => {
      if (err) return console.log(err);
      res.send(result.ops);
    });
  });

  app.get('/products', (req, res) => {
    collection.find().toArray((err, items) => {
      if (err) return console.log(err);
      res.send(items);
    });
  });

  app.delete('/products', (req, res) => {
    collection.deleteMany({}, (err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });

  app.get('/product/:id', (req, res) => {
    const productId = new require('mongodb').ObjectID(req.params.id);
    collection.findOne({ _id: productId }, (err, item) => {
      if (err) return console.log(err);
      res.send(item);
    });
  });

  app.delete('/product/:id', (req, res) => {
    const productId = new require('mongodb').ObjectID(req.params.id);
    collection.deleteOne({ _id: productId }, (err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });

  app.put('/product/:id', (req, res) => {
    const productId = new require('mongodb').ObjectID(req.params.id);
    const newData = req.body;
    collection.updateOne({ _id: productId }, { $set: newData }, (err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
});
