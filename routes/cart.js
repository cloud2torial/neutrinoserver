const CartController = require('../api/controllers/cartController');

module.exports=(app)=>{

app.post('/cart',CartController.addtocart);
app.get('/cart',CartController.getproduct);

}