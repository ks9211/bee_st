import express from 'express';
import { PORT,MongoDBURL } from './config.js';
import mongoose from 'mongoose';
import Product from './productmodel.js';
import Review from './reviewmodel.js';

const app=express();





app.get('/', (request, response) => {
    return response.status(234).send('Welcome');
  });

  
app.post('/products', async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
 

  app.get('/products/:productid', async (req, res) => {
    try {
      const product = await Product.findById(req.params.productid);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: 'Product not found' });
    }
  });


  app.put('/products/:productid', async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.productid, req.body, { new: true });
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: 'Product not found' });
    }
  });
  
 
  app.delete('/products/:productid', async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(404).json({ error: 'Product not found' });
    }
  });
  


mongoose.connect(MongoDBURL
    )
      .then(() => {
        console.log('App connected to database');
      })
      .catch((error) => {
        console.log(error);
      });

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})





