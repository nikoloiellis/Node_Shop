const fs = require('fs');
const path = require('path');

//path that leads to data 
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

//reads the file directory data check if anything exists 
//if it doesn't create an empty if it does read said JSONfile 
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

//Exports a model of a product
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  //class responsible for saving a product 
  save() {
    //Temporary unique ID generator 
    this.id = Math.random(); 
    
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  //Static calls it on the class itself rather than an instatiated object reducing duplicates
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
