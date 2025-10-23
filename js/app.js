// Navegación entre páginas
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    // Remover clase active de todos los links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-page'));

    // Agregar clase active al link clickeado
    this.classList.add('active-page');

    // Ocultar todas las páginas
    document.querySelectorAll('.page-content').forEach(page => page.classList.add('hidden'));

    // Mostrar la página seleccionada
    const pageId = this.getAttribute('data-page') + '-page';
    document.getElementById(pageId).classList.remove('hidden');
  });
});

// Click en categorías para ir a productos filtrados
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', function() {
    const category = this.getAttribute('data-category');

    // Cambiar a la página de productos
    document.querySelectorAll('.page-content').forEach(page => page.classList.add('hidden'));
    document.getElementById('products-page').classList.remove('hidden');

    // Actualizar nav
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-page'));
    document.querySelector('[data-page="products"]').classList.add('active-page');

    // Filtrar productos
    filterProducts(category);
  });
});

// Función para filtrar productos
function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    if (category === 'all' || product.getAttribute('data-category').includes(category)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Click en el botón "Ver Todas las Marcas"
document.querySelector('.all-brands-btn').addEventListener('click', function() {
  // Cambiar a la página de productos
  document.querySelectorAll('.page-content').forEach(page => page.classList.add('hidden'));
  document.getElementById('products-page').classList.remove('hidden');

  // Actualizar nav
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-page'));
  document.querySelector('[data-page="products"]').classList.add('active-page');

  // Mostrar todos los productos
  filterProducts('all');
});
