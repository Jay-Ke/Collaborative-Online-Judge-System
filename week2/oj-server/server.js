const express = require('express');
const app = express();
const path=require('path');
const restRouter=require('./routes/rest');
const indexRouter=require('./routes/index');
//app.get('/', (req, res) => res.send('Hello World!'));
const mongoose=require('mongoose');

mongoose.connect('mongodb://data:data@ds121896.mlab.com:21896/canto');
//mongoose.connect('mongodb://user:user@ds161162.mlab.com:61162/cs503');

//app.use('',express.static(path.join(__dirname,'../public')));
app.use(express.static(path.join(__dirname,'../public/')));
app.use('/',indexRouter);
app.use('/api/v1',restRouter);

//handle other request, return index.html
app.use((req,res)=>{
    res.sendFile('index.html',{root:path.join(__dirname,'../public/')});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
