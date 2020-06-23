const mongoose = require('mongoose');
const Schema = mongoose.Schema


const subscribeSchema = mongoose.Schema({

  userTo:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userFrom:{
    type:Schema.Types.ObjectId,
    ref: 'User'
  }
    
}, {timestamp: true})



const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = { Subscribe }