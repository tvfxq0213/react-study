const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {User} = require('./models/User');
const config = require('./config/key');
const {auth} = require('./middleware/auth');

//application /x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//applisction/json 
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('MonggoDB Connected...'))
.catch(err => console.log(err));


app.get('/', (req, res) => res.send('Hello World!effdf 새해복 많이받으세요'))


app.post('/api/users/register', (req,res) => {
  //회원가입할때 필요한 정보를 client에서 가져오면, 
  //그것들을 데이터 베이스에 넣어주나. 
 
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if(err) return res.json({success : false, err})
    return res.status(200).json({
      success: true,
      userInfo: userInfo
    })
  })
});

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.

  User.findOne({email : req.body.email }, (err, user) => {

    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다. "
      })
    }else{

     
      // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch){
          return res.json({loginSuccess:false, message: "비밀번호가 틀렸습니다. "});
        }else{
          user.generateToken((err, user) => {
            if(err) return res.status(400).send(err);
            // 토큰을 저장한다. 어디에? 쿠키 / 로컬스토리지
            res.cookie("x_auth", user.token)
            .status(200)
            .json({loginSuccess:true, userId: user._id})

          });
        }
      })
      
    }
  })
  // 비밀번호까지 같다면 token생성하기
});

app.get('/api/users/auth', auth , (req, res) => {
  //auth 라는 middleware 를 추가함
  console.log("Cookies: ", req.cookies)

  // 여기까지 미들웨어를 통과해 왔다는 얘기는 auth 이 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin:req.user.role === 0 ? false : true, // 0이 아니면 관리자
    isAuth: true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
  //req.user;
  //req.token;
})

app.get('/api/users/logout', auth, (req, res) => {

  console.log('logout');

  User.findOneAndUpdate({_id : req.user._id}, 
    {token : ""}, 
    (err, user) => {
    if(err) return res.json({success:false, err})
    return res.status(200).send({
      success:true
    })
  })

});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))