const express = require('express');
const empleados = express.Router();
const db = require('../config/database');
 

empleados.get("/",async(req, res, next)=>{
    const emp = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code: 1, message: emp});
});

module.exports = empleados;