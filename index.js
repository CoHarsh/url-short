require('dotenv').config();


const express = require('express')
const {router} = require('./router');
const cors = require('cors');
const Database = require('./DB_Connect');

const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || 'localhost';

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

//routes for the CSR
app.use('/',router);

//routes for the SSR
// TODO:

app.listen(PORT,HOST,() => {
    Database.connect(process.env.MONGO_USERNAME,process.env.MONGO_PASSWORD,process.env.MONGO_DBNAME)
    console.log(`Server is UP on PORT : ${PORT} ans HOST : ${HOST}`);
});