const express = require('express');
const empleados = express.Router();
const db = require('../config/database');
const pokemon = require('');

empleados.get("/",async(req, res, next)=>{
    const emp = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code: 1, message: emp});
});

empleados.post("/", async(req, res, next) => {
    const{ nombre, apellido, telefono, email, direccion} = req.body;

    if (nombre && apellido && telefono && email && direccion) {
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query+= `VALUES('${pok_name}','${pok_height}','${pok_weight}','${pok_base_experience}')`;
        const rows = await db.query(query);
        if (rows.affectedRows==1) {
            return res.status(201).json({code: 201, message:"Pokemon insertado correctamente"});
        }
        return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});

});

module.exports = pokemon;