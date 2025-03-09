document.getElementById('addProductForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;

    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName, quantity })
    })
    .then(response => response.json())
    .then(data => {
        alert('Товар додано');
        document.getElementById('addProductForm').reset();
        loadProducts();
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('loadProducts').addEventListener('click', loadProducts);

document.getElementById('deleteAllProducts').addEventListener('click', function () {
    fetch('/products', {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Всі товари видалені');
        loadProducts();
    })
    .catch(error => console.error('Error:', error));
});

function loadProducts() {
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product._id}</td>
                    <td>${product.productName}</td>
                    <td>${product.quantity}</td>
                    <td>
                        <button onclick="deleteProduct('${product._id}')">Видалити</button>
                        <button onclick="updateProduct('${product._id}')">Змінити</button>
                    </td>
                `;
                productList.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function deleteProduct(productId) {
    fetch(`/product/${productId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Товар видалено');
        loadProducts();
    })
    .catch(error => console.error('Error:', error));
}

function updateProduct(productId) {
    const newProductName = prompt('Введіть нову назву товару:');
    const newQuantity = prompt('Введіть нову кількість:');
    if (newProductName && newQuantity) {
        fetch(`/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productName: newProductName, quantity: newQuantity })
        })
        .then(response => response.json())
        .then(data => {
            alert('Товар оновлено');
            loadProducts();
        })
        .catch(error => console.error('Error:', error));
    }
}
