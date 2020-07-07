const mongoose = require('mongoose');
const Schema = mongoose.Schema


const projectSchema = mongoose.Schema({

    writer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    projectName:{
        type: String,
        maxlength:50
    },
    projectSubtitle: {
      type: String
    },
    projectStartDate:{
      type: String
    },
    projectEndDate:{
      type: String
    },
    category:{
      type: String
    },
    skills:{
      type: String
    },
    tags:{
      type: String
    },
    description:{
        type: String,
    },
    privacy:{
        type:Number
    },
    views:{
        type:Number,
        default:0
    },
    duration:{
        type: String
    },
    thumbnail: {
        type:String
    }
    
}, {timestamp: true})



const Project = mongoose.model('Project', projectSchema);

module.exports = { Project }