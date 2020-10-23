var productos_data = []

let productosAjaxCall = () => {
    return $.ajax({
        url: "data/productos.json",
        dataType: "json",
        success: function (response) {
            //console.log(response);
            for (const iterator of response) {
                productos_data.push(iterator)
            }
        }
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
                //console.log('cargo')
                dolar_Json.push(iterator)
            }
        },
        
    });
}
/* 
$.ajax({
    url: "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
    dataType: "json",
    success: function (response) {
        for (const iterator of response) {
            console.log('cargo')
            dolar_Json.push(iterator)
        }
    },
    error: console.log('cargando')
}); */

