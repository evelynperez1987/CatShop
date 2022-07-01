class App {

  constructor() {
    this.categorias = []
    this.productos = []
    this.carrito = new Carrito()
    this.traerData()
  }

  traerData = async () => {
    const datos = await fetch("datos/datos.json").then(res => res.json()).catch( error => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron obtener los datos',
        icon: 'error'
      })
    })
    
    if(datos) {
      this.initPage(datos)
    }
  }

  initPage = (data) => {
    this.categorias = data.categorias
    this.productos = data.productos

    const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || []
    
    this.mostrarCategorias()
    this.mostrarProductos()
    this.carrito.refrescarVista()

    carritoStorage.forEach (prod => {
      this.carrito.agregarProducto(prod)
    })

    const searchButton = document.getElementById("searchButton")
    searchButton.addEventListener("click", (e) => {
      e.preventDefault()
      const searchValue = document.getElementById("searchValue").value
      this.filtrarProductosPorNombre(searchValue)
    })
  }

  mostrarCategorias = () => {
    const categoriasContainer = document.getElementById ("categorias")

    this.categorias.forEach ( ({nombre, id}) => {
      const li = document.createElement("li")
      const boton = document.createElement("button")
      li.setAttribute("class", "nav-item px-1")
      boton.setAttribute("class", "btn btn-light")
      boton.innerText = nombre
      boton.addEventListener("click", (e) => {
        e.preventDefault()
        this.filtrarProductosPorCategoria(id)
        this.cambiarPillActiva(e.target)
      })

      li.appendChild(boton)
      categoriasContainer.appendChild(li)
    })

    const li = document.createElement("li")
    li.setAttribute("class", "nav-item px-1")
    const botonLimpiarFiltro = document.createElement("button")
    botonLimpiarFiltro.setAttribute("id", "btnAllCategories")
    botonLimpiarFiltro.setAttribute("class", "btn btn-light active")
    botonLimpiarFiltro.innerText = "Mostrar todo"
    
    botonLimpiarFiltro.addEventListener("click", (e) => {
      e.preventDefault()
      const searchValue = document.getElementById("searchValue")
      searchValue.value = ""
      this.mostrarProductos()
      this.cambiarPillActiva(e.target)
    })

    li.appendChild(botonLimpiarFiltro)
    categoriasContainer.appendChild(li)
  }

  cambiarPillActiva = (element) => {
    this.desactivarPillActiva()
    element.classList.add("active")
  }

  desactivarPillActiva = () =>  {
    const categoriasContainer = document.getElementById("categorias")
    const activePill = categoriasContainer.querySelector(".active")
    if(activePill) {
      activePill.classList.remove("active")
    }
  }

  filtrarProductosPorCategoria = (categoriaId) => {
    const productosFiltrados = this.productos.filter(p => p.idCategoria === categoriaId)
    const searchValue = document.getElementById("searchValue")
    searchValue.value = ""
    this.mostrarProductos(productosFiltrados)
  }

  filtrarProductosPorNombre = (search) => {
    let productosFiltrados = this.productos

    if(search !== "") {
      productosFiltrados = this.productos.filter(p => this.eliminarCaracteres(p.nombre).includes(this.eliminarCaracteres(search)))
      this.desactivarPillActiva()
    } else {
      const btnAllCategories = document.getElementById('btnAllCategories')
      btnAllCategories.classList.add("active")
    }

    this.mostrarProductos(productosFiltrados)
  }

  eliminarCaracteres = (str) => {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }


  mostrarProductos = (productosFiltrados = this.productos) => {
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
        this.carrito.agregarProducto(producto, true)
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
}

