require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const connection = require('./config/config')
const customerRoutes = require("./routes/product");

// Configuraciones
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs"); // motor de plantilla EJS
app.set("views", path.join(__dirname, "../frontend/views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev")); // ver las consultas en la consola

//Conexión a la BBDD

//Rutas del servidor
app.use("/", customerRoutes);

//Static
app.use(express.static(path.join(__dirname, "public")));

//Levantamiento del Servidor
app.listen(PORT, async(req, res) => {
  console.log(`Servidor activo on port: ${PORT}`);

/*   // Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
}); */
 
});

module.exports = app;