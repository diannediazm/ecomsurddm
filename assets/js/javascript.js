const productos = document.getElementById('productos').content
const cards = document.getElementById('cards')
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
});

cards.addEventListener('click', e => {
    agregarCarrito(e)
});

const fetchData = async () => {
    try {
        const res = await fetch('http://www.omdbapi.com/?s=batman&apikey=ef7d3bc8')
        const data = await res.json()
        listaProductos(data)
    } catch (error) {
        console.log(error)
    }
}

const listaProductos = data => {
    Object.values(data.Search).forEach(Array => {
        cards.querySelector('img').setAttribute("src", Array.Poster)
        cards.querySelector('h5').textContent = Array.Title
        cards.querySelector('p').textContent = Array.Year
        cards.querySelector('button').dataset.Title = Array.Title
        const clone = cards.cloneNode(true)
        fragment.appendChild(clone)
    })
  cards.appendChild(fragment)
}

const agregarCarrito = e => {
    if(e.target.classList.contains('boton')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = item => {
    const entrada = {
        title: item.querySelector('button').dataset.Title,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(entrada.Title)) {
        entrada.cantidad = carrito[entrada.Title].cantidad + 1
    }
    carrito[entrada.Title] = {...entrada}
    comprar()
}

const comprar = () => {

    Object.values(carrito).forEach(entrada => {
        cards.querySelector('h4').textContent = `Compraste ${entrada.cantidad} ticket`   
        const clone = cards.cloneNode(true)
        fragment.appendChild(clone)
   
    })
   cards.appendChild(fragment)
    
}

/*const eliminarCarrito = e => {
    if (e.target.classList.contains('eliminar')) {
        const entrada = carrito[e.target.dataset.cantidad]
        entrada.cantidad--
        if (entrada.cantidad === 0) {
            delete carrito[e.target.dataset.cantidad]
        } else {
            carrito[e.target.dataset.cantidad] = {...entrada}
        }
        comprar()
    }
    e.stopPropagation()
}*/

function eliminar () {
    var borrar = document.querySelector
}

