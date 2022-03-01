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

exports.productDetail = (req, res) => {
  const { id } = req.params;
  const sql = `select p.id, c.name as category, p.url_image, p.price, p.name from product p inner join category c on p.category = c.id WHERE p.id = ${id}`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.log({
        message: "Error: " + error,
      });
    } else {
      res.render("detailProduct", {
        data: results[0],
      });
    }
  });
};

exports.filtro = (req, res) => {
  const { id } = req.params;
  const sql = `select p.id, c.name as category, p.url_image, p.price, p.name from product p inner join category c on p.category = c.id WHERE category = ${id}`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.log({
        message: "Error: " + error,
      });
    } else {
      res.render("products", {
        data: results,
      });
    }
  });
};

exports.precioAsc = (req, res) => {
    const sql = "select * from product ORDER BY price asc";
  connection.query(sql, (error, results) => {
    if (error) {
      console.log({
        message: "Error: " + error,
      });
    } else {
      res.render("products", {
        data: results,
      });
    }
  });
};

exports.precioDesc = (req, res) => {
    const sql = "select * from product ORDER BY price DESC";
  connection.query(sql, (error, results) => {
    if (error) {
      console.log({
        message: "Error: " + error,
      });
    } else {
      res.render("products", {
        data: results,
      });
    }
  });
};
