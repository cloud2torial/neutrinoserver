let Products = require('../models/products');
let errorHandle = require('../services/errorHandler');
module.exports = {
    getproducts:(req,res)=>{
        Products.find().exec((err,data)=>{
            if(err) return res.status(500).json({message:'Internal server error'})
            return res.status(200).json({products:data})
        })
    }
}