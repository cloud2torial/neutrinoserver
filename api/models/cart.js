const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const cartSchema = new Schema({
    product_id:{
        type:'string'
    },
    user:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
})
const cart = Mongoose.model('Cart', cartSchema);

module.exports = cart