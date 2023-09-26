const { URL } = require('../models/Urls')
const client = require('../Radis_Client');


const RedirectUserLong = async (req,res) =>{
    const id = req.params.shortUrl;
    if(!id){
        res.status(400).json({
            "status":false,
            "error":"Please provide valid URL!"
        });
        return;
    }

    try{
      const urlexist = await client.hget('urls:cache',id,(err,object)=>{
        if(err)console.log(err);
      });
      if(urlexist){
        console.log("HIT!");
        // res.status(200).json(JSON.parse(urlexist));
        let urldata = JSON.parse(urlexist);
        res.redirect(urldata[0].long_url);
        return;
      }else{
        console.log("MISS");
      }
    }catch(err){
      console.log(err);
    }

    var url_info;
    try{
      url_info = await URL.find({
        short_url:id
      });
    }catch(err){
      console.log(err);
      res.status(500).json({
        "status":false,
        "error":"Database Error!"
      });
      return;
    }

    if(!url_info){
        res.status(404).json({
            "status":false,
            "error":"Url not found!"
        });
        return;
    }

    //catch the URL
    try{
      await client.hmset(
        'urls:cache',
        id,
        JSON.stringify(url_info),
        (err,reply)=>{
          if(err)console.log(err);
          else{ 
            console.log(reply);
            client.expire('urls:cache', 3600); // Cache expires in 1 hour
          }
        }
      )
    }catch(err){
      console.log(err);
    }

    // console.log(url_info[0].long_url);
    // res.status(200).json(url_info[0].long_url);
    res.redirect(url_info[0].long_url);
    return;
};

module.exports = {
    RedirectUserLong
};


