const mongoose = require('mongoose')

const UrlSchema = new mongoose.Schema({
    long_url:{
        type:String,
        required:true
    },
    short_url:{
        type:String,
        require:true
    },
    clicks:{
        type:Number,
        default:0
    },
    link_created:{
        type:Date,
    } 
});

// TODO: delete the free tier service deleted into the 6months


const URL = mongoose.model('URL',UrlSchema);

module.exports={
    URL
};