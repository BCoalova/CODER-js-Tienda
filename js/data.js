var productos_data = []

$.ajax({
    url: "data/productos.json",
    dataType: "json",
    success: function (response) {
        console.log(response);
        for (const iterator of response) {
            productos_data.push(iterator)
        }
    }
});