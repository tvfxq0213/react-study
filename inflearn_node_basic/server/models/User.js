const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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

userSchema.methods.comparePassword = function(plainPassword, cb){
  //plainPassword 와 암호화된 비밀번호와 비교해야함
  bcrypt.compare(plainPassword, this.password, function (err, isMatch){
    if(err) return cb(err);
      cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb){

  var user =this;
  var token = jwt.sign(user._id.toHexString(),'secretToken')
  user.token = token ;
  user.save(function(err,user){
    if(err) return cb(err)
    cb(null,user)
  })

  // jsonwebtoken 을 웹 토큰 생성
}

userSchema.statics.findByToken = function(token , cb) {
  var user = this;

 // user._id + 'secretToken' = token;
  //  토큰을 디코드 한다.

  jwt.verify(token, 'secretToken', function (err, decoded) {
    //user id를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이 일치하는지 확인
    user.findOne({
      "_id" : decoded,
      "token": token
    }, function (err, user) {
      if(err) return cb(err);
      cb(null,user)
    })
  })

}



const User = mongoose.model('User', userSchema);
module.exports = { User }