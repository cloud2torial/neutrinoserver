let Cart = require('../models/cart');
module.exports = {
    addtocart:(req,res)=>{
        console.log(req.body)
        Cart.create({
            product_id:req.body.product_id,
            user:req.session.userId
        },(err,added)=>{
            if(err) return res.status(500).json({message:'Internal server error'})
            return res.json({message:'added to cart'})
        })
    },
    getproduct:(req,res)=>{
        Cart.find({user:req.session.userId}).exec((err,data)=>{
            if(err) return res.status(500).json({message:'Internal server error'})
            return res.json({products:data})
        })
    }
}