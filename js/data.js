var productos_data = []

let productosAjaxCall = () => {
    return $.ajax({
        type: 'GET',
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
            setTimeout(()=>{
                $('#loader').addClass('hidden')
            }, 300)
            
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
                //console.log('cargo')
                dolar_Json.push(iterator)
            }
        },
        
    });
}
