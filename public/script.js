const products = [
  { name: "Chronograph Classic", price: "$249", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80", cat: "Watches" },
  { name: "Minimalist Leather Strap", price: "$189", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80", cat: "Watches" },
  { name: "Luxury Diver", price: "$399", img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80", cat: "Watches" },
  { name: "Smart Hybrid", price: "$279", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80", cat: "Watches" },
  { name: "Classic Sneakers", price: "$129", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80", cat: "Shoes" },
  { name: "Premium Runners", price: "$159", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", cat: "Shoes" },
  { name: "Leather Loafers", price: "$199", img: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&q=80", cat: "Shoes" },
  { name: "High-Top Edge", price: "$149", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&q=80", cat: "Shoes" },
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
