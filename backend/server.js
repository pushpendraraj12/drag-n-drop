const express = require('express');
const cors = require('cors');
require('dotenv').config();
const hostname='127.0.0.1'
const app=express();
app.use(express.json());
// app.use(cookieParser())
const port=process.env.PORT || 8000;
app.use(cors({
 origin: ["http://localhost:5000", "http://localhost:3000"],
 methods: ["GET","POST"],
 credentials: true
}));
 app.use(function(req, res, next) {  
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      next();
 });  
app.use(cors());
const uri=process.env.DB_URI;

const file=require('./routes /upload_files.routes')
app.use("/api/",file)
app.listen(port,hostname,()=>{
    console.log(`Server running on port: ${port}`);
})