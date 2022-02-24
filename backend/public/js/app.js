const productos = document.getElementById("productos");

document.addEventListener("DOMContentLoaded", (e) => {
  fechData();
});

// Conexión a la BBDD a traves de un JSON
const fechData = async () => {
  try {
    const res = await fetch("/product/api");
    const data = await res.json();
    productTienda(data);
    formularioProductos(data);
  } catch (error) {
    console.log(error);
  }
};

//Listado de Productos que se consumen del JSON
const productTienda = (data) => {
  let elementos = "";
  data.forEach((item) => {
    elementos += `
<article class="card">
                    <img class="img-fluid" src=${item.url_image} />
                    <div class="card-content">
                        <h5>
                        ${item.name}
                        </h5>
                        
                        <h5>$ ${item.price}
                        </h5>
                        </div>
                        <a class="btn btn-primary" href=/product/${item.id} >Ver Ficha</a>
                </article>
`;
  });
  productos.innerHTML = elementos;
};
