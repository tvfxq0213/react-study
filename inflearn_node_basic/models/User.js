const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true
  },
  password:{
    type:String,
    minlength:5
  },
  lastname: {
    type:String,
    maxlength :50
  },
  role: {
    type:Number,
    default : 0
  },
  image : String,
  token: {
    type: String
  },
  tokenExp: {
    type:Number
  }
})

userSchema.pre('save', function (next){
  const user = this;

  // 비밀번호를 바꿀 때만비밀번호를 암호화 시킨다.
  if(user.isModified('password')){
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) { //postman에 넣는 순수한 비밀번호
          // Store hash in your password DB.
          if(err) return next(err);
          user.password = hash;
          next();
      });
    });
  }else {
    next();
  }


}); // 유저정보를 저장하기 전에 무엇을 한다.


const User = mongoose.model('User', userSchema);
module.exports = { User }