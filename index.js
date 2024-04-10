const express = require("express");
require('dotenv').config();
const {dbConnection}  = require('./database/config');
const routerApi = require('./routes');
const cors = require("cors");

const app = express();

//Base de datos
dbConnection();

app.use(cors());

app.use(express.json());


app.get("/", (req, res) =>{
  res.send("Hola mi server en Express");
});

routerApi(app);




app.listen(process.env.PORT, () =>{
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
