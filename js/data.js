                // ------------------------------------------//
                // ---------------- CARGA -------------------//
                // ------------------ DE --------------------//
                // --------------- PRODUCTOS ----------------//
                // ------------------------------------------//

var productos_data = []

let productosAjaxCall = () => {
    return $.ajax({
        type: 'GET',
        //ANTES DE ENVIAR LE SACAMOS LA CLASE HIDDEN A LA ANIMACION DE CARGA
        beforeSend: function () { 
            $('#loader').removeClass('hidden')
        },
        url: "data/productos.json",
        dataType: "json",
        success: function (response) {
            for (const iterator of response) {
                productos_data.push(iterator)
            }
        },
        complete: function () { 
            //SE LE AGREGA UN POCO DE RETRASO PARA QUE SE VEA LA ANIMACIÓN
            $('#loader').addClass('hidden')
            
        },
    });
}



                // --------------------------------------//
                // --------------- VALOR ----------------//
                // ---------------- DEL -----------------//
                // --------------- DOLAR ----------------//
                // --------------------------------------//


let dolar_Json = []

let dolarAjaxCall = () => {
    return $.ajax({
        url: "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
        dataType: "json",
        success: function (response) {
            for (const iterator of response) {
                dolar_Json.push(iterator)
            }
        },
        
    });
}
