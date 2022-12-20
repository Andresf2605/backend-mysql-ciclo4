const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes')
const cors = require('cors')
const app = express();

app.set('port',9000);

const dbOptions={
    host:'localhost',
    port:'3306',
    user:'root',
    password:'ku8awu4o',
    database:'deportes'
}
//middlewares----------------------
app.use(cors())
app.use(myconn(mysql,dbOptions,'single'))
app.use(express.json());
//Routes---------------------

app.use('/api', routes)

app.get('/',(req,res)=>{
    res.send('Welcome to my App')
})

// app.use('/api',routes)

app.listen(app.get('port'),()=>{
    console.log(`server running to port ${app.get('port')}`);
})

