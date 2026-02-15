const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Product = require('./models/Product.model');

const app = express();
const port = 8080;
const dbURI = 'mongodb://localhost:27017/productstoredb';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('ProductStore backend is running');
});

app.get('/product', async (req, res) => {
  try {
    const products = await Product.find({});
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/product', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/product/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          brand: req.body.brand,
          category: req.body.category,
          price: req.body.price,
          stock: req.body.stock
        }
      },
      { new: true, upsert: false }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/product/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(deletedProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
