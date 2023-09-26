require('dotenv').config();

const validUrl = require('valid-url');
const ShortUniqueId = require('short-unique-id');
const { URL } = require('../models/Urls')


const UIDLENGTH = process.env.SHORT_ID_LENGTH || 6;

const uid = new ShortUniqueId({
    length:UIDLENGTH
});

const ShortTheUrl= async (req,res) => {

    const long_url = req.body.long_url;

    const isURLValidated = validUrl.isUri(long_url);

    if(!isURLValidated){
        res.status(400).json({
            "status":false,
            "error":"Please provide valid URL!"
        });
        return;
    }

    const shortUniqueIdVar = uid();
    if(!shortUniqueIdVar){
        res.status(500).json({
            "status":false,
            "error":"Internal server error!"
        });
        return;
    };

    //make the database entry
    const new_urlentry = new URL({
        long_url:long_url,
        short_url:shortUniqueIdVar,
        clicks:0,
        link_created:new Date().toISOString()
    });

    try{
        new_urlentry.save();
    }catch(err){
        console.log(err);
        res.status(500).json({
            "status":false,
            "error":"Database Error!"
        });
        return;
    }

    res.status(200).json({
        "status":true,
        "response":"Url Shorten!",
        "short_url":`http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${shortUniqueIdVar}`
    });
    return;
};


module.exports = {
    ShortTheUrl
};