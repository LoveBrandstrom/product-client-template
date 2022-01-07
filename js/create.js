window.onload = function() {
    createProduct();
}

function createProduct() {
    let form = document.getElementById('create-product-form');
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
            await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject),
            })
            location.assign('admin.html');
        } catch (error) {
            console.log(error);
        }
    });
}