products();

function products() {
  let productsTable = document.querySelector("#fill");
  let content = "";

  fetch("/api/v1/products")
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      console.log(data);
      JSON.parse(data).products.forEach(element => {
        content =
          content +
          `<tr>
            <td>${element._id}</td>
            <td>${element.name}</td>
            <td>${element.price}</td>
            <td>${element.stock}</td>
            <td>${element.likes}</td>
            <tr/>`;
      });
      productsTable.innerHTML = content;
    });
}

//datatable live search, sort
var urlUpdate = '';
var tabla = $("#myTable").DataTable({
    "ajax":{
        "url":"/api/v1/products",
        "method" : "GET",
        "dataSrc":"products"
    },
    columns:[
        {"data":"_id"},
        {"data":"name"},
        {"data":"price"},
        {"data":"stock"},
        {"data": "likes"},
    ]
});