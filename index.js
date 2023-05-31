const express = require('express')
const app = express();
const db = require('./config/database');


app.get("/",(req, res, next)=>{
    res.status(200);
    res.send("Bienvenido");
})




app.get("/:consultas", (req, res, next)=>{
    console.log(req.params.consultas);
    res.status(200);
    res.send("Hola "+ req.params.consultas);
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});