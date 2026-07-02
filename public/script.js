const products = [
  { id: 1, name: "Chronograph Classic", price: 249, img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80", cat: "Watches" },
  { id: 2, name: "Minimalist Leather Strap", price: 189, img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80", cat: "Watches" },
  { id: 3, name: "Luxury Diver", price: 399, img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80", cat: "Watches" },
  { id: 4, name: "Smart Hybrid", price: 279, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80", cat: "Watches" },
  { id: 5, name: "Classic Sneakers", price: 129, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80", cat: "Shoes" },
  { id: 6, name: "Premium Runners", price: 159, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", cat: "Shoes" },
  { id: 7, name: "Leather Loafers", price: 199, img: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&q=80", cat: "Shoes" },
  { id: 8, name: "High-Top Edge", price: 149, img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&q=80", cat: "Shoes" },
];

// Render product grid
const grid = document.getElementById('product-grid');
if (grid) {
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'group cursor-pointer';
    div.innerHTML = `
      <div class="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
        <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
      </div>
      <div class="flex items-center justify-between mt-3">
        <p class="text-sm font-medium">${p.name}</p>
        <span class="text-sm text-gray-500">$${p.price}</span>
      </div>
      <button data-id="${p.id}" class="add-to-cart mt-2 w-full py-2 text-xs font-medium border border-gray-300 rounded-full hover:bg-black hover:text-white hover:border-black transition">Add to Cart</button>
    `;
    grid.appendChild(div);
  });
}

// Cart state
let cart = JSON.parse(localStorage.getItem('ayaan_cart') || '[]');

function saveCart() {
  localStorage.setItem('ayaan_cart', JSON.stringify(cart));
}

function cartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, i) => sum + i.qty * i.price, 0);
}

function updateBadge() {
  const el = document.getElementById('cartCount');
  if (el) el.textContent = cartCount();
}

function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('opacity-0', 'translate-y-4');
  el.classList.add('opacity-100', 'translate-y-0');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.classList.add('opacity-0', 'translate-y-4');
    el.classList.remove('opacity-100', 'translate-y-0');
  }, 2000);
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="flex flex-col items-center justify-center py-16 text-gray-400"><span class="text-4xl mb-3">🛒</span><p class="text-sm">Your cart is empty</p></div>';
    if (footer) footer.classList.add('hidden');
    return;
  }

  if (footer) footer.classList.remove('hidden');

  container.innerHTML = cart.map(i => `
    <div class="flex gap-4 border-b border-gray-50 pb-4">
      <div class="w-20 h-20 rounded-lg bg-gray-50 overflow-hidden shrink-0">
        <img src="${i.img}" alt="${i.name}" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium truncate">${i.name}</p>
        <p class="text-xs text-gray-400 mt-0.5">$${i.price}</p>
        <div class="flex items-center gap-3 mt-2">
          <button data-id="${i.id}" data-dir="-1" class="cart-qty w-6 h-6 rounded-full border border-gray-200 text-xs hover:bg-gray-100 transition">−</button>
          <span class="text-sm font-medium w-4 text-center">${i.qty}</span>
          <button data-id="${i.id}" data-dir="1" class="cart-qty w-6 h-6 rounded-full border border-gray-200 text-xs hover:bg-gray-100 transition">+</button>
          <button data-id="${i.id}" class="cart-remove ml-auto text-xs text-red-400 hover:text-red-600 transition">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  const subtotal = document.getElementById('cartSubtotal');
  if (subtotal) subtotal.textContent = `$${cartTotal()}`;
}

function openCart() {
  renderCartItems();
  document.getElementById('cartOverlay')?.classList.remove('hidden');
  document.getElementById('cartDrawer')?.classList.remove('translate-x-full');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartOverlay')?.classList.add('hidden');
  document.getElementById('cartDrawer')?.classList.add('translate-x-full');
  document.body.style.overflow = '';
}

function addToCart(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: prod.id, name: prod.name, price: prod.price, img: prod.img, qty: 1 });
  }
  saveCart();
  updateBadge();
  showToast(`${prod.name} added to cart`);
}

// Event delegation
document.addEventListener('click', e => {
  // Add to cart buttons
  const addBtn = e.target.closest('.add-to-cart');
  if (addBtn) {
    const id = parseInt(addBtn.dataset.id);
    addToCart(id);
    return;
  }

  // Cart quantity
  const qtyBtn = e.target.closest('.cart-qty');
  if (qtyBtn) {
    const id = parseInt(qtyBtn.dataset.id);
    const dir = parseInt(qtyBtn.dataset.dir);
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty += dir;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
      saveCart();
      updateBadge();
      renderCartItems();
    }
    return;
  }

  // Remove
  const rmBtn = e.target.closest('.cart-remove');
  if (rmBtn) {
    const id = parseInt(rmBtn.dataset.id);
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateBadge();
    renderCartItems();
    return;
  }
});

// Cart toggle
document.getElementById('cartBtn')?.addEventListener('click', openCart);
document.getElementById('closeCart')?.addEventListener('click', closeCart);
document.getElementById('cartOverlay')?.addEventListener('click', closeCart);

// Checkout
function openCheckout() {
  if (cart.length === 0) return;
  document.getElementById('checkoutTotal').textContent = `$${cartTotal()}`;
  closeCart();
  const overlay = document.getElementById('checkoutOverlay');
  overlay.classList.remove('hidden');
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

document.getElementById('closeCheckout')?.addEventListener('click', hideCheckout);
document.getElementById('checkoutOverlay')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) hideCheckout();
});

function hideCheckout() {
  const overlay = document.getElementById('checkoutOverlay');
  overlay.style.display = 'none';
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

document.getElementById('checkoutForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const order = {
    items: [...cart],
    total: cartTotal(),
    customer: Object.fromEntries(data),
    date: new Date().toISOString(),
  };
  localStorage.setItem('ayaan_last_order', JSON.stringify(order));
  cart = [];
  saveCart();
  updateBadge();
  hideCheckout();
  showToast('Order placed! Thank you for shopping with Ayaan.');
});

// Init
updateBadge();
