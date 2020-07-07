const express = require('express');
const router = express.Router();
const { Project } = require("../models/Project");

const { auth } = require("../middleware/auth");

//=================================
//            Project
//=================================

router.get('/getProject', (req,res)=>{

  //비디오를 DB에서 가져와서 클라이언트에 보낸다. 

  Project.find()
  .populate('writer')
  .exec((err, videos )=>{
    if(err) return res.status(400).send(err)
    res.status(200).json({success: true, videos})
  })

});

router.post('/getVideoDetail', (req,res)=>{

  //비디오를 DB에서 가져와서 클라이언트에 보낸다.  
  Project.findOne({ "_id" : req.body.videoId })
  .populate('writer')
  .exec((err, video) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({ success: true, video })
  })

});

module.exports = router;
