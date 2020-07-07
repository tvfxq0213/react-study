const mongoose = require('mongoose');
const Schema = mongoose.Schema


const tagSchema = mongoose.Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
  },
  videoId: {
      type: Schema.Types.ObjectId,
      ref: 'Video'
  }
    
}, {timestamp: true})



const Tag = mongoose.model('Tag', likeSchema);

module.exports = { Tag }