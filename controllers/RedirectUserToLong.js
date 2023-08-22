const fs = require('fs');
const readline = require('readline');

const database_location = './local_db/urlsmapping.txt';

async function findLinkForId(filePath, targetId) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
  
    for await (const line of rl) {
      const [id, link] = line.split('},{');
      if (id === targetId) {
        return link.trim();
      }
    }
  
    return null; // ID not found
  }
  

const RedirectUserLong = async (req,res) =>{
    const id = req.params.shortUrl;
    if(!id){
        res.status(400).json({
            "status":false,
            "error":"Please provide valid URL!"
        });
        return;
    }

    const url = await findLinkForId(database_location,id);
    if(!url){
        res.status(404).json({
            "status":false,
            "error":"Url not found!"
        });
        return;
    }

    //redire the user to the long url
    res.redirect(url);
    return;
};

module.exports = {
    RedirectUserLong
};


