const validUrl = require('valid-url');
const ShortUniqueId = require('short-unique-id');
const dotenv = require('dotenv').config();
const fs = require('fs');
// const {checkisUp} = require('../pingmod');
const UIDLENGTH = process.env.SHORT_ID_LENGTH || 6;

const uid = new ShortUniqueId({
    length:UIDLENGTH
});

const ShortTheUrl= async (req,res) => {

    const long_url = req.body.long_url;

    const isURLValidated = validUrl.isUri(long_url);
    // const url_to_check = make_url(long_url);
    // const isSiteUp = await checkisUp(url_to_check);
    // if(!isSiteUp){
    //     res.status(400).json({
    //         "status":false,
    //         "error":"Please provide valid URL or URL is down!"
    //     });
    //     return;
    // }

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

    const datatoappend = `${shortUniqueIdVar}},{${long_url}\n`;

    fs.appendFileSync('./local_db/urlsmapping.txt',datatoappend,(err)=>{
        console.log("here");
        res.status(500).json({
            "status":false,
            "error":"Fail to save the the DB!",
            "error_server":err
        });
        return;
    });
    res.status(200).json({
        "status":true,
        "response":"Url Shorten!",
        "short_url":`${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${shortUniqueIdVar}`
    });
    return;
};


module.exports = {
    ShortTheUrl
};