const productos = document.getElementById('productos').content
const cards = document.getElementById('cards')
const carritoLista = document.getElementById('carritoLista')
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
        carritoLista.querySelector('h4').textContent = `Compraste ${entrada.cantidad} ticket`   
    })
}

$('#eliminar').click(function() {
    $('h4').empty();
});




