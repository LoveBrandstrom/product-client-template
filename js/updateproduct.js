window.onload = function() {
    let queryString = location.search;
    console.log(queryString);
    let urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get('id'));
    getProduct(urlParams.get('id'));
    updateProductEvent(urlParams.get('id'))
}

async function getProduct(id) {
    try {
        let response = await fetch('http://localhost:5000/products/' + id);
        let product = await response.json();

        document.getElementById('title-textarea').value = product.title;
        document.getElementById('description-textarea').value = product.description;
        document.getElementById('price-textarea').value = product.price;
        document.getElementById('stock-textarea').value = product.stock;
        document.getElementById('category-textarea').value = product.category;
    } catch(error) {
        console.log(error);
    }
}

function updateProductEvent(id) {
    let form = document.getElementById('update-product-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        let formData = new FormData(form);
        formDataObject = {
            "title": formData.get('title'),
            "description": formData.get('description'),
            "price": formData.get('price'),
            "stock": formData.get('stock'),
            "category": formData.get('category')
        }

        try {
            await fetch('http://localhost:5000/products/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject)
            })

            location.replace('admin.html');
          
        } catch(error) {
            console.log(error);
        }
    })

}