products();

function products() {
  let productsTable = document.querySelector("#fill");
  let content = "";

  fetch("/api/v1/products?page=1&limit=10")
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
