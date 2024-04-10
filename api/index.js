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


app.get("/api", (req, res) =>{
  res.send("Hola mi server en Express");
});

routerApi(app);

const port = process.env.PORT || 3000;


app.listen(port, () =>{
  console.log(`Servidor corriendo en el puerto ${port}`);
});
