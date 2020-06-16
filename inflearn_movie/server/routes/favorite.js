const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");


//=================================
//             Favorite
//=================================

router.post("/api/favorite/favoriteNumber", (req, res) => {


  console.log(req.body.movieId)
  //mongodb에서 favorite 숫자를 가져오기

  Favorite.find({'movieId': req.body.movieId})
  .exec((err, info)=>{
    if(err) return res.status(400).send(err)
    
    res.status(200).json({success:'true', favoriteNumber: info.length})
  })

  //그다음에 프론트에 숫자정보를 보내주기
});


module.exports = router;
