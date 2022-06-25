
// TAER PRODUCTOS DEL ARCHIVO data.json
fetch("../datos/datos.json").then( res => res.json() ).then( data => {
  initPage(data)
}).catch( error => {
  Swal.fire({
    title: 'Error',
    text: 'No se pudieron obtener los datos',
    icon: 'error'
  })
})

let categorias = []
let productos = []
let carrito = new Carrito()


/* >>>>> FUNCIONES <<<<< */
function initPage(data) {
  categorias = data.categorias
  productos = data.productos

  mostrarCategorias()
  mostrarProductos()

  const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || []

  carrito.refrescarVista()

  carritoStorage.forEach (prod => {
    carrito.agregarProducto(prod)
  })

  const searchButton = document.getElementById("searchButton")
  searchButton.addEventListener("click", (e) => {
    e.preventDefault()
    const searchValue = document.getElementById("searchValue").value
    filtrarProductosPorNombre(searchValue)
  })
}

function mostrarCategorias() {
  const categoriasContainer = document.getElementById ("categorias")

  categorias.forEach ( ({nombre, id}) => {
    const li = document.createElement("li")
    const boton = document.createElement("button")
    li.setAttribute("class", "nav-item px-1")
    boton.setAttribute("class", "btn btn-light")
    boton.innerText = nombre
    boton.addEventListener("click", (e) => {
      e.preventDefault()
      filtrarProductosPorCategoria(id)
      cambiarPillActiva(e.target)
    })

    li.appendChild(boton)
    categoriasContainer.appendChild(li)
  })

  const li = document.createElement("li")
  li.setAttribute("class", "nav-item px-1")
  const botonLimpiarFiltro = document.createElement("button")
  botonLimpiarFiltro.setAttribute("class", "btn btn-light active")
  botonLimpiarFiltro.innerText = "Mostrar todo"
  botonLimpiarFiltro.addEventListener("click", (e) => {
    e.preventDefault()
    const searchValue = document.getElementById("searchValue")
    searchValue.value = ""
    mostrarProductos()
    cambiarPillActiva(e.target)
  })

  li.appendChild(botonLimpiarFiltro)
  categoriasContainer.appendChild(li)
}

function cambiarPillActiva(element) {
  desactivarPillActiva()
  element.classList.add("active")
}

function desactivarPillActiva() {
  const categoriasContainer = document.getElementById("categorias")
  const activePill = categoriasContainer.querySelector(".active")
  if(activePill) {
    activePill.classList.remove("active")
  }
}

function filtrarProductosPorCategoria(categoriaId) {
  const productosFiltrados = productos.filter(p =>p.idCategoria === categoriaId)
  const searchValue = document.getElementById("searchValue")
  searchValue.value = ""
  mostrarProductos(productosFiltrados)
}

function filtrarProductosPorNombre(search) {
  let productosFiltrados = productos

  if(search != "") {
    productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()))
    desactivarPillActiva()
  }

  mostrarProductos(productosFiltrados)
}

function mostrarProductos(productosFiltrados = productos) {
  const contenedor = document.getElementById("listaDeProductos")
  contenedor.innerHTML = ""

  if (productosFiltrados.length === 0) {
    const celda = document.createElement("div")
    const span = document.createElement("span")
    celda.setAttribute("class", "col-sm-6")
    span.innerText = "No hay productos para mostrar"
    celda.appendChild(span)
    contenedor.appendChild(celda)
  }

  productosFiltrados.forEach(producto => {
    const {precio, nombre, imagen} = producto
    const boton = document.createElement("button")
    boton.setAttribute("class", "btn btn-primary")
    boton.innerText = "Agregar"

    boton.addEventListener('click', (e) => {
      e.preventDefault()
      carrito.agregarProducto(producto, true)
    })

    const celda = document.createElement("div")
    celda.setAttribute("class", "col-sm-3 p-3")

    celda.innerHTML = `<div class="card shadow">
        <div class="image-container align-middle"><img src="imagenes/productos/${imagen}" class="card-img-top" alt="..."></div>
        <div class="card-body">
          <h5 class="card-title overflow-hidden height-2-lines lead">${nombre}</h5>
          <p class="card-text"></p>
          <div class="row">
            <div class="col-sm-6"><div class="badge text-body fs-4">$${precio}</div></div>
            <div class="col-sm-6 btn-container"></div>
          </div>
        </div>
      </div>`

    celda.querySelector('.btn-container').appendChild(boton)
    contenedor.appendChild(celda)
  })
}

