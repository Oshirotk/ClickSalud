const productos = [
  { id: 1, nombre: "Paracetamol", imagen: "image/descarga9.jpeg", precio: 55, oferta: true },
  { id: 2, nombre: "Jarabe de tos", imagen: "image/descarga10.jpeg", precio: 70, oferta: false },
  { id: 3, nombre: "Botiquín", imagen: "image/descarga11.jpeg", precio: 120, oferta: false },
  { id: 4, nombre: "Producto 4", imagen: "image/descarga12.jpeg", precio: 20, precioOriginal: 45, oferta: true },
  { id: 5, nombre: "Producto 5", imagen: "image/descarga13.jpeg", precio: 38, oferta: false },
  { id: 6, nombre: "Producto 6", imagen: "image/descarga14.jpeg", precio: 99, oferta: true },
  { id: 7, nombre: "Producto 7", imagen: "image/descarga15.jpeg", precio: 60, oferta: false },
  { id: 8, nombre: "Producto 8", imagen: "image/descarga16.jpeg", precio: 45, oferta: true },
  { id: 9, nombre: "Producto 9", imagen: "image/descarga17.jpeg", precio: 80, oferta: false },
  { id: 10, nombre: "Producto 10", imagen: "image/descarga18.jpeg", precio: 150, oferta: true }
];

// -----------------------------
// Carrito global con localStorage
// -----------------------------
function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function setCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
  let carrito = getCarrito();
  const existe = carrito.find(p => p.id === producto.id);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  setCarrito(carrito);
  actualizarCarritoUI(); // 👈 se actualiza el contador en el icono
  alert(`${producto.nombre} agregado al carrito 🛒`);
}


// -----------------------------
// Productos Populares (index.html)
// -----------------------------
const contenedorPopulares = document.getElementById("lista_productos");

if (contenedorPopulares) {
  const populares = productos.slice(0, 3); // 3 productos
  populares.forEach(producto => {
    const item = document.createElement("div");
    item.classList.add("producto");

    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h2>${producto.nombre}</h2>
      <p>Precio: S/ ${producto.precio}</p>
      ${producto.oferta ? `<p class="oferta">En oferta!</p>` : ""}
      <button class="btn-carrito">Agregar al carrito</button>
    `;

    // clic en imagen/nombre -> detalle
    item.querySelector("img").addEventListener("click", () => {
      window.location.href = `detalle.html?id=${producto.id}`;
    });
    item.querySelector("h2").addEventListener("click", () => {
      window.location.href = `detalle.html?id=${producto.id}`;
    });

    // clic en botón -> carrito
    item.querySelector(".btn-carrito").addEventListener("click", (e) => {
      e.stopPropagation();
      agregarAlCarrito(producto);
    });

    contenedorPopulares.appendChild(item);
  });
}

// -----------------------------
// Nuevos Productos en carrusel (index.html)
// -----------------------------
const contenedorNuevos = document.getElementById("lista_nuevos");

if (contenedorNuevos) {
  productos.forEach(producto => {
    const item = document.createElement("div");
    item.classList.add("producto");

    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h2>${producto.nombre}</h2>
      <p>Precio: S/ ${producto.precio}</p>
      ${producto.oferta ? `<p class="oferta">En oferta!</p>` : ""}
      <button class="btn-carrito">Agregar al carrito</button>
    `;

    // clic en imagen/nombre -> detalle
    item.querySelector("img").addEventListener("click", () => {
      window.location.href = `detalle.html?id=${producto.id}`;
    });
    item.querySelector("h2").addEventListener("click", () => {
      window.location.href = `detalle.html?id=${producto.id}`;
    });

    // clic en botón -> carrito
    item.querySelector(".btn-carrito").addEventListener("click", (e) => {
      e.stopPropagation();
      agregarAlCarrito(producto);
    });

    contenedorNuevos.appendChild(item);
  });

  // Carrusel con flechas
  const flechaIzquierda = document.querySelector(".flecha.izquierda");
  const flechaDerecha = document.querySelector(".flecha.derecha");
  let scrollPos = 0;

  if (flechaIzquierda && flechaDerecha) {
    flechaDerecha.addEventListener("click", () => {
      scrollPos += contenedorNuevos.clientWidth;
      contenedorNuevos.scrollTo({ left: scrollPos, behavior: "smooth" });
    });

    flechaIzquierda.addEventListener("click", () => {
      scrollPos -= contenedorNuevos.clientWidth;
      contenedorNuevos.scrollTo({ left: scrollPos, behavior: "smooth" });
    });
  }
}

// -----------------------------
// Todos los productos (productos.html) con filtros
// -----------------------------
const contenedorTodos = document.getElementById("contenedor_todos");
const selectOrdenar = document.getElementById("ordenar");
const rangoPrecio = document.getElementById("precio");
const precioValor = document.getElementById("precio_valor");

function mostrarProductos(lista) {
  contenedorTodos.innerHTML = "";
  lista.forEach(producto => {
    const item = document.createElement("div");
    item.classList.add("producto");

    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h2>${producto.nombre}</h2>
      <p>Precio: S/ ${producto.precio}</p>
      ${producto.oferta ? `<p class="oferta">En oferta!</p>` : ""}
      <button class="btn-carrito">Agregar al carrito</button>
    `;

    // clic en imagen/nombre -> detalle
    item.querySelector("img").addEventListener("click", () => {
      window.location.href = `detalle.html?id=${producto.id}`;
    });
    item.querySelector("h2").addEventListener("click", () => {
      window.location.href = `detalle.html?id=${producto.id}`;
    });

    // clic en botón -> carrito
    item.querySelector(".btn-carrito").addEventListener("click", (e) => {
      e.stopPropagation();
      agregarAlCarrito(producto);
    });

    contenedorTodos.appendChild(item);
  });
}

function aplicarFiltros() {
  let listaFiltrada = [...productos];
  const precioMax = parseInt(rangoPrecio.value);
  listaFiltrada = listaFiltrada.filter(p => p.precio <= precioMax);

  switch (selectOrdenar.value) {
    case "nombre_az":
      listaFiltrada.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case "nombre_za":
      listaFiltrada.sort((a, b) => b.nombre.localeCompare(a.nombre));
      break;
    case "precio_bajo":
      listaFiltrada.sort((a, b) => a.precio - b.precio);
      break;
    case "precio_alto":
      listaFiltrada.sort((a, b) => b.precio - a.precio);
      break;
  }

  mostrarProductos(listaFiltrada);
}

if (contenedorTodos) {
  mostrarProductos(productos);

  rangoPrecio.addEventListener("input", () => {
    precioValor.textContent = `$0 - $${rangoPrecio.value}`;
    aplicarFiltros();
  });

  selectOrdenar.addEventListener("change", aplicarFiltros);
}

// -----------------------------
// Detalle del producto (detalle.html)
// -----------------------------
const detalleContainer = document.getElementById("detalle");

if (detalleContainer) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const producto = productos.find(p => p.id === id);

  if (producto) {
    detalleContainer.innerHTML = `
      <div class="detalle-card">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="detalle-derecha">
          <h1 class="titulo">${producto.nombre}</h1>
          <p class="precio">S/ ${producto.precio}</p>
          ${producto.oferta ? `<p class="oferta">¡Este producto está en oferta!</p>` : ""}
          <p id="descripcion-larga">Lorem ipsum dolor sit amet, descripción del producto.</p>
          <button id="btnAgregarDetalle" class="btn-carrito">Agregar al carrito</button>
        </div>
      </div>
    `;

    // 👉 botón del detalle
    document.getElementById("btnAgregarDetalle").addEventListener("click", () => {
      agregarAlCarrito(producto);
    });
  } else {
    detalleContainer.innerHTML = `<p>Producto no encontrado</p>`;
  }
}
// -----------------------------
// Mostrar carrito (carrito.html)
// -----------------------------
// -----------------------------
// Mostrar carrito (carrito.html con estilo tabla)
// -----------------------------
const carritoContenido = document.getElementById("carrito-contenido");
const subtotalUI = document.getElementById("subtotal");
const totalUI = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar");

function actualizarCarritoUI() {
  const carrito = getCarrito();
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const count = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    cartCount.textContent = count;
  }
}

if (carritoContenido) {
  function renderCarrito() {
    const carrito = getCarrito();
    carritoContenido.innerHTML = "";

    if (carrito.length === 0) {
      carritoContenido.innerHTML = `<tr><td colspan="4">Tu carrito está vacío 🛒</td></tr>`;
      subtotalUI.textContent = "S/ 0.00";
      totalUI.textContent = "S/ 0.00";
      return;
    }

    let total = 0;

    carrito.forEach(producto => {
      const subtotal = producto.precio * producto.cantidad;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="producto-info">
          <img src="${producto.imagen}" alt="${producto.nombre}" width="60">
          <div>
            <h4>${producto.nombre}</h4>
          </div>
        </td>
        <td>
          <div class="cantidad-control">
            <button class="menos">-</button>
            <span>${producto.cantidad}</span>
            <button class="mas">+</button>
          </div>
        </td>
        <td>S/ ${subtotal.toFixed(2)}</td>
        <td><button class="eliminar">Eliminar</button></td>
      `;

      // cantidad -
      row.querySelector(".menos").addEventListener("click", () => {
        if (producto.cantidad > 1) producto.cantidad--;
        setCarrito(carrito);
        renderCarrito();
        actualizarCarritoUI();
      });

      // cantidad +
      row.querySelector(".mas").addEventListener("click", () => {
        producto.cantidad++;
        setCarrito(carrito);
        renderCarrito();
        actualizarCarritoUI();
      });

      // eliminar
      row.querySelector(".eliminar").addEventListener("click", () => {
        const nuevo = carrito.filter(p => p.id !== producto.id);
        setCarrito(nuevo);
        renderCarrito();
        actualizarCarritoUI();
      });

      carritoContenido.appendChild(row);
    });

    subtotalUI.textContent = `S/ ${total.toFixed(2)}`;
    totalUI.textContent = `S/ ${total.toFixed(2)}`;
  }

  // vaciar carrito
  btnVaciar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    renderCarrito();
    actualizarCarritoUI();
  });

  renderCarrito();
}

// actualizar contador en todas las páginas
actualizarCarritoUI();
