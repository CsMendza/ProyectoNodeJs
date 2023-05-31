const express = require('express')
const app = express();
const morgan = require('morgan');
const db = require('./config/database');
const empleados = require('./routes/empleados')


app.get("/", (req, res, next)=>{
    return res.status(200).send("Bienvenido a la lista de empledos");
})

app.use("/empleados",empleados);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});