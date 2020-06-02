const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const {User} = require('./models/User');
const config = require('./config/key');

//application /x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//applisction/json 
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('MonggoDB Connected...'))
.catch(err => console.log(err));


app.get('/', (req, res) => res.send('Hello World!effdf 새해복 많이받으세요'))


app.post('/register', (req,res) => {
  //회원가입할때 필요한 정보를 client에서 가져오면, 
  //그것들을 데이터 베이스에 넣어주나. 
 
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if(err) return res.json({success : false, err})
    return res.status(200).json({
      success: true
    })
  })
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))