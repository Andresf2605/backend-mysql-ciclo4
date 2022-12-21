const express = require('express');
const mysql = require('mysql');
const mysql2 = require('mysql2');
const myconn = require('express-myconnection');
const routes = require('./routes')
const cors = require('cors')
const app = express();
const PORT = require('./config')

app.set('port',PORT);

const dbOptions={
    host:'containers-us-west-95.railway.app',
    port:'6869',
    user:'root',
    password:'nUd4o93RQpaq6pD9SNta',
    database:'railway'
}
//middlewares----------------------
app.use(cors())
app.use(myconn(mysql2,dbOptions,'single'))
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

