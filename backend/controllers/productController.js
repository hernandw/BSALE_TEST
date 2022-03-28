const connection = require("../config/config");



//Ruta de Inicio
exports.home = (req, res) => {
  let sql = "SELECT * FROM product";
  connection.query(sql, (err, results) => {
    
    if (err) throw err;
    else {
      res.render("products", {
        data: results,
      });
    }
    
  });
};


//Ruta de busqueda de productos
exports.buscar = (req, res) => {
  const name = req.query.name;
  let sql = `SELECT * FROM product WHERE name LIKE '%${name}%'`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.render("products", {
        data: results,
      });
    } else {
      res.render("error");
    }
  });
};

//Ruta para los filtros por categoria
exports.filtro = (req, res) => {
  const id = req.params.id;
  
  let sql = `select p.id, c.name as category, p.url_image, p.price, p.name from product p inner join category c on p.category = c.id WHERE category = ${id}`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    else {
      res.render("products", {
        data: results
      });
    }
  });
  
}

//Ruta para el detalle del producto
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

//Ordenar Productos de menor a mayor
exports.precioAsc = (req, res) => {
  const { id } = req.params;
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


//Ordenar Productos de Mayor a menor
exports.precioDesc = (req, res) => {
  const { id } = req.params;
  const sql = "select * from product ORDER BY price desc";
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
