let User = require('../models/user');
let errorHandle = require('../services/errorHandler');
module.exports = {
    Create:(req,res)=>{
        const {username,email,password} = req.body;
        User.create({
            username:username,
            password:password,
            email:email
        },function(err,created){
            if(err) {
                if (err.name === 'ValidationError') return errorHandle(err, res)
                return res.status(500).json({ message: 'Error while creating new user' });
            }
            return res.status(200).json({message:'User created'});
        })
    },
    Login:(req,res)=>{
        const{email,password} = req.body;
        User.findOne({email:email},(err,user)=>{
            
            if(err) res.status(500).json({ message: 'something went wrong' });
            if(!user) return res.status(401).json({message:'Incorrect email or password'});
            user.comparePassword(password,(err,isMatch)=>{
                if(err) throw err;
                if(!isMatch) return res.status(401).json({message:'Incorrect email or password'});
                if(isMatch){
                    console.log(user)
                    req.session.userId = user._id;
                    console.log(req.session.userId)
                    return res.status(201).json({message:'user Successfully loggedin'});
                }
            })
        })
    },
    getUser:(req,res)=>{
        console.log(req.session)
        return res.status(201).json({user:req.session.userId});
    },
    Logout:(req,res)=>{
        delete req.session.userId;
        return res.status(201).json({message:'User Succcessfully logged out'});
    },
    checkemail(req,res){
        console.log(req)
        User.findOne({email:req.params.email}).exec((err,found)=>{
            if(err) res.status(500).json({ message: 'something went wrong' });
            if(found){
                return res.status(200).json({message:true})
            }
            return res.status(200).json({message:false})
        })

    }

}