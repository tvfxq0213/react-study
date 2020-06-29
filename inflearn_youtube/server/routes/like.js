const express = require('express');
const router = express.Router();

const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');


//===============================
//  Dislike, Like
//================================


router.post('/getLikes', (req, res) =>{

  let variable = {}
  if(req.body.videoId){
    variable = { videoId : req.body.videoId }
  }else {
    variable = { commentId : req.body.commentId }
  
  }
  Like.find(variable)
  .exec((err,likes) =>{
    if(err) return res.status(400).send(err)
    return res.status(200).json({success:true, likes})
  })
});


router.post('/getDislikes', (req,res) => {
  let variable = {}
  if(req.body.videoId){
    variable = { videoId : req.body.videoId }
  }else {
    variable = { commentId: req.body.commentId }
  }

  Dislike.find(variable)
  .exec((err, dislikes) => {
    if(err) return res.status(400).send(err)
    return res.status(200).json({success: true, dislikes})
  })
})


router.post('/upLike', (req, res) =>{

  let variable = {}
  if(req.body.videoId){
    variable = { videoId : req.body.videoId, userId: req.body.userId }
  }else {
    variable = { commentId : req.body.commentId, userId:req.body.userId }
  
  }
   // like collection에 클릭정보를 넣어준다

   const like = new Like(variable)
   
   like.save((err, likeResult) =>{
     if(err) return res.json({success:false, err})

     Dislike.findOneAndDelete(variable)
     .exec((err, dislikeResult) => {
      if(err) return res.json({success:false, err})
      res.status(200).json({success:true})
    
    })

   // 만약에 라이크가 클릭되지 않고 디스라잌이 먼저 클릭되어 있다면 디스라잌을 사라지게 하고 라이크를 실행시킴
  })

});

router.post('/unlike', (req, res) =>{

  let variable = {}
  if(req.body.videoId){
    variable = { videoId : req.body.videoId, userId: req.body.userId }
  }else {
    variable = { commentId : req.body.commentId , userId: req.body.userId}
  
  }
  Like.findOneAndDelete(variable)
  .exec((err, result)=>{
    if(err) return res.status(400).json ({success: false, err})
    res.status(200).json({success: true})
  })
});


router.post('/unDislike', (req, res) =>{

  
  let variable = {}
  if(req.body.videoId){
    variable = { videoId : req.body.videoId, userId: req.body.userId }
  }else {
    variable = { commentId : req.body.commentId, userId: req.body.userId }
  
  }
  Dislike.findOneAndDelete(variable)
  .exec((err, result)=>{
    if(err) return res.status(400).json ({success: false, err})
    res.status(200).json({success: true})
  })
});

router.post('/upDislike', (req, res) =>{

  let variable = {}
  if(req.body.videoId){
    variable = { videoId : req.body.videoId, userId: req.body.userId }
  }else {
    variable = { commentId : req.body.commentId , userId: req.body.userId}
  
  }
   // like collection에 클릭정보를 넣어준다

   const dislike = new Disike(variable)
   
   dislikw.save((err, dislikeResult) =>{
     if(err) return res.json({success:false, err})

     Like.findOneAndDelete(variable)
     .exec((err, likeResult) => {
      if(err) return res.json({success:false, err})
      res.status(200).json({success:true})
    
    })

   // 만약에 라이크가 클릭되지 않고 디스라잌이 먼저 클릭되어 있다면 디스라잌을 사라지게 하고 라이크를 실행시킴
  })

});
module.exports = router;