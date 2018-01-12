const express=require('express');

const router=express.Router();

const problemService=require('../services/problemService');

const bodyParser=require('body-parser');

const jsonParser=bodyParser.json();

const nodeRestClient=require('node-rest-client').Client;

const restClient= new nodeRestClient();

//EXECUTOR_SERVER_URL="http://localhost:5000/build_and_run";
EXECUTOR_SERVER_URL="http://executor/build_and_run";
restClient.registerMethod('build_and_run',EXECUTOR_SERVER_URL,'POST');

//get problems
router.get('/problems',(req,res)=>{
    problemService.getProblems()
        .then(problems=>res.json(problems));
});

//get problem
router.get('/problems/:id',(req,res)=>{
    const id=req.params.id;
    problemService.getProblem(+id)
        .then(problem=>res.json(problem));
});

//post problem
router.post('/problems',jsonParser,(req,res)=>{
    problemService.addProblem(req.body)
        .then(problem=>{
            res.json(problem);
        },(error)=>{
            res.status(400).send('Problem name already exists');
            //res.status(400).send(error);
        });
});

router.post('/build_and_run',jsonParser,(req,res)=>{
    const userCodes=req.body.userCodes;
    const lang=req.body.lang;
    //const lang='Java';
    console.log('lang:',lang,'code:',userCodes);
    //res.json({'text':'Hello from server'});

    restClient.methods.build_and_run(
        {
            data:{code:userCodes,lang:lang},
            headers:{'Content-Type': 'application/json'}
        },
        (data,response)=>{
            
            const text=`Build output : ${data['build']}, Execute output: ${data['run']}`;
            data['text']=text;
            res.json(data);
        }
    );
});


module.exports=router;

