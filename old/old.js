

//CONTENEDOR PRINCIPAL
let contenedor = $('#mis_contenedo');

//BOTÓN PARA EMPEZAR
let empecemosBtn = $('<a class="btn btn-outline-primary btn-lg">Empecemos</a>');


let carrito = $(
    '<div class="carrito d-flex flex-row">' + 
        '<div class="carritoProductos">' +
            
        '</div>' +
        '<div class="carritoPrecio>' +
            
        '</div>' +
    '</div>'
    )


let grid = $('<div class="grid"></div>')

//BOOTSTRAP BREADCRUMBS
let breadCrumbs = $(
    '<nav class="breadcrumb-nav" aria-label="breadcrumb">' +
        '<ol class="breadcrumb">' +
            '<li class="breadcrumb-item"><a href="index.html">Inicio</a></li>' +
            
        '</ol>' +
    '</nav>' 
)

//BOTONES PARA SELECCIONAR UN FABRICANTE: AMD O INTEL
let amdOrIntelBtn = $(
    '<div class="row justify-content-center align-items-center">' + 
        '<div class="col-md-6 amdBtn">' +
            '<a class="btn btn-primary d-flex justify-content-center align-items-center amdBtn">' + 
                '<img class="w-50" src="img/AMD-01.svg">' + 
            '</a>' + 
        '</div>' +
        '<div class="col-md-6 intelBtn">' +
            '<a class="btn btn-primary d-flex justify-content-center align-items-center intelBtn">' + 
                '<img class="w-50" src="img/Intel-01.svg">' + 
            '</a>' + 
        '</div>' +
    '</div>'
    );

//INSERTAMOS EL BOTÓN PARA ARRANCAR
$(contenedor).append(empecemosBtn);


//CUANDO CARGA EL DOM
$(document).ready( () => {

    //ESCUCHAMOS POR EL EVENTO CLICK EN EL BOTÓN "EMPECEMOS"
    $(empecemosBtn).click( (e) => { 
        //SACAMOS LA CLASE BG PARA NO TENER MÁS EL FONDO
        $('body').removeClass('bg');
        //REMOVEMOS EL BOTÓN PRINCIPAL
        $(empecemosBtn).remove();
        //INSERTAMOS LOS BOTONES PARA ELEGIR FABRICANTE
        $(contenedor).append(amdOrIntelBtn);

        //ESCUCHAMOS EL EVENTO CLICK Y PARA CADA BOTÓN VAMOS A MOSTRAR UN LISTADO DE 
        //MOTHERS COMPATIBLES CON EL FABRINCATE
        //CASO AMD
        $('.amdBtn').click(function (e) { 
            //TITULO DE LA SECCION
            moboTitulo = $(
                '<h2>Primero elegí una tarjeta madre</h2>'
            );
            //REMOVEMOS E INSERTAMOS EL NUEVO CONTENIDO
            $(amdOrIntelBtn).remove();
            $(contenedor).addClass('flex-column');
            //INSERTAMOS LAS BREADCRUMSB
            $(contenedor).append(breadCrumbs);
            //COMO ELIGIÓ AMD CREAMOS UN NUEVO HIJO DE ESA BREADCRUMB CON EL TEXTO AMD
            crearNuevoBreadcrumb('AMD')
            //INSERTAMOS EL TITULO
            $(contenedor).append(moboTitulo);
            //INSERTAMOS LA GRILLA
            $(contenedor).append(grid);
            //PARA CADA MOBO EN NUESTRO JSON CREAMOS UN ELEMENTO
            for (const iterator of productos_MOBO_AMD) {
                //LLAMAMOS A LA FUNCION CREAR ESTRUCTURA, COMO LA VAMOS A UTILIZAR 
                //PARA CADA PASO CREAMOS UNA FUNCIÓN QUE REUTILIZAREMOS PARA 
                //TODOS LOS COMPONENTES
                crearEstructura(grid, iterator.producto, iterator.precio, 'mobos_AMD')
            }
            //ACCEDEMOS AL DOM Y TOMAMOS TODOS LOS PRODUCTOS
            let todosDivsUnProducto = document.querySelectorAll('.unProducto')
            //SOBRE ESOS PRODUCTOS VAMOS A ITERAR Y DENTRO DE CADA PRODUCTO ESCUCHAMOS
            //AL EVENTO CLICK EN EL BOTÓN
            for (const iterator of todosDivsUnProducto) {
                //EL BOTON SE ENCUENTRA EN UN DIV QUE ES EL TERCER INDICE DEL ARRAY
                //Y DENTRO DE ESE DIV EL BOTON EN SÍ ES EL PRIMER INDICE
                let botonesEnProducto = iterator.children[2].children[0]
                let nombreEnProducto = iterator.children[0].innerHTML
                $(botonesEnProducto).click(function (e) { 
                    localStorage.setItem('mobo', nombreEnProducto)
                    cpuTitulo = $(
                        '<h2>Ahora elegí un Micro Procesador</h2>'
                    );
                    //
                    
                    
                    //INSERTAMOS LAS BREADCRUMBS
                    //UNA POR LO QUE ACABA DE SELECCIONAR
                    crearNuevoBreadcrumb(nombreEnProducto)
                    //OTRA QUE ES SOBRE PÁGINA EN LA QUE ESTÁ
                    crearNuevoBreadcrumb('Elegí un Micro Procesador')


                    $(moboTitulo).remove();
                    $('.unProducto').remove();
                    $(contenedor).append(cpuTitulo);
                    $(contenedor).append(grid);

                    for (const iterator of productos_CPU_AMD) {
                        //LLAMAMOS A LA FUNCION CREAR ESTRUCTURA, COMO LA VAMOS A UTILIZAR 
                        //PARA CADA PASO CREAMOS UNA FUNCIÓN QUE REUTILIZAREMOS PARA 
                        //TODOS LOS COMPONENTES
                        crearEstructura(grid, iterator.producto, iterator.precio, 'CPU_AMD')
                    }

                    
                    
                });

            }

        });
        //CASO INTEL
        $('.intelBtn').click(function (e) { 
            //TITULO DE LA SECCION
            moboTitulo = $(
                '<h2>Primero elegí una tarjeta madre (NO HAY MOTHER COMPATIBLES CON INTEL EN JSON)</h2>'
            );
            //REMOVEMOS E INSERTAMOS EL NUEVO CONTENIDO
            $(amdOrIntelBtn).remove();
            //INSERTAMOS
            $(contenedor).addClass('flex-column');
            $(contenedor).append(breadCrumbs);
            $('.breadcrumb-item.active').text('Intel');
            $(contenedor).append(moboTitulo);
            $(contenedor).append(grid);

            
        });
    });
});


//FUNCIONES
let crearEstructura =  (donde, nombre, precio, urlFotos) => {
    //TOMAMOS EL NOMBRE Y LE SACAMOS LOS ESPACIOS PARA USARLO EN EL SRC DE LA FOTO
    let nombreParaFoto = nombre.replaceAll(' ', '_')
    //ESTRUCTURA BASICA DE PRODUCTO
    let estructuraBasica = $(
        '<div class="unProducto">' + 
            '<p>' + nombre + '</p>' +
            '<img class="imgResponsive" src="img/' + urlFotos + '/' + nombreParaFoto + '.jpg" >' +
            '<div class="d-flex justify-content-between align-items-center">' +
                '<a class="btn btn-primary">Agregar</a>' +
                '<p class="precio">' + precio + '</p>' +
            '</div>' +
        '</div>'
    )
    $(donde).append(estructuraBasica);
}

let crearNuevoBreadcrumb = (textoBreadcrumb) => { 
    $('.bradcrumbs-item.active').removeAttr('aria-current', 'page');
    $('.bradcrumbs-item.active').removeClass('active');
    let elBreadcrumb = $('<li class="breadcrumb-item active" aria-current="page">' + textoBreadcrumb + '</li>') 
    $('.breadcrumb').append(elBreadcrumb);
}



let productos_MOBO_Intel = [
    {
        "identificador" : "Intel_MOBO_1",
        "producto": "ASUS ROG Rampage VI Extreme Encore",
        "chipset": "Intel X299",
        "precio": 749,
        "socket": "LGA 2066",
        "size": "ATX",
    },
    { "identificador" : "Intel_MOBO_2", "producto": "ASUS Prime X299-A II",             "chipset": "X299", "precio": 299, "socket": "LGA 2066",             "size": "ATX",},
    { "identificador" : "Intel_MOBO_3", "producto": "ASUS Prime X299 Edition 30",       "chipset": "X299", "precio": 749, "socket": "LGA 2066",             "size": "ATX",},
    { "identificador" : "Intel_MOBO_4", "producto": "ASUS Prime Z390M-PLUS",            "chipset": "Z390", "precio": 241, "socket": "LGA 1151 (Socket H4)", "size": "mATX",},
    { "identificador" : "Intel_MOBO_5", "producto": "ASUS ROG MAXIMUS XI HERO",         "chipset": "Z390", "precio": 289, "socket": "LGA 1151 (Socket H4)", "size": "ATX",},
    { "identificador" : "Intel_MOBO_6", "producto": "ASUS ROG Maximus XI Code",         "chipset": "Z390", "precio": 385, "socket": "LGA 1151 (Socket H4)", "size": "ATX",},
    { "identificador" : "Intel_MOBO_7", "producto": "ASUS PRIME Z390-P",                "chipset": "Z390", "precio": 121, "socket": "LGA 1151 (Socket H4)", "size": "ATX",},
    { "identificador" : "Intel_MOBO_8", "producto": "ASUS Prime Z370-P II",             "chipset": "Z370", "precio": 114, "socket": "LGA 1151 (Socket H4)", "size": "ATX",},
    { "identificador" : "Intel_MOBO_9", "producto": "ASUS ROG STRIX Z390-E GAMING",     "chipset": "Z390", "precio": 199, "socket": "LGA 1151 (Socket H4)", "size": "ATX",},
    { "identificador" : "Intel_MOBO_10", "producto": "ASUS ROG STRIX H370-I GAMING",    "chipset": "H370", "precio": 184, "socket": "LGA 1151 (Socket H4)", "size": "mITX",},
    { "identificador" : "Intel_MOBO_11", "producto": "ASUS ROG Maximus X Formula",      "chipset": "Z370", "precio": 455, "socket": "LGA 1151 (Socket H4)", "size": "ATX",},
    { "identificador" : "Intel_MOBO_12", "producto": "ASUS ROG STRIX Z370-I GAMING",    "chipset": "Z370", "precio": 199, "socket": "LGA 1151 (Socket H4)", "size": "mATX",},
]

let producto_CPU_Intel = [
    {
        "identificador": "Intel_CPU_1", 
        "producto": "Intel Core i9-7980XE", 
        "precio": 817, 
        "Categoria": "CPU" , 
        "Cores": 4 , 
        "Threads": 4 , 
        "Socket": "LGA 2066" ,
        "Memory Suported": "DDR4-2400" , 
        "Consumo": "165W" , 
        "based": "7Gen", 
    },
{"identificador": "Intel_CPU_1", "producto": "Intel Core i7-7700", "precio": 357, "Categoria": "CPU" , "Cores": 4 , "Threads": 8 , "Socket": "LGA 1151" ,"Memory Suported": "DDR4-2133" , "Consumo": "65W" , "based": "7Gen", },
{"identificador": "Intel_CPU_2", "producto": "Intel Core i5-7640X", "precio": 319, "Categoria": "CPU" , "Cores": 4 , "Threads": 4 , "Socket": "LGA 2066" ,"Memory Suported": "DDR4-2666" , "Consumo": "112W" , "based": "7Gen", },
{"identificador": "Intel_CPU_3", "producto": "Intel Core i3-7350K", "precio": 299, "Categoria": "CPU" , "Cores": 2 , "Threads": 4 , "Socket": "LGA 2066" ,"Memory Suported": "DDR4-2133" , "Consumo": "130W" , "based": "7Gen", },
{"identificador": "Intel_CPU_4", "producto": "Intel Core i9-9900K", "precio": 379, "Categoria": "CPU" , "Cores": 8 , "Threads": 16 , "Socket": "LGA 1151" ,"Memory Suported": "DDR4-2666" , "Consumo": "95W" , "based": "9Gen", },
{"identificador": "Intel_CPU_5", "producto": "Intel Core i7-9700K", "precio": 299, "Categoria": "CPU" , "Cores": 8 , "Threads": 8 , "Socket": "LGA 1151" ,"Memory Suported": "DDR4-2666" , "Consumo": "95W" , "based": "9Gen", },
{"identificador": "Intel_CPU_6", "producto": "Intel Core i5-9600K", "precio": 242, "Categoria": "CPU" , "Cores": 6 , "Threads": 6 , "Socket": "LGA 1151" ,"Memory Suported": "DDR4-2666" , "Consumo": "95W" , "based": "9Gen", },
{"identificador": "Intel_CPU_7", "producto": "Intel Core i3-9350KF", "precio": 219, "Categoria": "CPU" , "Cores": 4 , "Threads": 4 , "Socket": "LGA 1151" ,"Memory Suported": "DDR4-2400" , "Consumo": "130W" , "based": "9Gen", },
{"identificador": "Intel_CPU_8", "producto": "Intel Core i7-8700K", "precio": 305, "Categoria": "CPU" , "Cores": 6 , "Threads": 12 , "Socket": "LGA 1151" ,"Memory Suported": "DDR4-2666" , "Consumo": "130W" , "based": "8Gen", },
{"identificador": "Intel_CPU_9", "producto": "Intel Core i5-8600K", "precio": 290, "Categoria": "CPU" , "Cores": 6 , "Threads": 6 , "Socket": "LGA 1151" ,"Memory Suported": "DDR4-2666" , "Consumo": "130W" , "based": "8Gen", },
{"identificador": "Intel_CPU_10", "producto": "Intel Core i3-8350K", "precio": 290, "Categoria": "CPU" , "Cores": 4 , "Threads": 4 , "Socket": "LGA 1151" ,"Memory Suported": "DDR4-2400" , "Consumo": "130W" , "based": "8Gen", },
{"identificador": "Intel_CPU_11", "producto": "Intel_Core_i7-10700k", "precio": 426, "Categoria": "CPU" , "Cores": 8 , "Threads": 16 , "Socket": "LGA 1200" ,"Memory Suported": "DDR4-2933" , "Consumo": "95W" , "based": "10Gen", },
]


let productos_CPU_AMD = [
    {
        "identificador": "AMD_CPU_1", 
        "producto": "Ryzen 3 1200", 
        "precio": 109 , 
        "Categoria": "CPU" , 
        "Cores": 4 , 
        "Threads": 4 , 
        "Socket": "AM4" ,
        "Memory Suported": "DDR4-2667" , 
        "Consumo": "65W" , 
        "based": "Zen", 
    },
    { "identificador": "AMD_CPU_2", "producto": "Ryzen 3 1300X", "precio": 129 , "Categoria": "CPU" , "Cores": 4 , "Threads": 4 , "Socket": "AM4" , "Memory Suported": "DDR4-2667" , "Consumo": "65W" , "based": "Zen" },
    { "identificador": "AMD_CPU_3", "producto": "Ryzen 5 1400", "precio": 169 , "Categoria": "CPU" , "Cores": 4 , "Threads": 8 , "Socket": "AM4" , "Memory Suported": "DDR4-2667" , "Consumo": "65W" , "based": "Zen" },
    { "identificador": "AMD_CPU_4", "producto": "Ryzen 5 1500X", "precio": 189 , "Categoria": "CPU" , "Cores": 4 , "Threads": 8 , "Socket": "AM4" , "Memory Suported": "DDR4-2667" , "Consumo": "65W" , "based": "Zen" },
    { "identificador": "AMD_CPU_5", "producto": "Ryzen 5 1600", "precio": 219 , "Categoria": "CPU" , "Cores": 6 , "Threads": 12 , "Socket": "AM4" , "Memory Suported": "DDR4-2667" , "Consumo": "65W" , "based": "Zen" },
    { "identificador": "AMD_CPU_6", "producto": "Ryzen 5 1600X", "precio": 219 , "Categoria": "CPU" , "Cores": 6 , "Threads": 12 , "Socket": "AM4" , "Memory Suported": "DDR4-2667" , "Consumo": "95W" , "based": "Zen" },
    { "identificador": "AMD_CPU_7", "producto": "Ryzen 7 1700", "precio": 329 , "Categoria": "CPU" , "Cores": 8 , "Threads": 16 , "Socket": "AM4" , "Memory Suported": "DDR4-2667" , "Consumo": "65W" , "based": "Zen" },
    { "identificador": "AMD_CPU_8", "producto": "Ryzen 7 1700X", "precio": 399 , "Categoria": "CPU" , "Cores": 8 , "Threads": 16 , "Socket": "AM4" , "Memory Suported": "DDR4-2667" , "Consumo": "95W" , "based": "Zen" },
    { "identificador": "AMD_CPU_9", "producto": "Ryzen 7 1800X", "precio": 499 , "Categoria": "CPU" , "Cores": 8 , "Threads": 16 , "Socket": "AM4" , "Memory Suported": "DDR4-2667" , "Consumo": "95W" , "based": "Zen" },
    { "identificador": "AMD_CPU_13", "producto": "Ryzen 3 1200 AF", "precio": 60 , "Categoria": "CPU" , "Cores": 4 , "Threads": 4 , "Socket": "AM4" , "Memory Suported": "DDR4-2933" , "Consumo": "65W" , "based": "Zen +" },
    { "identificador": "AMD_CPU_14", "producto": "Ryzen 5 1600 AF", "precio": 85 , "Categoria": "CPU" , "Cores": 6 , "Threads": 12 , "Socket": "AM4" , "Memory Suported": "DDR4-2933" , "Consumo": "65W" , "based": "Zen +" },
    { "identificador": "AMD_CPU_15", "producto": "Ryzen 5 2600X", "precio": 222 , "Categoria": "CPU" , "Cores": 6 , "Threads": 12 , "Socket": "AM4" , "Memory Suported": "DDR4-2933" , "Consumo": "95W" , "based": "Zen +" },
    { "identificador": "AMD_CPU_16", "producto": "Ryzen 7 2700", "precio": 286 , "Categoria": "CPU" , "Cores": 8 , "Threads": 16 , "Socket": "AM4" , "Memory Suported": "DDR4-2933" , "Consumo": "65W" , "based": "Zen +" },
    { "identificador": "AMD_CPU_17", "producto": "Ryzen 7 2700X", "precio": 329 , "Categoria": "CPU" , "Cores": 8 , "Threads": 16 , "Socket": "AM4" , "Memory Suported": "DDR4-2933" , "Consumo": "105W" , "based": "Zen +" },
    { "identificador": "AMD_CPU_21", "producto": "Ryzen 3 3100", "precio": 99 , "Categoria": "CPU" , "Cores": 4 , "Threads": 8 , "Socket": "AM4" , "Memory Suported": "DDR4-3200" , "Consumo": "65W" , "based": "Zen 2" },
    { "identificador": "AMD_CPU_21", "producto": "Ryzen 3 3300X", "precio": 120 , "Categoria": "CPU" , "Cores": 4 , "Threads": 8 , "Socket": "AM4" , "Memory Suported": "DDR4-3200" , "Consumo": "65W" , "based": "Zen 2" },
    { "identificador": "AMD_CPU_22", "producto": "Ryzen 5 3600", "precio": 199 , "Categoria": "CPU" , "Cores": 6 , "Threads": 12 , "Socket": "AM4" , "Memory Suported": "DDR4-3200" , "Consumo": "65W" , "based": "Zen 2" },
    { "identificador": "AMD_CPU_23", "producto": "Ryzen 5 3600X", "precio": 249 , "Categoria": "CPU" , "Cores": 6 , "Threads": 12 , "Socket": "AM4" , "Memory Suported": "DDR4-3200" , "Consumo": "95W" , "based": "Zen 2" },
    { "identificador": "AMD_CPU_24", "producto": "Ryzen 5 3600XT", "precio": 249 , "Categoria": "CPU" , "Cores": 6 , "Threads": 12 , "Socket": "AM4" , "Memory Suported": "DDR4-3200" , "Consumo": "95W" , "based": "Zen 2" },
    { "identificador": "AMD_CPU_25", "producto": "Ryzen 7 3700X", "precio": 329 , "Categoria": "CPU" , "Cores": 8 , "Threads": 16 , "Socket": "AM4" , "Memory Suported": "DDR4-3200" , "Consumo": "65W" , "based": "Zen 2" },
    { "identificador": "AMD_CPU_26", "producto": "Ryzen 7 3800X", "precio": 399 , "Categoria": "CPU" , "Cores": 8 , "Threads": 16 , "Socket": "AM4" , "Memory Suported": "DDR4-3200" , "Consumo": "105W" , "based": "Zen 2" },
    { "identificador": "AMD_CPU_27", "producto": "Ryzen 7 3800XT", "precio": 399 , "Categoria": "CPU" , "Cores": 8 , "Threads": 16 , "Socket": "AM4" , "Memory Suported": "DDR4-3200" , "Consumo": "105W" , "based": "Zen 2" },
    { "identificador": "AMD_CPU_28", "producto": "Ryzen 9 3900X", "precio": 499 , "Categoria": "CPU" , "Cores": 12 , "Threads": 24 , "Socket": "AM4" , "Memory Suported": "DDR4-3200" , "Consumo": "105W" , "based": "Zen 2" },
    { "identificador": "AMD_CPU_29", "producto": "Ryzen 9 3900XT", "precio": 499 , "Categoria": "CPU" , "Cores": 12 , "Threads": 24 , "Socket": "AM4" , "Memory Suported": "DDR4-3200" , "Consumo": "105W" , "based": "Zen 2" },
]

let productos_MOBO_AMD = [
    {
        "identificador": "AMD_MOBO_1", 
        "producto": "Prime A520M-A", 
        "chipset" : "A520", 
        "precio": 80, 
        "socket": "AM4", 
        "size": "mATX"
    },
    {"identificador": "AMD_MOBO_2", "producto": "Prime B350-Plus",                  "chipset" : "B350", "precio": 98,  "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_3", "producto": "Prime B450-Plus",                  "chipset" : "B450", "precio": 109, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_4", "producto": "Prime B550M-K",                    "chipset" : "B550", "precio": 122, "socket": "AM4", "size": "mATX"   },
    {"identificador": "AMD_MOBO_5", "producto": "Prime X370-Pro",                   "chipset" : "X370", "precio": 120, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_6", "producto": "Prime X470-Pro",                  "chipset" : "X370", "precio": 125, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_7", "producto": "Prime X570-P",                    "chipset" : "X570", "precio": 130, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_8", "producto": "Prime X570-Pro",                  "chipset" : "X570", "precio": 136, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_9", "producto": "ROG Crosshair VII Hero",          "chipset" : "X470", "precio": 320, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_10", "producto": "ROG Crosshair VIII Hero",         "chipset" : "X570", "precio": 359, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_11", "producto": "ROG Strix B450-F Gaming",         "chipset" : "B450", "precio": 189, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_12", "producto": "ROG Strix B550-F GAMING",         "chipset" : "B550", "precio": 203, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_13", "producto": "ROG Strix X470-F Gaming",         "chipset" : "X470", "precio": 273, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_14", "producto": "ROG Strix X570-F Gaming",         "chipset" : "X570", "precio": 299, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_15", "producto": "TUF B450-Plus Gaming",            "chipset" : "B450", "precio": 109, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_16", "producto": "TUF GAMING A520M-PLUS",           "chipset" : "A520", "precio": 161, "socket": "AM4", "size": "mATX"   },
    {"identificador": "AMD_MOBO_17", "producto": "TUF Gaming B550-Plus",            "chipset" : "B550", "precio": 159, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_18", "producto": "TUF Gaming X570-Plus",            "chipset" : "X570", "precio": 161, "socket": "AM4", "size": "ATX"    },
    {"identificador": "AMD_MOBO_19", "producto": "TUF X470-Plus Gaming",            "chipset" : "X470", "precio": 169, "socket": "AM4", "size": "ATX"    },
]

