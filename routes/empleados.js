const express = require('express');
const empleados = express.Router();
const db = require('../config/database');
 
empleados.post("/", async(req, res, next) => {
    const{nombre, apellidos, telefono, email, direccion} = req.body;

    if (nombre && apellidos && telefono && email && direccion) {
        let query = "INSERT INTO empleados(nombre, apellidos, telefono, email, direccion)";
        query+= `VALUES('${nombre}','${apellidos}','${telefono}','${email}','${direccion}')`;
        const rows = await db.query(query);
        if (rows.affectedRows==1) {
            return res.status(201).json({code: 201, message:"Empleado insertado correctamente"});
        }
        return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});

});

empleados.delete("/:id([0-9]{1,3})",async(req,res,next)=>{
    const query = `DELETE FROM empleados WHERE id=${req.params.id}`;
    const rows= await db.query(query);

    if (rows.affectedRows==1) {
        return res.status(200).json({code:200, message: "empleado borrado correctamente"})
    }
    return res.status(404).json({code:404,message:"empleado no encontrado"})
});

empleados.put("/:id([0-9]{1,3})",async(req,res,next)=>{
    const{ nombre, apellidos, telefono, email, direccion} = req.body;
    
    if (nombre && apellidos && telefono && email && direccion) {
        let query = `UPDATE empleados SET nombre='${nombre}',apellidos=${apellidos},`;
        query+= `telefono=${telefono},email=${email},direccion=${direccion} WHERE id=${req.params.id};`;
        const rows = await db.query(query);
        if (rows.affectedRows==1) {
            return res.status(201).json({code: 201, message:"empleado actualizado correctamente"});
        }
        return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});

    
});

empleados.patch("/:id([0-9]{1,3})",async(req,res,next)=>{

    if(req.body.nombre){

    
        let query = `UPDATE empleados SET nombre='${req.body.nombre}' WHERE id=${req.params.id}`;
        const rows = await db.query(query);
        if (rows.affectedRows==1) {
            return res.status(201).json({code: 201, message:"Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 200, message:"Ocurrio un error"});

    }
    return res.status(500).json({code:500,message:"Campos incompletos"});

    
});

empleados.get("/",async(req, res, next)=>{
    const emp = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code: 1, message: emp});
});

empleados.get('/:id([0-9]{1,3})',async(req, res, next)=>{
    const id = req.params.id ;
    if (id >=1 && id<=722) {  
        const emp =await db.query("SELECT * FROM empleados WHERE id ="+id);
        return res.status(200).json({code: 201, message: emp});
    }
    return res.status(404).send({code: 404, message: "empleado no encontrado"});
});

empleados.get('/:name([A-Za-z]+)',async(req, res, next)=>{
    const name = req.params.name;
    if(name){
    const emp =await db.query(`SELECT * FROM empleados WHERE nombre = "${name}"`);
    return res.status(200).json(emp);
    }
    return res.status(404).send({code: 404, message: "empleado no encontrado"});
    
});
module.exports = empleados;