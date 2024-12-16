    // Cart functionality
let cart = [];
let orders = [];
    
    // Admin functionality
const adminUsers = [
        { username: 'Mark', password: '1234' },
        { username: 'Clarita', password: '5678' }
];
    
let currentAdmin = null;
    
    // Sample products data
const products = [
        { id: 1, name: 'Arroz "Costeño" 750 g', price: 4.50, image: 'https://fresh2go.pe/wp-content/uploads/2024/05/daa759_b513c7b9f04d4aa294eda4ddf79ad713mv2.png' },
        { id: 2, name: 'Azúcar "Costeño" 1Kg', price: 3.80, image: 'https://plazavea.vteximg.com.br/arquivos/ids/561848-512-512/20195162.jpg' },
        { id: 3, name: 'Aceite "Primor premiun" 900ml', price: 9.90, image: 'https://wongfood.vtexassets.com/arquivos/ids/711219/3198-1.jpg?v=638537399338230000' },
        { id: 4, name: 'Leche "Gloria azul grande" 400g', price: 4.20, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FVC_L8CQUOkderp8IVQb3Bk0d6zZaytSPA&s' },
        { id: 6, name: 'Huevos X3uni', price: 1.50, image: 'https://static.runnea.com/images/202202/comer-huevos-para-correr-1200x572x80xX.jpg?1' },
        { id: 7, name: 'Fideos "Don victorio" 500g', price: 3.20, image: 'https://miamarket.pe/assets/uploads/ebe845560ca49fb6d034b06a0ea91e27.jpg' },
        { id: 8, name: 'Filete de atún "Monte alto" 160g', price: 5.90, image: 'https://images.rappi.pe/products/8050c678-84d7-424e-80f4-ccde0c19d70e.png' },
        { id: 9, name: 'ZodaV 35g', price: 0.50, image: 'https://labodega.com.pe/Adminbackend/fotos/producto13701.jpg' },
        { id: 10, name: 'Jabón "Bolivar bebe" 210g', price: 3.50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKb7oMEpZSMAFR6MLOOh807IfyNzFYn08NHQ&s' },
        { id: 11, name: 'Papel Higiénico "Paracas" 2Uni', price: 12.90, image: 'https://www.distribuidoranavarrete.com.pe/wp-content/uploads/35060041-3.png' },
        { id: 12, name: 'Detergente "Ace limon" 750g', price: 13.90, image: 'https://cdnbt.nyc3.cdn.digitaloceanspaces.com/data/holisuper/static/productos/xm/detergente-en-polvo-ace-limon-750g-1889.jpg' },
        { id: 13, name: 'Yogurt "Gloria" sabor fresa 900ml', price: 5.50, image: 'https://plazavea.vteximg.com.br/arquivos/ids/22976332-512-512/20326320.jpg' },
        { id: 14, name: 'Mantequilla "Gloria" barra 200g', price: 4.90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ENx23wZ-F6CsW-kQqvHg1WJzEcOB2Ick7A&s' },
        { id: 15, name: 'Mermelada "Fanny" sache 100g', price: 1.50, image: 'https://www.molitalia.com.pe/wp-content/uploads/2020/09/dummie-envoltura-mermelada-fanny-100g-2019-1.jpg' },
        { id: 16, name: 'Café instantáneo "Altomayo" 15gr', price: 2.50, image: 'https://www.jldecostore.com.pe/wp-content/uploads/2024/07/Cafe-Instantaneo-Gourmet-15gr-Altomayo.jpg' },
        { id: 17, name: 'Sal de mesa "Marina" 1kg', price: 1.50, image: 'https://plazavea.vteximg.com.br/arquivos/ids/561008-450-450/20130448.jpg?v=637427417082570000' },
        { id: 19, name: 'Mayonesa "AlaCena" 95g', price: 5.90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy9AwaixYSXZDxBsp-MawTiQgt_AqyUjnIsQ&s' },

];
    
    // Function to show/hide sections
function showSection(sectionName) {
        // Hide all sections first
        document.getElementById('productsSection').style.display = 'none';
        document.getElementById('cartSection').style.display = 'none';
        document.getElementById('ordersSection').style.display = 'none';
        document.getElementById('aboutSection').style.display = 'none';
        document.getElementById('helpSection').style.display = 'none';
        document.getElementById('adminSection').style.display = 'none';
    
        // Handle hero section visibility and main container padding
        const heroSection = document.querySelector('.hero-section');
        const mainContainer = document.querySelector('main.container');
        
        if (sectionName === 'products') {
            heroSection.style.display = 'block';
            mainContainer.style.paddingTop = '0'; // Remove padding when hero is visible
            document.getElementById('productsSection').style.display = 'grid';
        } else {
            heroSection.style.display = 'none';
            mainContainer.style.paddingTop = '70px'; // Add padding when hero is hidden
            document.getElementById(sectionName + 'Section').style.display = 'block';
        }
}
    
    // Function to show the payment form
function showPaymentForm() {
        const paymentForm = document.getElementById('paymentForm');
        paymentForm.style.display = 'block';
}
    
    // Update the addToCart function
function addToCart(productId) {
        const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
        const product = products.find(p => p.id === productId);
        
        if (product && quantity > 0) {
            // Check if product already exists in cart
            const existingItemIndex = cart.findIndex(item => item.id === productId);
            
            if (existingItemIndex !== -1) {
                // Update quantity and subtotal of existing item
                cart[existingItemIndex].quantity += quantity;
                cart[existingItemIndex].subtotal = cart[existingItemIndex].quantity * product.price;
            } else {
                // Add new item to cart
                const cartItem = {
                    ...product,
                    quantity: quantity,
                    subtotal: product.price * quantity
                };
                cart.push(cartItem);
            }
            
            updateCartCount();
            updateCartTotal();
            updateCartDisplay();
            // Reset quantity input
            document.getElementById(`quantity-${productId}`).value = 1;
        }
}
    
    // Update the updateCartDisplay function
function updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
            return;
        }
    
        cartItems.innerHTML = `
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio Unit.</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cart.map((item, index) => `
                            <tr>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="${item.image}" alt="${item.name}" 
                                             class="cart-item-image me-2"
                                             onerror="this.src='https://via.placeholder.com/60?text=${item.name}'">
                                        <span>${item.name}</span>
                                    </div>
                                </td>
                                <td>S/ ${item.price.toFixed(2)}</td>
                                <td>
                                    <div class="input-group" style="max-width: 150px;">
                                        <button class="btn btn-outline-secondary" type="button" 
                                                onclick="updateCartItemQuantity(${index}, ${item.quantity - 1})">-</button>
                                        <input type="number" class="form-control text-center" 
                                               value="${item.quantity}" min="1"
                                               onchange="updateCartItemQuantity(${index}, this.value)">
                                        <button class="btn btn-outline-secondary" type="button"
                                                onclick="updateCartItemQuantity(${index}, ${item.quantity + 1})">+</button>
                                    </div>
                                </td>
                                <td>S/ ${item.subtotal.toFixed(2)}</td>
                                <td>
                                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                                        <i class="fas fa-trash"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
}
    
    // Add new function to update cart item quantity
function updateCartItemQuantity(index, newQuantity) {
        newQuantity = parseInt(newQuantity);
        if (newQuantity < 1) {
            removeFromCart(index);
            return;
        }
        
        cart[index].quantity = newQuantity;
        cart[index].subtotal = cart[index].price * newQuantity;
        
        updateCartCount();
        updateCartTotal();
        updateCartDisplay();
}
    
    // Function to update cart total
function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
        document.getElementById('cartTotal').textContent = total.toFixed(2);
        document.querySelectorAll('.payment-total').forEach(el => {
            el.textContent = total.toFixed(2);
        });
}
    
    // Function to update cart count
function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cartCount').textContent = totalItems;
}
    
    // Function to remove items from cart
function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartCount();
        updateCartTotal();
        updateCartDisplay();
}
    
    // Function to process payment
function processPayment(event) {
        event.preventDefault();
        
        // Get customer details from the payment form
        const customerName = document.getElementById('customerName').value;
        const customerDNI = document.getElementById('customerDNI').value;
        const customerAddress = document.getElementById('customerAddress').value;
    
        const order = {
            id: orders.length + 1,
            items: [...cart],
            total: cart.reduce((sum, item) => sum + item.subtotal, 0),
            date: new Date().toLocaleDateString(),
            status: 'processing',
            customerDetails: {
                name: customerName,
                dni: customerDNI,
                address: customerAddress
            },
            timeline: [
                {
                    status: 'processing',
                    date: new Date().toLocaleString(),
                    message: 'Pedido recibido - Esperando atención',
                    updatedBy: 'Sistema'
                }
            ]
        };
        orders.push(order);
        cart = [];
        updateCartCount();
        updateCartTotal();
        updateCartDisplay();
        document.getElementById('paymentForm').style.display = 'none';
        alert('¡Pago procesado con éxito! Tu pedido está en procesamiento.');
        showSection('orders');
        updateOrdersList();
}
    
    // Function to update orders list
 function updateOrdersList() {
        const ordersList = document.getElementById('ordersList');
        ordersList.innerHTML = orders.map(order => `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">Pedido #${order.id}</h5>
                    <p class="card-text">Fecha: ${order.date}</p>
                    
                    <!-- Add order items details -->
                    <div class="order-items mb-3">
                        <h6>Productos ordenados:</h6>
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio Unit.</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${order.items.map(item => `
                                        <tr>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <img src="${item.image}" alt="${item.name}" 
                                                         class="cart-item-image me-2"
                                                         onerror="this.src='https://via.placeholder.com/60?text=${item.name}'">
                                                    <span>${item.name}</span>
                                                </div>
                                            </td>
                                            <td>${item.quantity}</td>
                                            <td>S/ ${item.price.toFixed(2)}</td>
                                            <td>S/ ${item.subtotal.toFixed(2)}</td>
                                        </tr>
                                    `).join('')}
                                    <tr class="table-info">
                                        <td colspan="3" class="text-end"><strong>Total del pedido:</strong></td>
                                        <td><strong>S/ ${order.total.toFixed(2)}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
    
                    <p class="card-text">Total: S/ ${order.total.toFixed(2)}</p>
                    ${getStatusBadge(order.status)}
                    <div class="customer-details mb-3 p-3 bg-light rounded">
                        <h5>Datos del Cliente:</h5>
                        <p><strong>Nombre:</strong> ${order.customerDetails?.name || 'No especificado'}</p>
                        <p><strong>DNI:</strong> ${order.customerDetails?.dni || 'No especificado'}</p>
                        <p><strong>Dirección:</strong> ${order.customerDetails?.address || 'No especificado'}</p>
                    </div>
                    <div class="order-timeline">
                        ${order.timeline.map(event => `
                            <div class="timeline-item">
                                <strong>${event.date}</strong>
                                <p>${event.message}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
}
    
    // Function to get status badge
function getStatusBadge(status) {
        const statusMap = {
            processing: {class: 'status-processing', text: 'Esperando Atención'},
            delivering: {class: 'status-delivering', text: 'En Camino'},
            delivered: {class: 'status-delivered', text: 'Entregado'}
        };
        const statusInfo = statusMap[status];
        return `<span class="order-status ${statusInfo.class}">${statusInfo.text}</span>`;
}
    
    // Admin functions
function handleAdminLogin(event) {
        event.preventDefault();
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
    
        const user = adminUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
            currentAdmin = username;
            document.getElementById('adminLogin').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            updateAdminOrdersList();
        } else {
            alert('Usuario o contraseña incorrectos');
        }
}
    
function updateAdminOrdersList() {
        const adminOrdersList = document.getElementById('adminOrdersList');
        adminOrdersList.innerHTML = orders.map(order => `
            <div class="admin-order-card">
                <div class="admin-header">
                    <h4>Pedido #${order.id}</h4>
                    <span class="admin-user-info">Último cambio por: ${order.lastUpdatedBy || 'Sistema'}</span>
                </div>
                <!-- Customer Details Section -->
                <div class="customer-details mb-3 p-3 bg-light rounded">
                    <h5>Datos del Cliente:</h5>
                    <p><strong>Nombre:</strong> ${order.customerDetails?.name || 'No especificado'}</p>
                    <p><strong> DNI:</strong> ${order.customerDetails?.dni || 'No especificado'}</p>
                    <p><strong>Dirección:</strong> ${order.customerDetails?.address || 'No especificado'}</p>
                </div>
                <p>Fecha: ${order.date}</p>
                <p>Total: S/ ${order.total.toFixed(2)}</p>
                ${getStatusBadge(order.status)}
                <div class="admin-controls">
                    <select class="form-select mb-2" id="status-${order.id}" 
                            onchange="updateOrderStatus(${order.id}, this.value)">
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Atender Pedido</option>
                        <option value="delivering" ${order.status === 'delivering' ? 'selected' : ''}>Enviar Pedido</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Marcar como Entregado</option>
                    </select>
                </div>
                <div class="order-timeline">
                    ${order.timeline.map(event => `
                        <div class="timeline-item">
                            <strong>${event.date}</strong>
                            <p>${event.message}</p>
                            <small>Actualizado por: ${event.updatedBy || 'Sistema'}</small>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
}
    
function updateOrderStatus(orderId, newStatus) {
        if (!currentAdmin) {
            alert('Debe iniciar sesión para actualizar pedidos');
            return;
        }
    
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            order.lastUpdatedBy = currentAdmin;
            order.timeline.push({
                status: newStatus,
                date: new Date().toLocaleString(),
                message: getStatusMessage(newStatus),
                updatedBy: currentAdmin
            });
            updateAdminOrdersList();
            updateOrdersList(); // Update customer view immediately
        }
}
    
function getStatusMessage(status) {
        const messages = {
            processing: 'Pedido recibido - Esperando atención',
            delivering: 'Pedido en proceso de entrega',
            delivered: 'Pedido entregado al cliente'
        };
        return messages[status] || 'Estado actualizado';
}
    
    // Function to start the slideshow
function startSlideshow() {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.hero-slide');
        
        setInterval(() => {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000);
}
    
    // Initialize the page with products section
window.onload = function() {
        showSection('products');
        updateCartDisplay();
        startSlideshow(); // Add this line
        
        // Load products
        const productsGrid = document.getElementById('productsSection');
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150?text=${product.name}'">
                <h3>${product.name}</h3>
                <p>S/ ${product.price.toFixed(2)}</p>
                <div class="quantity-control">
                    <label>Cantidad:</label>
                    <input type="number" id="quantity-${product.id}" min="1" value="1" class="form-control">
                </div>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                    Añadir al carrito
                </button>
            </div>
        `).join('');
};
    
    // New function for submitting complaints
function submitComplaint() {
        const name = document.getElementById('complaintName').value;
        const complaint = document.getElementById('complaintText').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;
        
        const complaintsContainer = document.getElementById('complaintsContainer');
        const complaintElement = document.createElement('div');
        complaintElement.className = 'complaint-card mb-3';
        complaintElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${complaint}</p>
                    <div class="stars">
                        ${Array(parseInt(rating)).fill('★').join('')}${Array(5-parseInt(rating)).fill('☆').join('')}
                    </div>
                    <small class="text-muted">Enviado el ${new Date().toLocaleDateString()}</small>
                </div>
            </div>
        `;
        
        complaintsContainer.prepend(complaintElement);
        document.getElementById('complaintForm').reset();
    }
