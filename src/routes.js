const express = require('express');
const routes = express.Router();

routes.get('/:table',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        let ssql = "SELECT * FROM "+req.params.table
        conn.query(ssql,(err,rows)=>{
            if(err) return res.send(err)
            res.json(rows);
        })
    })
})  

routes.get('/:table/:email/:clave',(req,res)=>{
    // res.send('Ahora si viene el sel')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        let ssql = 'SELECT * FROM '+req.params.table+' where usu_email="'+req.params.email+'" and usu_clave="'+req.params.clave+'"'
        conn.query(ssql,(err,rows)=>{
            if(err) return res.send(err)
            res.json(rows);
        })
    })
})  


routes.post('/:table',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        let ssql = "INSERT INTO " + req.params.table + " set ?"
        conn.query(ssql,[req.body],(err,rows)=>{
            if(err) return res.send(err)
            res.send('Se guardo exitosamente');
        })
    })
})

routes.delete('/:table/:nombreId/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        let ssql = "DELETE FROM " + req.params.table + " where " + req.params.nombreId + " = "+req.params.id;
        conn.query(ssql,(err,rows)=>{
            if(err) return res.send(err)
            res.json(rows);
            //.send('Book delete Ok!');
        })
    })
})

routes.put('/:table/:nombreId/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err).status(400)
        let ssql = "UPDATE " + req.params.table + " set ? " + " where " + req.params.nombreId + " = " + req.params.id;
        conn.query(ssql,[req.body],(err,rows)=>{
            if(err) return res.send(err)
            res.json(req.body);
        })
    })
})

routes.get('/:table/:limit',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        let ssql = "select t1.eve_id as sec"
        ssql +=",t2.equ_nombre as equi1"
        ssql +=",t3.equ_nombre as equi2"
        ssql +=",t1.eve_marca1 as marca1"
        ssql +=",t1.eve_marca2 as marca2"
        ssql +=",t4.dep_nombre as deporte"
        ssql +=",t1.eve_descrip as detalle"
        ssql +=",date_format(t1.eve_fecha, '%d-%m-%Y') as fecha " 
        ssql +="from eventos t1 "
        ssql +="left join equipos t2 on t1.equ_equipo1 = t2.equ_id " 
        ssql +="left join equipos t3 on t1.equ_equipo2 = t3.equ_id "
        ssql +="left join deportes t4 on t1.dep_id = t4.dep_id "
        ssql +="order by 1 desc limit "+req.params.limit;
        conn.query(ssql,(err,rows)=>{
            if(err) return res.send(err)
            console.log(rows);
            res.json(rows);
        })
    })
})  


routes.get('/:table/all/deporte/:idDeporte',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        let ssql = "select t1.eve_id as sec"
        ssql +=",t2.equ_nombre as equi1"
        ssql +=",t3.equ_nombre as equi2"
        ssql +=",t1.eve_marca1 as marca1"
        ssql +=",t1.eve_marca2 as marca2"
        ssql +=",t4.dep_nombre as deporte"
        ssql +=",t1.eve_descrip as detalle"
        ssql +=",date_format(t1.eve_fecha, '%d-%m-%Y') as fecha " 
        ssql +="from eventos t1 "
        ssql +="left join equipos t2 on t1.equ_equipo1 = t2.equ_id " 
        ssql +="left join equipos t3 on t1.equ_equipo2 = t3.equ_id "
        ssql +="left join deportes t4 on t1.dep_id = t4.dep_id "
        ssql +="where t1.dep_id = "+req.params.idDeporte;
        conn.query(ssql,(err,rows)=>{
            if(err) return res.send(err)
            console.log(rows);
            res.json(rows);
        })
    })
})  



module.exports = routes