//Made this 2 seperate app.js to fix the excessive amount of comments so that I may have a clean 
//vs commented version
const express = require('express');

const bodyParser = require('body-parser');
//path import file
const path = require('path');
const app = express();

const adminRoutes = require('../routes/admin');
const shopRoutes = require('../routes/shop');
const { dirname } = require('path');

app.use(bodyParser.urlencoded({extended: false}));

//Makes the path readonly and accessible 
//WARNING WHEN DOING HTML FILE
//It makes any folder you try to access the starting directory so instead of public/css/main.css its
//css/main.css
//This isn't good for just CSS its good for literally any other static file you want to access
app.use(express.static(path.join(__dirname,'public')))
//Only use's order matters imports order does not matter
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//by making a completely blank route you can make a 404 error if a user looks for an incorrect route
// app.use((req, res, next) => {

//     //You can chain functions like status and header with functions like .send();
//     res.status(404).send('<h1>Error 404 Page Not found </h1>');
// });

app.use((req, res, next) => {
  
    
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
app.listen(3000);
