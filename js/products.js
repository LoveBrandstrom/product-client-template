window.onload = function() {
    fetchAllProducts();
}

async function fetchAllProducts() {
  try {
    let response = await fetch('http://localhost:5000/products');
    let products = await response.json();
    console.log(products);

    let productHTML = '';
    for (let product of products) {
      let productDate = new Date(product.date);
      let formatedDate = `${productDate.getFullYear()}-${productDate.getMonth() + 1}-${productDate.getDate()} ${productDate.getHours()}:${productDate.getMinutes()}`

      console.log(product['_id'])
      productHTML += `
                <div class="product-item">
                  <h3>${product.title}</h3>
                  <p>${product.category}</p>
                  <p>${product.description}</p>
                  <p>${product.price}</p>
                  <p>${product.stock}</p>
                </div>
            `;
    }

    document.getElementById('container').innerHTML = productHTML;
  } catch (error) {
    console.log(error);
  }
}
