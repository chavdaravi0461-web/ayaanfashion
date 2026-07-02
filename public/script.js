const products = [
  { name: "Oversized Cotton Tee", price: "$49", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { name: "Linen Blend Shirt", price: "$89", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80" },
  { name: "Tailored Wool Blazer", price: "$199", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Slim Fit Chinos", price: "$79", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80" },
  { name: "Leather Crossbody Bag", price: "$149", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" },
  { name: "Minimalist Sneakers", price: "$129", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80" },
  { name: "Silk Midi Dress", price: "$159", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80" },
  { name: "Cashmere Crew Neck", price: "$179", img: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a68?w=400&q=80" },
];

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
        <span class="text-sm text-gray-500">${p.price}</span>
      </div>
      <button class="mt-2 w-full py-2 text-xs font-medium border border-gray-300 rounded-full hover:bg-black hover:text-white hover:border-black transition">Add to Cart</button>
    `;
    grid.appendChild(div);
  });
}
