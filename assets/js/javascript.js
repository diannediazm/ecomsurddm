const productos = document.getElementById('productos').content
const cards = document.getElementById('cards')
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

cards.addEventListener('click', e => {
    agregarCarrito(e)
})

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
        console.log(Array)
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

const setCarrito = objeto => {
    const entrada = {
        title: objeto.querySelector('button').dataset.Title,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(entrada.title)) {
        entrada.cantidad = carrito[entrada.title].cantidad + 1
    }

    carrito[entrada.title] = {...entrada}


    console.log(entrada)
}
