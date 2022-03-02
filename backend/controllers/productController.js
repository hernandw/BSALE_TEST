const mysql = require("mysql2");
const connection = require("../config/config");

//Productos a mostrar por pagina
const resultsPerPage = 12;

//Ruta de Inicio
exports.home = (req, res) => {
  let sql = "SELECT * FROM product";
  connection.query(sql, (error, results) => {
    const numOfResults = results.length;
    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
    let page = req.query.page ? Number(req.query.page) : 1;
    if (page > numberOfPages) {
      res.redirect("/?page=" + encodeURIComponent(numberOfPages));
    } else if (page < 1) {
      res.redirect("/?page=" + encodeURIComponent("1"));
    }
    //Determinar el número inicial del SQL Limit
    const startingLimit = (page - 1) * resultsPerPage;
    //Obtener el numero de productos para comenzar
    sql = `SELECT * FROM product LIMIT ${startingLimit},${resultsPerPage}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      let iterator = page - 5 < 1 ? 1 : page - 5;
      let endingLink =
        iterator + 9 <= numberOfPages
          ? iterator + 9
          : page + (numberOfPages - page);
      if (endingLink < page + 4) {
        iterator -= page + 4 - numberOfPages;
      }
      res.render("products", {
        data: results,
        page,
        iterator,
        endingLink,
        numberOfPages,
      });
    });
  });
};

//Ruta de la Búsqueda de productos
exports.buscar = (req, res) => {
  const name = req.query.name;
  let sql = `SELECT * FROM product WHERE name LIKE '%${name}%'`;
  connection.query(sql, (error, results) => {
    if(results.length === 0) {
      return res.render('error')
    }
    const numOfResults = results.length;
    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
    let page = req.query.page ? Number(req.query.page) : 1;
    if (page > numberOfPages) {
      res.redirect("/?page=" + encodeURIComponent(numberOfPages));
    } else if (page < 1) {
      res.redirect("/?page=" + encodeURIComponent("1"));
    }
    //Determinar el número inicial del SQL Limit
    const startingLimit = (page - 1) * resultsPerPage;
    //Obtener el numero de productos para comenzar
    sql = `SELECT * FROM product WHERE name LIKE '%${name}%' LIMIT ${startingLimit},${resultsPerPage}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      let iterator = page - 5 < 1 ? 1 : page - 5;
      let endingLink =
        iterator + 9 <= numberOfPages
          ? iterator + 9
          : page + (numberOfPages - page);
      
      if (endingLink < page + 4) {
        iterator -= page + 4 - numberOfPages;
      }
            res.render("products", {
        data: results,
        page,
        iterator,
        endingLink,
        numberOfPages
      });
      
    });
  });
};

//Ruta para los filtros por categoria
exports.filtro = (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = `select p.id, c.name as category, p.url_image, p.price, p.name from product p inner join category c on p.category = c.id WHERE category = ${id}`;
  connection.query(sql, (error, results) => {
    const numOfResults = results.length;
    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
    let page = req.query.page ? Number(req.query.page) : 1;
    if (page > numberOfPages) {
      res.redirect("/?page=" + encodeURIComponent(numberOfPages));
    } else if (page < 1) {
      res.redirect("/?page=" + encodeURIComponent("1"));
    }
    //Determinar el número inicial del SQL Limit
    const startingLimit = (page - 1) * resultsPerPage;
    //Obtener el numero de productos para comenzar
    sql = `select p.id, c.name as category, p.url_image, p.price, p.name from product p inner join category c on p.category = c.id WHERE category = ${id} LIMIT ${startingLimit},${resultsPerPage}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      let iterator = page - 5 < 1 ? 1 : page - 5;
      let endingLink =
        iterator + 9 <= numberOfPages
          ? iterator + 9
          : page + (numberOfPages - page);
      if (endingLink < page + 4) {
        iterator -= page + 4 - numberOfPages;
      }
      res.render("products", {
        data: results,
        page,
        iterator,
        endingLink,
        numberOfPages,
      });
    });
  });
};

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


//Ruta para ordenar de menor a mayor precio
exports.precioAsc = (req, res) => {
  let sql = "select * from product ORDER BY price asc";
  connection.query(sql, (error, results) => {
    const numOfResults = results.length;
    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
    let page = req.query.page ? Number(req.query.page) : 1;
    if (page > numberOfPages) {
      res.redirect("/?page=" + encodeURIComponent(numberOfPages));
    } else if (page < 1) {
      res.redirect("/?page=" + encodeURIComponent("1"));
    }
    //Determinar el número inicial del SQL Limit
    const startingLimit = (page - 1) * resultsPerPage;
    //Obtener el numero de productos para comenzar
    sql = `select * from product ORDER BY price asc LIMIT ${startingLimit},${resultsPerPage}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      let iterator = page - 5 < 1 ? 1 : page - 5;
      let endingLink =
        iterator + 9 <= numberOfPages
          ? iterator + 9
          : page + (numberOfPages - page);
      if (endingLink < page + 4) {
        iterator -= page + 4 - numberOfPages;
      }
      res.render("products", {
        data: results,
        page,
        iterator,
        endingLink,
        numberOfPages,
      });
    });
  });
};

//Ruta para ordenar de mayor a menor precio
exports.precioDesc = (req, res) => {
  let sql = "select * from product ORDER BY price DESC";
  connection.query(sql, (error, results) => {
    const numOfResults = results.length;
    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
    let page = req.query.page ? Number(req.query.page) : 1;
    if (page > numberOfPages) {
      res.redirect("/?page=" + encodeURIComponent(numberOfPages));
    } else if (page < 1) {
      res.redirect("/?page=" + encodeURIComponent("1"));
    }
    //Determinar el número inicial del SQL Limit
    const startingLimit = (page - 1) * resultsPerPage;
    //Obtener el numero de productos para comenzar
    sql = `select * from product ORDER BY price DESC LIMIT ${startingLimit},${resultsPerPage}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      let iterator = page - 5 < 1 ? 1 : page - 5;
      let endingLink =
        iterator + 9 <= numberOfPages
          ? iterator + 9
          : page + (numberOfPages - page);
      if (endingLink < page + 4) {
        iterator -= page + 4 - numberOfPages;
      }
      res.render("products", {
        data: results,
        page,
        iterator,
        endingLink,
        numberOfPages,
      });
    });
  });
};
