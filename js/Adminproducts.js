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
            <tr>
            <td>${product.title}</td>
            <td>${product.category}</td> 
            <td>${product.description}</td> 
            <td>${product.price}</td> 
            <td>${product.stock}</td> 
            <td>${formatedDate}</td> 
            <td><a href="update.html?id=${product._id}">Update</a> |
            <a class="delete-link" data-id="${product['_id']}" href="#">Delete</a> 
            </td>
            </tr>
            `
            
    }

    document.getElementById('container').innerHTML = productHTML;
  } catch (error) {
    console.log(error);
  }
  deleteProduct();
}

function deleteProduct() {
  let deleteLinks = document.getElementsByClassName('delete-link');
  console.log(deleteLinks);

  for (let link of deleteLinks) {
    link.addEventListener('click', async function (e) {
      e.preventDefault();

      try {
        await fetch('http://localhost:5000/products/' + e.target.dataset.id,
          {
            method: 'DELETE'
          }
        );

        e.target.parentNode.parentNode.remove();
      } catch (error) {
        console.log(error)
      }
    })
  }
}