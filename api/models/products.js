const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const productsSchema = new Schema({
    productname:{
        type:'string'
    },
    product_id:{
        type:'Number'
    },
    price:{
        type:'Number'
    },
    image_url:{
        type:'string'
    }
})
const products = Mongoose.model('Products', productsSchema);

module.exports = products