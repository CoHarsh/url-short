const express = require('express');
const router = express.Router();

// ROUTER IMPORT
const {ShortTheUrl} = require('./controllers/ShortTheUrl');
const {RedirectUserLong} = require('./controllers/RedirectUserToLong');
// WELCOME: routes
router.get('/',(req,res)=>{
    res.status(200).json({
        "message":"Welcome the the server!"
    });
});

router.post('/api/urlshort',ShortTheUrl);

//handle the server hit and redirect the client with the long URL :DONE:
router.get('/:shortUrl',RedirectUserLong)

//error handle
router.get('*',(req,res)=>{
    res.status(404).json({
        "status":false,
        "messge":"Route does not exist!"
    });
});

router.post('*',(req,res)=>{
    res.status(404).json({
        "status":false,
        "messge":"Route does not exist!"
    });
})

module.exports = {
    router
};
