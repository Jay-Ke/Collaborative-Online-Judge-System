const mongoose=require('mongoose');
const ProblemSchema=mongoose.Schema({
    id:Number,
    name:String,
    desc:String,
    difficulty:String
});

const ProblemModel=mongoose.model('problemmodels',ProblemSchema);
//const ProblemModel=mongoose.model('problem',ProblemSchema);
module.exports=ProblemModel;