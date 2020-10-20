                // ------------------------------------------//
                // ---------------- ESTRUCURA ---------------//
                // ---------------- BÁSICA DE ---------------//
                // ----------------- OBJETO -----------------//
                // ------------------------------------------//
class TodosLosProductos {
    constructor(identificador, nombre, precio, categoria, especificaciones, destacado) {
        this.identificador = identificador;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.especificaciones = especificaciones;
        this.destacado = destacado;
    };
};

                // --------------------------------------------//
                // ------------- VARIABLES GLOBALES -----------//
                // --------------------------------------------//
var cero = 0;
let productos = [];
var total = 0
                // --------------------------------------------//
                // ---------------- VARIABLES DE --------------//
                // --------------- ESTRUCTURA HTML ------------//
                // ------------------ ESTÁTICA ----------------//
                // --------------------------------------------//
let grid = $('<div class="grid col-md-10"></div>')
let grid_container = $('<div class="grid-container row d-flex"></div>')
let aside = $(
    '<aside class="col-md-2 d-flex flex-column">' +
    '</aside>'
);
let carrito = $(
    '<div class="carritoInner noMostrar">'+
        '<p class="precioTotal">Total: ' +
            '<span id="precioTotal">0</span>' +
        '</p>' + 
        '<a class="comprar btn btn-primary hidden">Ir al carrito</a>' +
    '</div>'
);
let noHayProductos = $('<p class="noHayProductos">Agregá productos a tu Carrito!</p>');
                // --------------------------------------------//
                // --------------- Filtro estatico ------------//
                // --------------------------------------------//
let categoriasCheckbox = $(
    '<hr>' +
    '<p>Categorias:</p>' +
    '<form onsubmit="return false" class="categoriasCheckbox">' +
        '<div class="d-flex justify-content-between align-items-center">' +
            '<input name="identificador" value="AMD_CPU" id="AMD_CPU" type="radio">' +
            '<label for="AMD_CPU">CPU AMD</label>' +
        '</div>' + 
        '<div class="d-flex justify-content-between align-items-center">' +
            '<input name="identificador" value="AMD_MOBO" id="AMD_MOBO" type="radio">' +
            '<label for="AMD_MOBO">Mother AMD</label>' +
        '</div>' + 
        '<div class="d-flex justify-content-between align-items-center">'+ 
            '<input name="identificador" value="Intel_CPU" id="Intel_CPU" type="radio">' +
            '<label for="Intel_CPU">CPU Intel</label>' +
        '</div>' +
        '<div class="d-flex justify-content-between align-items-center">' +
            '<input name="identificador" value="Intel_MOBO" id="Intel_MOBO" type="radio">' +
            '<label for="Intel_MOBO">Mother Intel</label>' +
        '</div>' + 
        '<div class="d-flex justify-content-between align-items-center">' +
            '<input name="identificador" value="GPU" id="GPU" type="radio">' +
            '<label for="GPU">Tarjeta Gráfica</label>' +
        '</div>' + 
        '<input class="btn btn-primary" type="submit" value="Aplicar">' +
    '</form>'
);
let precioRango = $(
    '<hr>' +
    '<p>Rango de precio</p>' +
    '<form onsubmit="return false" class="precioRange d-flex flex-column">'+
        '<label for="rangeSlider_inversed">Mínimo:</label>' +
        '<input id="rangeSlider_inversed" type="range" min="80" max="900" value="80"></input>' +
        '<output>80</output>' +
        '<label for="rangeSlider">Máximo:</label>' +
        '<input id="rangeSlider" type="range" min="80" max="900" value="900"></input>' +
        '<output>900</output>' +
        '<input class="btn btn-primary" type="submit" value="Aplicar">' +
    '</div>'
);
//DOCUMENT READY FUNCTION
$(() => {

    

    $('section').append(grid_container)
    $('.grid-container').append(aside)
    $('.grid-container').append(grid);
    $('.carrito').append(carrito)
                // --------------------------------------------//
                // ------------- Mostrar destacados -----------//
                // --------------------------------------------//
    for (const iterator of productos_data) {
        productos.push(new TodosLosProductos(iterator.identificador, iterator.nombre, iterator.precio, iterator.categoria, iterator.especificaciones))
        if (iterator.destacado === true) {
            crearEstructura(iterator, $('.grid'));
        };

    };
    $('.grid-container').prepend('<h3 class="col-md-12">Productos destacados</h3>');


                // ---------------------------------------------//
                // ---------------- FILTRO POR -----------------//
                // ---------------- CATEGORIA ------------------//
                // ---------------------------------------------//
    $('aside').append(categoriasCheckbox)
    $('aside').on('submit', 'form.categoriasCheckbox', (e) => { 
        $('.unProducto').remove()
        //
        
        for (const iterator of e.target) {
            
            if (iterator.checked === true) {
                let elValueCheckedSinGuion = iterator.value.replaceAll('_', ' ')
                let elValueCheckedMother = elValueCheckedSinGuion.replaceAll('MOBO', 'Tarjetas Madre').replaceAll('CPU', 'Micro Procesadores').replaceAll('GPU', 'Tarjetas Gráfica')
                $('.grid-container h3').html('Viendo: ' + elValueCheckedMother)
                let elValueChecked = iterator.value
                for (const producto of productos_data) {
                    let identificadoEnProducto = producto.identificador
                    if (identificadoEnProducto.indexOf(elValueChecked) > -1) {
                        crearEstructura(producto, $('.grid'))
                    }
                }
            }
        }
        
    });
                // ---------------------------------------------//
                // ---------------- FILTRO POR -----------------//
                // ---------------- RANGO DE  ------------------//
                // ---------------- PRECIO  --------------------//
                // ---------------------------------------------//
    $('aside').append(precioRango)
    $('aside').on('submit', 'form.precioRange', (e) => {
        console.log(e.target[2].value)
        console.log(e.target[0].value)
        for (const producto of $('.unProducto')) {
            let precioEnProducto = $(producto).children('div')[0].lastChild.innerHTML
            if (precioEnProducto > e.target[0].value && precioEnProducto < e.target[2].value) {

            } else {
                producto.remove()
            }
        }
    });
    //CAMBIAMOS EL VALOR DE OUTPUT PARA QUE CAMBIE CON EL CALUE 
    //DEL INPUT
    $('aside').on('input', '#rangeSlider', (e) => {
        e.target.nextElementSibling.value = e.target.value
    }); 
    $('aside').on('input', '#rangeSlider_inversed', (e) => {
        e.target.nextElementSibling.value = e.target.value
    }); 
                // ------------------------------------------//
                // ---------------- BUSCADOR ----------------//
                // ------------------------------------------//
    $('form.buscador').submit( (e) => { 
        //LO QUE INGRESA EL USUARIO
        let inputDeUsuario = e.target[0].value
        //LO QUE INGRESA EL USUARIO EN MAYUSCULA
        let iputEnMayuscula = inputDeUsuario.toUpperCase()
        //REFERENCIAS PARA CONDICIONAL 

        $('.unProducto').remove();
        $('.grid-container h3').remove();
        $('.grid-container').prepend('<h3 class="col-md-12">Resultados para: ' + inputDeUsuario + '</h3>');
        for (const iterator of productos_data) {
            let productoEnMayuscula = iterator.nombre.toUpperCase()

            if (productoEnMayuscula.indexOf(iputEnMayuscula) > -1) {

                crearEstructura(iterator, $('.grid'))
            } 
        }
        
    });
    //
    $('.carritoInner').prepend(noHayProductos)
                // --------------------------------------//
                // -------------- AGREGAR ---------------//
                // ------------- PRODUCTOS --------------//
                // ------------ AL CARRITO --------------//
                // --------------------------------------//

    $('.grid-container').on('click', '.unProducto a.agregar', function(e){
        $('.carritoInner p.noHayProductos').remove()
        cero++;
        let contador = $('#contador')
        //PRECIO EN EL PRODUCTO
        let precioP = e.currentTarget.nextSibling
        let precio = precioP.innerHTML
        //NOMBRE EN EL PRODUCTO
        let nombreP = e.currentTarget.parentElement.parentElement.firstChild
        let nombre = nombreP.innerHTML
        //CREAMOS LA NOTIFICACIÓN
        crearToast(nombre, precio, 'agregado', 'agregado al')
        //EVENTO PARA CERRAR LA NOTIFICACIÓN CON EL BOTON CERRAR EN LA MISMA
        botonCerrarToast()
        //MOSTRAMOS EL CONTADOR
        $(contador).addClass('mostrar');
        //LE CAMBIAMOS EL VALOR SEGÚN LAS VECES QUE HIZO CLICK 
        contador.html(cero)
        //GUARDAMOS LOS PRODUCTOS SELECCIONADOS EN EL LOCAL STORAGE
        for (const iterator of productos_data) {
            if (iterator.nombre === nombre) {
                sessionStorage.setItem('producto_' + cero, JSON.stringify({iterator}))
            }
        }
        //sessionStorage.setItem('producto_' + cero, JSON.stringify({nombre: nombre, precio: precio,}))
        //COMO EL NOMBRE DE LA FOTO ES IGUAL QUE EL NOMBRE DEL PRODUCTO PERO CON _ REMPLAZAMOS
        //ESPACIO POR _
        let productoImagen = nombre.replaceAll(' ', '_')
        //CREAMOS EL PRODUCTO EN EL CARRITO
        crearProductoEnCarrito(carrito, nombre, precio, productoImagen)
        //MOSTRAR BOTÓN COMPRAR
        $('a.comprar').removeClass('hidden')
        //MOSTRAR TOTAL EN CARRITO
        let totalString = $('span#precioTotal')[0].innerHTML
        var total = parseInt(totalString)
        let precioN = parseInt(precio)
        //console.log(total);
        var total = total + precioN
        $('span#precioTotal')[0].textContent = total
    });
                // ---------------------------------------//
                // -------------- QUITAR -----------------//
                // ------------- PRODUCTOS ---------------//
                // ------------ DEL CARRITO --------------//
                // ---------------------------------------//
    $('.carritoInner').on('click', 'a.quitar', (e) => {
        let nombre = e.target.previousSibling.firstChild.innerHTML
        let precio = e.target.previousSibling.lastChild.innerHTML
        //ANTES DE DISMINUIR CERO UTILIZAMOS SU VALOR PARA 
        //REMOVER LOS PRODUCTOS EN SESSION STORAGE
        sessionStorage.removeItem('producto_' + cero)
        //AGARRAMOS EL CONTADOR
        let contador = $('#contador')
        //DISMINUIMOS CERO 
        cero--
        //PASAMOS 0 AL CONTADOR
        contador.html(cero)
        //REMOVEMOS EL PRODUCTO
        e.target.parentElement.remove()
        //CUANDO NO HAY PRODUCTOS EN EL CARRITO
        if (cero === 0) {
            $(contador).removeClass('mostrar');
            $('.carritoInner').prepend(noHayProductos)
        }

        crearToast(nombre, precio, 'removido', 'removido del')
        botonCerrarToast()
        let totalString = $('span#precioTotal')[0].innerHTML
        var total = parseInt(totalString)
        let precioN = parseInt(precio)
        //var total = total - precioN
/*         console.log(precioN);
        console.log(total - precioN);
        console.log(totalString); */
        $('span#precioTotal')[0].textContent = total - precioN
        $('a.comprar').addClass('hidden')
    });
    

                // --------------------------------------//
                // ------------- MOSTRAR Y --------------//
                // ------------- OCULTAR ----------------//
                // ------------- EL CARRITO -------------//
                // --------------------------------------//

    $('.carrito').on('click', 'img', (e) => { 
        $('.carritoInner').toggleClass('noMostrar');
        e.stopPropagation();
    });
    //PREVIENE QUE EL CARRITO SE CIERRE CUANDO SE HACE CLIC EN
    //DENTRO DEL CARRITO DESPLEGADO
    $('.carritoInner').click((e) => {e.stopPropagation();})
    //CIERRA EL CARRITO CUANDO SE HACE CLIC AFUERA DEL CARRITO
    $('body').click((e) => {
        
        let carrito = $('.carritoInner');
        if (carrito.hasClass('noMostrar') ) {
            //nada
        } else {
            $('.carritoInner').toggleClass('noMostrar');
        }
        e.stopPropagation();
    })


});

                // ------------------------------------------//
                // ---------------- FUNCIONES ---------------//
                // ------------------------------------------//

//CREA UNA ESTRUCTURA BÁSICA DE UN PRODUCTO, LOS PARAMETROS SON
//• EL LUGAR DONDE VA A SER INSERTADA
//• EL NOMBRE DEL PRODUCTO
//• EL PRECIO
let crearEstructura =  (producto, donde) => {
    //TOMAMOS EL NOMBRE Y LE SACAMOS LOS ESPACIOS PARA USARLO EN EL SRC DE LA FOTO
    let nombreParaFoto = producto.nombre.replaceAll(' ', '_')
    //ESTRUCTURA BASICA DE PRODUCTO
    let estructuraBasica = $(
        '<div class="unProducto fadeIn ' + producto.identificador + '">' + 
            '<p>' + producto.nombre + '</p>' +
            '<img class="imgResponsive" src="img/productos/' + nombreParaFoto + '.jpg" >' +
            '<div class="d-flex justify-content-between align-items-center">' +
                '<a class="btn btn-primary agregar">Agregar</a>' +
                '<p class="precio">' + producto.precio + '</p>' +
            '</div>' +
        '</div>'
    )
    $(donde).append(estructuraBasica);
    //
    $('.unProducto').each(function(i, el) { 
        $(el).delay(100*i).queue(function() {
            $(this).addClass('faded').dequeue();
        });
    });
    
    
    
}

//CREA UNA NUEVA NOTIFICACIÓN CADA VEZ QUE EL USUARIO AGREGA UN PRODUCTO AL CARRITO
//INSERTA LA NOTIFICACIÓN Y LUEGO DE 5 SEGUNDOS LE AGREGAMOS LA CLASE HIDE QUE LE CAMBIA 
//LA OPACIDAD DE 1 A 0 PARA LUEGO DE 1 SEGUNDO DE ESO ELIMINARLO (ESTO LE DA UN EFECTO DE TRANSICIÓN)
//COMO PARAMENTROS LE PASAMOS EL NOMBRE DEL PRODUCTO AGREGADO Y EL PRECIO
let crearToast = (nombre, precio, clase, texto) => {
    //CHEQUIEMOS SI EL CARRITO ESTA ABIERTO (DISPARA SOLO CUANDO SACAMOS COSAS DEL CARRITO)
    let nuevoToast = $(
        '<div class="toast d-flex flex-column justify-self-end ' + clase + '">' + 
            '<div class="toastInner">' +
                '<p>Producto ' + texto + ' carrito: </p>' +
                '<p>' + nombre + '</p>' +
                '<p>' + precio + '</p>' +
            '</div>' +
            '<div class="close">' +
                '<a>Cerrar</a>' +
            '</div>' +
        '</div>'
        )
    //$(nuevoToast).hide().appendTo('.toastContainer').slideDown()
    $('.toastContainer').append(nuevoToast);
    //LAS NOTIFICACIONES DESAPARECEN LUEGO DE 6 SEGUNDOS
    setTimeout(function(){ 
        $(nuevoToast).addClass('hide');
        setTimeout(function(){
            $(nuevoToast).remove()
        }, 1000);
    }, 5000);
}


let crearProductoEnCarrito = (donde, nombre, precio, imagen) => {
    let nuevoProductoEnCarrito = $(
        '<div class="d-flex flex-row carrito-item justify-content-between">' +
            '<img src="img/productos/' + imagen + '.jpg" >' +
            '<div>' +
                '<p class="carritoNombre">' + nombre + '</p>' +
                '<p class="carritoPrecio">' + precio + '</p>' +
            '</div>' +
            '<a class="btn btn-danger quitar">-</a>' +
        '</div>'
    );
    $(donde).prepend(nuevoProductoEnCarrito);
}

let botonCerrarToast = () => {
    $('.toast a').click(function (e) { 
        $(this).parent().parent().addClass('hide')
        setTimeout(function(){ 
            $(e.target.parentElement.parentElement).remove()
        }, 1000)
    });
}


