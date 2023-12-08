function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar))
}
function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}

let productos = obtenerAlmacenamientoLocal('productos') || [];
let mensaje = document.getElementById('mensaje')


const productAdd = document.getElementById('addProduct')
const priceAdd = document.getElementById('addPrice')
const stockAdd = document.getElementById('addStock')
const imgAdd = document.getElementById('addImg')

document.getElementById("addBtn").addEventListener("click", function (event) {
    event.preventDefault()
    let addProduct = productAdd.value
    let addPrice = priceAdd.value
    let addStock = stockAdd.value
    let addImg = imgAdd.value

    let van = true

    if (addProduct == '' || addPrice == '' || addStock == '' || addImg == '') {
        mensaje.classList.add('llenarCampos')
        setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500)
        van = false
    }
    else {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre == addProduct) {
                mensaje.classList.add('repetidoError')
                setTimeout(() => { mensaje.classList.remove('repetidoError') }, 2500)
                van = false
            }
        }
    }

    if (van == true) {
        productos.push({
            nombre: addProduct,
            valor: addPrice,
            existencia: addStock,
            urlImagen: addImg
        })
        mensaje.classList.add('realizado')
        setTimeout(() => {
            mensaje.classList.remove('repetidoError')
            window.location.reload()
        }, 1500)
    }
    guardarAlmacenamientoLocal('productos', productos);
})


const productSet = document.getElementById('setProduct')
const caracterSet = document.getElementById('setCaracter')
const caracterNew = document.getElementById('newCaracter')

document.getElementById("setBtn").addEventListener("click", function (event) {
    event.preventDefault()
    let setProduct = productSet.value
    let setCaracter = caracterSet.value
    let newCaracter = caracterNew.value
    let van = false
    if (setProduct == '' || setCaracter == '' || newCaracter == '') {
        mensaje.classList.add('llenarCampos')
        setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500)
    }
    else {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre == setProduct) {
                productos[i][setCaracter] = newCaracter
                van = true
            }
        }
        if (van == true) {
            mensaje.classList.add('realizado')
            setTimeout(() => {
                mensaje.classList.remove('realizado')
                window.location.reload()
            }, 1500);
        }
        else {
            mensaje.classList.add('noExisteError')
            setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
        }
        guardarAlmacenamientoLocal('productos', productos);
    }
})


const productDelete = document.getElementById('deleteProduct')

document.getElementById("deleteBtn").addEventListener("click", function (event) {
    event.preventDefault()
    let deleteProduct = productDelete.value
    let van = false

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre == deleteProduct) {
            productos.splice(i, 1)
            van = true
        }
    }

    if (van == false) {
        mensaje.classList.add('noExsiteError')
        setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
    }
    else {
        mensaje.classList.add('realizado')
        setTimeout(() => {
            mensaje.classList.remove('realizado')
            window.location.reload()
        }, 1500);
    }
    guardarAlmacenamientoLocal('productos', productos);
})


window.addEventListener("load", () => {
    const productSet = document.getElementById('setProduct')
    const productDeletel = document.getElementById('deleteProduct')
    for (let i = 0; i < productos.length; i++) {
        productSet.innerHTML += `<option>${productos[i].nombre}</option>`
        productDeletel.innerHTML += `<option>${productos[i].nombre}</option>`
    }
    Object.keys(productos[0]).forEach(element => {
        caracterSet.innerHTML += `<option>${element}</option>`
    });

    let mostraProductos = document.getElementById('mostrarProductos')
    mostraProductos.innerHTML = ''
    for (let i = 0; i < productos.length; i++) {
        mostraProductos.innerHTML += `<div class="contenedorProductos"><img src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio"><span>Precio: ${productos[i].valor}$</span></p> Existencia: ${productos[i].existencia}<p></p></div></div>`
    }
})

