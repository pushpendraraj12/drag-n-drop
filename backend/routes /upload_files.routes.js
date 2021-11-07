const router=require('express').Router();
const multer=require('multer')
const {v4:uuidv4} = require('uuid')
const DIR='${__dirname}/../uploads/';
const storage=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
})

let upload = multer({
    storage: storage,
    limit:{fileSize:1000000*50},
}).single('file');
router.route('/upload').post((req,res)=>{
    upload(req,res,async (error)=>{
    if(error){
    res.status(500).json(error.message)
}

        res.json("success")          
    })
})

router.route('/submit').post((req,res)=>{
    const data=req.body;
    console.log(data)
    res.status(200).json("All is Done!");
})

module.exports=router;