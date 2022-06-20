class Categoria {
  constructor (id, nombre) {
    this.id = id
    this.nombre = nombre
  }
}

class Producto {
  constructor(id, nombre, imagen, precio, idCategoria) {
    this.id = id
    this.nombre = nombre
    this.imagen = imagen
    this.precio = precio
    this.idCategoria = idCategoria
  }
}

class Carrito {
  constructor () {
    this.productos = []
    this.total = 0
    this.canvas = new bootstrap.Offcanvas('#canvasCarrito')

    const btnLimpiar = document.getElementById("btnLimpiar")
    const btnComprar = document.getElementById("btnComprar")

    btnLimpiar.addEventListener("click", (e) => {
      e.stopPropagation()
      Swal.fire({
        title: 'Limpiar carrito',
        text: '¿Estás seguro que quieres perder tus productos seleccionados?',
        icon: 'question',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
      
      }).then(result => {
        if (result.isConfirmed) {
          this.vaciarCarrito()

          //SWEET ALERT: SE UTILIZA PARA MOSTRAR UN MENSAJE EN DONDE EL USURIO TIENE LA OPCIÓN DE CONTINUAR O CANCELAR LA ACCIÓN ANTES SELECCIONADA
          Swal.fire({
            title: '¡Carrito vaciado!',
            icon: 'success',
            text: 'El carrito ha sido vaciado correctamente'
         
          }).then(result => {
            this.canvas.hide()
          })
        }
      })
    });

    btnComprar.addEventListener("click", (e) => {
      e.stopPropagation()
      Swal.fire({
        title: 'Finalizar compra',
        text: '¿Estás seguro que tienes todos tus productos seleccionados?',
        icon: 'question',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
      
      }).then(result => {
        if (result.isConfirmed) {
          this.vaciarCarrito()
          Swal.fire({
            title: 'Compra finalizada!',
            icon: 'success',
            text: 'Gracias por confiar en nosotros'
          
          }).then(result => {
            this.canvas.hide()
          })
        }
      })
    });
  }

  agregarProducto (producto) {
    this.productos.push(producto)
    this.total += producto.precio
    this.refrescarVista()
    localStorage.setItem ("carrito", this.generarJson())
  }

  refrescarVista (producto) {
    const listaDeProductos = document.getElementById("carritoList")
    const valorTotal = document.getElementById("valorTotal")

    listaDeProductos.innerHTML = ""

    this.productos.forEach( producto => {
      const {precio, nombre, imagen} = producto
      const row = document.createElement("div")
      row.className = "row border-top py-2"
    
      row.innerHTML = `
          <div class="col-img ms-2">
            <img src="imagenes/productos/${imagen}" alt="Imagen del producto ${nombre}" class="border" />
          </div>
          <div class="col">
            ${nombre}
          </div>
          <div class="col-precio">
            $${precio}
          </div>`
    
      listaDeProductos.appendChild(row)
    })

    valorTotal.innerText = `Total $${this.getTotal()}`
  }

  generarJson () {
    return JSON.stringify (this.productos)
  }

  vaciarCarrito () {
    this.productos = []
    this.total = 0
    this.refrescarVista()
    localStorage.setItem ("carrito", this.generarJson())
  }

  getTotal() {
    return this.total
  }
}

// Crear Categorías
const categorias = [
  new Categoria(1, "Camas"),
  new Categoria(2, "Gimnasios"),
  new Categoria(3, "Accesorios"),
  new Categoria(4, "Alimentos"),
  new Categoria(5, "Higiene y Salud")
]

// Crear Productos
const productos = [
  new Producto(1, "Cama con carpita", "cama01.png", 1200, categorias[0].id),
  new Producto(2, "Carpa India", "cama02.png", 850, categorias[0].id),
  new Producto(3, "Carpa con rascador", "cama03.png", 1500, categorias[0].id),
  new Producto(4, "Cama vintage", "cama04.png", 700, categorias[0].id),
  new Producto(5, "Cama hamaca", "cama05.png", 1000, categorias[0].id),
  new Producto(6, "Cama con forma de casita", "cama06.png", 1700, categorias[0].id),
  new Producto(7, "Cama lunar", "cama07.png", 1900, categorias[0].id),
  new Producto(8, "Cama cuadrada", "cama08.png", 600, categorias[0].id),
  new Producto(9, "Gimnasio personalizado", "gimnasio01.png", 2500, categorias[1].id),
  new Producto(10, "Gimnasio mini", "gimnasio02.png", 1250, categorias[1].id),
  new Producto(11, "Gimnasio con carpa y hamaca", "gimnasio03.png", 2100, categorias[1].id),
  new Producto(12, "Gimnasio con carpa", "gimnasio04.png", 1950, categorias[1].id),
  new Producto(13, "Gimnasio con carpa", "gimnasio05.png", 1950, categorias[1].id),
  new Producto(14, "Gimnasio con hamaca", "gimnasio06.png", 2100, categorias[1].id),
  new Producto(15, "Arnes", "arnes01.png", 650, categorias[2].id),
  new Producto(16, "Arnes", "arnes02.png", 700, categorias[2].id),
  new Producto(17, "Collar con cascabel", "collar01.png", 100, categorias[2].id),
  new Producto(18, "Collar", "collar02.png", 150, categorias[2].id),
  new Producto(19, "Collar con flor", "collar03.png", 150, categorias[2].id),
  new Producto(20, "Ratón", "juguete01.png", 80, categorias[2].id),
  new Producto(21, "Pelota nudo", "juguete02.png", 130, categorias[2].id),
  new Producto(22, "Pescado de goma", "juguete03.png", 150, categorias[2].id),
  new Producto(23, "Pista de pelotas", "juguete04.png", 550, categorias[2].id),
  new Producto(24, "Pescado con movimiento", "juguete05.png", 600, categorias[2].id),
  new Producto(25, "Ratón a cuerda", "juguete06.png", 180, categorias[2].id),
  new Producto(26, "Rascador", "rascadores01.png", 900, categorias[1].id),
  new Producto(27, "Rascador", "rascadores02.png", 800, categorias[1].id),
  new Producto(28, "Rascador", "rascadores03.png", 800, categorias[1].id),
  new Producto(29, "Rascador", "rascadores04.png", 800, categorias[1].id),
  new Producto(30, "Rascador", "rascadores05.png", 1000, categorias[1].id),
  new Producto(31, "Transportador", "transportador01.png", 1300, categorias[2].id),
  new Producto(32, "Transportador", "transportador02.png", 850, categorias[2].id),
  new Producto(33, "Transportador", "transportador03.png", 1300, categorias[2].id),
  new Producto(34, "Transportador", "transportador04.png", 1500, categorias[2].id),
  new Producto(35, "Mochila transportador", "transportador05.png", 2100, categorias[2].id),
  new Producto(36, "Frost Cat Indor 3kg", "frost01.png", 650, categorias[3].id),
  new Producto(37, "Frost Cat Indor 7.5kg", "frost02.png", 2000, categorias[3].id),
  new Producto(38, "Frost Kitten 3 kg", "frost03.png", 800, categorias[3].id),
  new Producto(39, "Frost Kitten", "frost04.png", 2800, categorias[3].id),
  new Producto(40, "Frost Cat Senior 3kg", "frost05.png", 900, categorias[3].id),
  new Producto(41, "Frost Cat Senior 7.5 kg", "frost06.png", 2800, categorias[3].id),
  new Producto(42, "Excellent 7.5 kg", "excellent01.png", 1900, categorias[3].id),
  new Producto(43, "Equilibrio Adultos", "equilibrio01.png", 1850, categorias[3].id),
  new Producto(44, "Equilibrio Hairball", "equilibrio02.png", 1900, categorias[3].id),
  new Producto(45, "Equilibrio Kitten", "equilibrio03.png", 2500, categorias[3].id),
  new Producto(46, "Sachet Whiskas sabor a Salmón", "sachet01.png", 30, categorias[3].id),
  new Producto(47, "Sachet Whiskas sabor a Carne", "sachet02.png", 30, categorias[3].id),
  new Producto(48, "Sachet Whiskas sabor a Pavo", "sachet03.png",30, categorias[3].id),
  new Producto(49, "Paté", "lata-pate01.png", 140, categorias[3].id),
  new Producto(50, "Paté", "lata-pate02.png", 180, categorias[3].id),
  new Producto(51, "Golosinas Tiritas", "tiritas01.png", 20, categorias[3].id),
  new Producto(52, "Rascador para pared", "rascadores06.png", 200, categorias[1].id),
  new Producto(53, "Rascador para pared", "rascadores07.png", 250, categorias[1].id),
  new Producto(54, "Bandeja sanitaria con pala", "bandeja-sanitaria01.png", 500, categorias[4].id),
  new Producto(55, "Bandeja sanitaria", "bandeja-sanitaria02.png", 450, categorias[4].id),
  new Producto(56, "Bandeja sanitaria con pala y platos", "bandeja-sanitaria03.png", 550, categorias[4].id),
  new Producto(57, "Bandeja sanitaria con pala", "bandeja-sanitaria04.png", 500, categorias[4].id),
  new Producto(58, "Baño", "bandeja-sanitaria05.png",700, categorias[4].id),
  new Producto(59, "Baño", "bandeja-sanitaria06.png",700, categorias[4].id),
  new Producto(60, "Baño", "bandeja-sanitaria07.png",700, categorias[4].id),
  new Producto(61, "Palas", "pala-sanitaria01.png", 60, categorias[4].id),
  new Producto(62, "Silical Gel", "sanitario-piedras01.png", 200, categorias[4].id),
  new Producto(63, "Piedras sanitarias", "sanitario-piedras02.png", 150, categorias[4].id),
  new Producto(64, "Cepillo", "cepillo01.png", 180, categorias[4].id),
  new Producto(65, "Cepillo", "cepillo02.png", 180, categorias[4].id),
  new Producto(66, "Cepillo", "cepillo03.png", 180, categorias[4].id),
  new Producto(67, "Cepillo guante", "cepillo04.png", 210, categorias[4].id),
  new Producto(68, "Cepillo guante", "cepillo05.png", 220, categorias[4].id),
  new Producto(69, "Bebedero", "bebedero01.png",300, categorias[2].id),
  new Producto(70, "Bebedero", "bebedero02.png",300, categorias[2].id),
  new Producto(71, "Bebedero", "bebedero03.png",200, categorias[2].id),
  new Producto(72, "Comedero", "comedero01.png", 600, categorias[2].id),
  new Producto(73, "Comedero", "comedero02.png", 650, categorias[2].id),
  new Producto(74, "Pipeta Frontline Plus", "pipeta01.png", 230, categorias[4].id),
  new Producto(75, "Pipeta Dominal Max", "pipeta02.png", 250, categorias[4].id),
  new Producto(76, "Pipeta Dominal Max", "pipeta03.png", 250, categorias[4].id),
  new Producto(77, "Shampoo", "shampoo01.png", 250, categorias[4].id),
  new Producto(78, "Acondicionador", "acondicionador01.png", 220, categorias[4].id),
  new Producto(79, "Bolsas bio-degradables", "bolsas-biodegradables01.png",100, categorias[4].id),
  new Producto(80, "Hierva gatuna", "yerba-gatera01.png",120, categorias[4].id),
]

mostrarCategorias()
mostrarProductos()

const carrito = new Carrito()
const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || []

carrito.refrescarVista()

carritoStorage.forEach (prod => {
  carrito.agregarProducto(prod)
})

/* >>>>> FUNCIONES <<<<< */
function mostrarCategorias() {
  const categoriasContainer = document.getElementById ("categorias")

  categorias.forEach ( ({nombre, id}) => {
    const li = document.createElement("li")
    const boton = document.createElement("button")
    li.setAttribute("class", "nav-item")
    boton.setAttribute("class", "nav-link")
    boton.innerText = nombre
    boton.addEventListener("click", (e) => {
      mostrarProductos(id)
      cambiarPillActiva(e.target)
    })

    li.appendChild(boton)
    categoriasContainer.appendChild(li)
  })

  const li = document.createElement("li")
  li.setAttribute("class", "nav-item")
  const botonLimpiarFiltro = document.createElement ("button")
  botonLimpiarFiltro.setAttribute("class", "nav-link active")
  botonLimpiarFiltro.innerText = "Mostrar todo"
  botonLimpiarFiltro.addEventListener("click", (e) => {
    mostrarProductos()
    cambiarPillActiva(e.target)
  })

  li.appendChild(botonLimpiarFiltro)
  categoriasContainer.appendChild(li)
}

function cambiarPillActiva(element) {
  const categoriasContainer = document.getElementById ("categorias")
  const activePill = categoriasContainer.querySelector(".nav-link.active")
  activePill.setAttribute("class", "nav-link")
  element.setAttribute("class", "nav-link active")
}

function mostrarProductos (categoriaId=null) {
  const productosFiltrados = categoriaId !== null ? productos.filter (p =>p.idCategoria === categoriaId) : productos
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
      carrito.agregarProducto(producto)
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

