const express=require('express');
const app=new express();



const port=process.env.port || 3265;



//Set views
app.set('view engine','ejs');
app.set('views','views');

//set middleware
app.use(express.static('public'));


//route

app.get("/",(req,res)=>{

   // res.send("Hello World");
   res.render('index');
});



const server=app.listen(port,()=> console.log(`This server is running on ${port}`));


const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('a user connected');
});