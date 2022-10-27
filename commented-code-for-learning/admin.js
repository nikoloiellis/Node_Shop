const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

//Array to store all of the "products" you input
const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  //.render is directly tied to the template engine
  //Passing data within an engine doesn't differ from engine to engine 
  //You pass each data with key-value pairs like react/angular and send the data from this to the html
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

//exports this file
exports.routes = router;
exports.products = products;
