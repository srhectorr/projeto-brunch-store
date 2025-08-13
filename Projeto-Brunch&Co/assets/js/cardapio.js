console.log("Script carregado!");

function abrirModal(id) {
    console.log("Abrindo modal:", id);
    const modal = document.getElementById(id);
    modal.classList.add('abrir');

    if (!modal.dataset.listenerAdicionado) {
        modal.addEventListener('click', (e) => {
            if (
                e.target.classList.contains('fechar') ||
                e.target.classList.contains('janela-modal')
            ) {
                modal.classList.remove('abrir');
            }
        });
        modal.dataset.listenerAdicionado = "true";
    }
}

let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    console.log("Botão add-to-cart encontrado:", button);
    button.addEventListener('click', () => {
        console.log("Botão clicado!");
        const itemElement = button.closest('.products-item');
        const name = itemElement.dataset.name;
        const price = parseFloat(itemElement.dataset.price);
        const quantity = parseInt(itemElement.querySelector('.quantity').value);

        console.log("Item:", name, "Preço:", price, "Quantidade:", quantity);

        if (quantity > 0) {
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name, price, quantity });
            }
            updateCart();
        } else {
            console.log("Quantidade inválida:", quantity);
            alert("Por favor, selecione uma quantidade maior que 0.");
        }
    });
});

function updateCart() {
    console.log("Atualizando carrinho:", cart);
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `${item.name} - ${item.quantity} x R$${item.price.toFixed(2)}`;
        cartItems.appendChild(itemDiv);
    });

    cartTotal.textContent = `Total: R$${total.toFixed(2)}`;
    abrirModal('cart-modal');
}

document.getElementById('proceed-to-checkout').addEventListener('click', () => {
    console.log("Abrindo modal de checkout");
    document.getElementById('cart-modal').classList.remove('abrir');
    abrirModal('checkout-modal');
});

document.getElementById('order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const table = document.getElementById('table').value;

    const orderDetails = {
        customer: { name, table },
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    console.log("Pedido finalizado:", orderDetails);

    alert('Pedido enviado com sucesso!');
    cart = [];
    updateCart();
    document.getElementById('checkout-modal').classList.remove('abrir');
    document.getElementById('order-form').reset();
});


// Elementos
const proceedToCheckoutBtn = document.getElementById('proceed-to-checkout');
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const orderForm = document.getElementById('order-form');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Botão extra: Continuar Comprando
let continuarBtn = document.createElement('button');
continuarBtn.textContent = 'Continuar Comprando';
continuarBtn.style.marginTop = '10px';
continuarBtn.style.backgroundColor = '#5E4B3C';
continuarBtn.style.color = '#FAF8F2';
continuarBtn.style.border = 'none';
continuarBtn.style.padding = '10px 20px';
continuarBtn.style.borderRadius = '8px';
continuarBtn.style.cursor = 'pointer';
continuarBtn.style.fontFamily = 'Calistoga, serif';
continuarBtn.style.fontSize = '18px';
continuarBtn.style.transition = 'opacity 0.3s ease';
continuarBtn.addEventListener('click', () => {
    cartModal.classList.remove('abrir');
});

function updateCart() {
    console.log("Atualizando carrinho:", cart);
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `${item.name} - ${item.quantity} x R$${item.price.toFixed(2)}`;
        cartItems.appendChild(itemDiv);
    });

    cartTotal.innerText = `Total: R$${total.toFixed(2)}`;

    // Mostrar botão "Continuar Comprando" se houver itens
    if (cart.length > 0 && !document.getElementById('continuar-comprando')) {
        continuarBtn.id = 'continuar-comprando';
        cartModal.querySelector('.conteudo-modal').appendChild(continuarBtn);
    } else if (cart.length === 0 && document.getElementById('continuar-comprando')) {
        continuarBtn.remove();
    }

    abrirModal('cart-modal');
}

// Finalizar pedido (abrir modal de checkout)
proceedToCheckoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        abrirModal('checkout-modal');
    } else {
        alert('Seu carrinho está vazio!');
    }
});

// Envio do pedido
orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Resetar carrinho
    cart = [];
    updateCart();

    // Fechar modais
    checkoutModal.classList.remove('abrir');
    cartModal.classList.remove('abrir');

    // Remover botão "Continuar Comprando" caso esteja presente
    if (document.getElementById('continuar-comprando')) {
        continuarBtn.remove();
    }

    // Feedback para usuário
    alert('Pedido finalizado com sucesso!');
});
