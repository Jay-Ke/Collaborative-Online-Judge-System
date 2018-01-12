const express=require('express');
const router=express.Router();
const path=require('path');

router.get('/',(req,res)=>{
    res.sendFile('index.html',{root:path.join(__dirname,'../../public/')});
});

module.exports=router;