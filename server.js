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
    console.log('user connected');

    socket.username="Ganesh suthar";

    //listen on change username

    socket.on('change_username', (data) => {
        socket.username=data.username;
        //console.log(data.username);
    });

     //listen on new_message
     socket.on('new_message', (data) => {
         //broadcast the new message
         io.sockets.emit('new_message', {
             message: data.message,
             username: socket.username
         });
     });

     //listen on typing
     socket.on('typing', (data) => {
         socket.broadcast.emit('typing', {
             username: socket.username
         })
     });
});