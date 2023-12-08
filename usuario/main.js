// Funciones para almacenar y traer los data que se almacenan
function saveLocalStorage(llave, valorGuardar) {
    localStorage.setItem(llave, JSON.stringify(valorGuardar))
}
function getLocalStorage(llave) {
    const data = JSON.parse(localStorage.getItem(llave))
    return data
}
let products = getLocalStorage('productos') || [];

// Variables que traemos de nuestro html
const purchaseInformation = document.getElementById('purchaseInformation');
const containerPurchase = document.getElementById('containerPurchase');
const productsPurchase = document.getElementById('productsPurchase');
const container = document.getElementById('container');
const car = document.getElementById('car');
const number = document.getElementById("number");
const header = document.querySelector("#header");
const total = document.getElementById('total');
const body = document.querySelector("body");
const x = document.getElementById('x')

// Variables que vamos a usar en nuestoro proyecto
let list = []
let totalValue = 0

// Scroll de nuestra pagina
window.addEventListener("scroll", function () {
    if (container.getBoundingClientRect().top < 10) {
        header.classList.add("scroll")
    }
    else {
        header.classList.remove("scroll")
    }
})


window.addEventListener('load', () => {
    
viewProducts();
    containerPurchase.classList.add("none")
})

function 
viewProducts() {
    container.innerHTML = ""
    for (let i = 0; i < products.length; i++) {
        if (products[i].existencia > 0) {
            container.innerHTML += `<div><img src="${products[i].urlImagen}"><div class="information"><p>${products[i].nombre}</p><p class="precio">$${products[i].valor}</p><button onclick=buy(${i})>comprar</button></div></div>`
        }
        else {
            container.innerHTML += `<div><img src="${products[i].urlImagen}"><div class="information"><p>${products[i].nombre}</p><p class="precio">$${products[i].valor}</p><p class="soldOut">Sold Out</p></div></div>`
        }
    }
}

function buy(indice) {
    list.push({ nombre: products[indice].nombre, precio: products[indice].valor })

    let van = true
    let i = 0
    while (van == true) {
        if (products[i].nombre == products[indice].nombre) {
            products[i].existencia -= 1
            if (products[i].existencia == 0) {
                
viewProducts()
            }
            van = false
        }
        saveLocalStorage("productos", products)
        i += 1
    }
    number.innerHTML = list.length
    number.classList.add("numberDesign")
    return list
}

car.addEventListener("click", function(){
    body.style.overflow = "hidden"
    containerPurchase.classList.remove('none')
    containerPurchase.classList.add('containerPurchase')
    purchaseInformation.classList.add('purchaseInformation')
    mostrarElemtroslist()
})

function mostrarElemtroslist() {
    productsPurchase.innerHTML = ""
    totalValue = 0
    for (let i = 0; i < list.length; i++){
        productsPurchase.innerHTML += `<div><div class="img"><button onclick=eliminar(${i}) class="botonTrash"><img src="/img/trash.png"></button><p>${list[i].nombre}</p></div><p> $${list[i].precio}</p></div>`
        totalValue += parseInt(list[i].precio)
    }
    total.innerHTML = `<p>Valor Total</p> <p><span>$${totalValue}</span></p>`
}

function eliminar(indice){
    let van = true
    let i = 0
    while (van == true) {
        if (products[i].nombre == list[indice].nombre) {
            products[i].existencia += 1
            list.splice(indice, 1)
            van = false
        }
        i += 1
    }
    saveLocalStorage("productos", products)

    number.innerHTML = list.length
    if (list.length == 0){
        number.classList.remove("numberDesign")
    }
    
viewProducts()
    mostrarElemtroslist()
}

x.addEventListener("click", function(){
    body.style.overflow = "auto"
    containerPurchase.classList.add('none')
    containerPurchase.classList.remove('containerPurchase')
    purchaseInformation.classList.remove('purchaseInformation')
})