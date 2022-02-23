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
    if (results.length > 0) {
      /* res.render("products", {
        data: results, */
        res.json(results)
      /* }); */
    } else {
      res.send("Not result");
    }
  });
};


//Ruta al JSON de la Base de Datos
exports.api = (req, res) => {
  const sql = "SELECT * FROM product";
  connection.query(sql, (error, results) => {
    if (error) {
      console.log({
        message: "Error: " + error,
      });
    }
    if (results.length > 0) {
      const resultados = res.json(results);
    } else {
      res.send("Not result");
    }
  });
};

//Ruta de la Búsqueda de productos
exports.busqueda = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM product WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.render("resultProduct", {
        data: result,
      });
    } else {
      res.send("Not result");
    }
  });
};
