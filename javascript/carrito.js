class Carrito {

  constructor () {
    this.productos = []
    this.canvas = new bootstrap.Offcanvas('#canvasCarrito')

    const btnLimpiar = document.getElementById("btnLimpiar")
    const btnComprar = document.getElementById("btnComprar")
    this.toastifyDefaults = {
      duration: 1000,
      gravity: "bottom", 
      position: "right",
      style: {
        background: "#6ea8fe",
        color: "#111111"
      }
    }

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
          Toastify({...this.toastifyDefaults, text: "Has vaciado el carrito"}).showToast();
          this.canvas.hide()
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

    this.refrescarVista()

    if(guardarEnStorage) {
      localStorage.setItem ("carrito", this.generarJson())
      const toastifyValues = {...this.toastifyDefaults, text: "Has agregado un producto"}
      console.log(toastifyValues)
      Toastify(toastifyValues).showToast();
    }     
  }

  quitarProducto(idProducto) {
    this.productos = this.productos.filter(p => p.id !== idProducto)
    localStorage.setItem ("carrito", this.generarJson())
    this.refrescarVista()
    Toastify({...this.toastifyDefaults, duration: 2000, text: "Has eliminado un producto"}).showToast();
  }

  refrescarVista (producto) {
    const listaDeProductos = document.getElementById("carritoList")
    const counter = document.getElementById("carritoCounter")
    const valorTotal = document.getElementById("valorTotal")
    const btnLimpiar = document.getElementById("btnLimpiar")
    const btnComprar = document.getElementById("btnComprar")
    
    let contador = 0
    let total = 0

    listaDeProductos.innerHTML = ""

    this.productos.forEach( producto => {
      const {id, precio, nombre, imagen, cantidad} = producto
      const row = document.createElement("div")
      const btnRemove = document.createElement('button')
      total += precio * cantidad

      row.className = "row border-top py-2 position-relative"
      btnRemove.innerHTML = '<i class="bi bi-x-circle-fill"></i>'
      btnRemove.className = 'btnRemove'
      btnRemove.setAttribute("title", "Quitar producto")

      btnRemove.addEventListener('click', (e) => {
        e.preventDefault()
        Swal.fire({
          title: 'Borrar producto',
          text: '¿Estás seguro que quieres borrar este producto?',
          icon: 'question',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          showCancelButton: true,
        
        }).then(result => {
          if (result.isConfirmed) {
            this.quitarProducto(id)
          }
        })
      })
    
      row.innerHTML = `
          <div class="col-img ms-2">
            <img src="imagenes/productos/${imagen}" alt="Imagen del producto ${nombre}" class="border" />
          </div>
          <div class="col text-start">${nombre}</div>
          <div class="col-precio pe-2">${cantidad}x</div>
          <div class="col-precio pe-2">$${precio * cantidad}</div>`
      
      row.appendChild(btnRemove)
    
      listaDeProductos.appendChild(row)
      contador += 1 * cantidad
    })

    if(this.productos.length === 0) {
      btnLimpiar.setAttribute("disabled", "disabled")
      btnComprar.setAttribute("disabled", "disabled")
    } else {
      btnLimpiar.removeAttribute("disabled")
      btnComprar.removeAttribute("disabled")
    }

    counter.innerText = contador
    valorTotal.innerText = `Total $${total}`
  }

  generarJson () {
    return JSON.stringify (this.productos)
  }

  vaciarCarrito () {
    this.productos = []
    localStorage.setItem ("carrito", this.generarJson())
    this.refrescarVista()
  }
}