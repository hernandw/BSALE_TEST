const mysql = require("mysql2");
const connection = require("../config/config");

//Ruta de Inicio
exports.home = (req, res) => {
  const sql = "SELECT * FROM product";
  connection.query(sql, (error, results) => {
    if (error) {
      console.log({
        message: "Error: " + error,
      });
    }
    if (results.length == 0) {
      res.render("error");
    } else {
      res.render("products", {
        data: results,
      });
    }
  });
};

//Ruta de la Búsqueda de productos
exports.buscar = (req, res) => {
  const name = req.query.name;
  const sql = `SELECT * FROM product WHERE name LIKE '%${name}%'`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.log({
        message: "Error: " + error,
      });
    }
    if (results.length == 0) {
      res.render("error");
    } else {
      res.render("products", {
        data: results,
      });
    }
  });
};
