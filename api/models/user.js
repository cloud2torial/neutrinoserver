const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = Mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const validateUsername = function(username) {
    let re = /^[a-z0-9_-]{3,14}$/;
    return re.test(username)
};
const validateEmail = function(email){
    let re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    return re.test(email)
}
const validatePassword = function(password){
    let re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/
    return re.test(password)
}
const userSchema = new Schema({
    username:{
      type:'string',
      min:[3,'username minimum 3 characters is required'],
      max:[14,'username maximum 14 characters is allowed'],
      required: [true,'username is required'],
      validate:[validateUsername, 'Allowed characters are -,_,0-9,A-Z'],
    },
    password:{
      type:'string',
      required: [true,'password is required'],
      min:[6,'password minimum 6 characters is required'],
      max:[20,'password maximum 20 characters is allowed'],
      validate:[validatePassword,'Password must contain atleast one special character,uppercase,lowercase and digit']
    },
    email:{
      type:'string',
      unique: true,
      required: [true,'email is required'],
      validate:[validateEmail,'Email is invalid']
    },
    createdAt:{
      type: Date,
      default: Date.now
    }
})
userSchema.pre('save', function(next)
{
   let user = this;
   bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt)
   {
       if(err) return next(err);

       bcrypt.hash(user.password, salt, function(err, hash)
       {
           if(err) return next(err);
           user.password = hash;
           next();
       })
   })
});
userSchema.methods.comparePassword = function(Password, cb){
  bcrypt.compare(Password, this.password, function(err, isMatch){
      if(err) return next(err);
      cb(null, isMatch);
  })
}

const user = Mongoose.model('Users', userSchema);

module.exports = user