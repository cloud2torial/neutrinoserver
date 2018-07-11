const ProductsController = require('../api/controllers/ProductsController');

module.exports=(app)=>{

app.get('/products',ProductsController.getproducts);

}