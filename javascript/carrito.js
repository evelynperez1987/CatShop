class Carrito {
  constructor () {
    this.productos = []
    this.total = 0
    this.canvas = new bootstrap.Offcanvas('#canvasCarrito')

    const btnLimpiar = document.getElementById("btnLimpiar")
    const btnComprar = document.getElementById("btnComprar")

    btnLimpiar.addEventListener("click", (e) => {
      e.preventDefault()
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
      e.preventDefault()
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

  agregarProducto (producto, guardarEnStorage = false) {
    const pExistente = this.productos.find(p => p.id === producto.id)
    if(pExistente) {
      pExistente.cantidad++
    } else {
      producto.cantidad = 1
      this.productos.push(producto)
    }

    this.total += producto.precio
    this.refrescarVista()

    if(guardarEnStorage) {
      localStorage.setItem ("carrito", this.generarJson())
      Toastify({
        text: "Has agregado un producto",
        duration: 1000,
        gravity: "bottom", 
        position: "right",
        style: {
          background: "#6ea8fe",
          color: "#111111"
        }
      }).showToast();
    }     
  }

  refrescarVista (producto) {
    const listaDeProductos = document.getElementById("carritoList")
    const counter = document.getElementById("carritoCounter")
    const valorTotal = document.getElementById("valorTotal")
    let contador = 0

    listaDeProductos.innerHTML = ""

    this.productos.forEach( producto => {
      const {precio, nombre, imagen, cantidad} = producto
      const row = document.createElement("div")
      row.className = "row border-top py-2"
    
      row.innerHTML = `
          <div class="col-img ms-2">
            <img src="imagenes/productos/${imagen}" alt="Imagen del producto ${nombre}" class="border" />
          </div>
          <div class="col text-start">
            ${nombre}
          </div>
          <div class="col-precio pe-2">
            x${cantidad}
          </div>
          <div class="col-precio pe-2">
            $${precio * cantidad}
          </div>`
    
      listaDeProductos.appendChild(row)
      contador += 1 * cantidad
    })

    counter.innerText = contador
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