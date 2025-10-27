// js/app.js

// === FUNCIÓN CENTRALIZADA PARA NAVEGACIÓN ===
// Esta función maneja el cambio entre las diferentes secciones (home, products, categories).
// Centraliza la lógica para no repetirla.
function navigateTo(pageName, filter = 'all') {
  // 1. CONSTRUIR EL ID DE LA PÁGINA
  // Ejemplo: 'home' se convierte en 'home-page' para coincidir con el ID del HTML.
  const pageId = pageName + '-page';

  // 2. OCULTAR TODAS LAS PÁGINAS
  // Selecciona todos los elementos con la clase 'page-content' (las secciones principales).
  // Itera sobre ellos y les agrega la clase 'hidden' para ocultarlos vía CSS.
  document.querySelectorAll('.page-content').forEach(page => page.classList.add('hidden'));

  // 3. MOSTRAR LA PÁGINA SELECCIONADA
  // Busca el elemento de la página que queremos ver.
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    // Si la encuentra, le quita la clase 'hidden' para mostrarla.
    targetPage.classList.remove('hidden');
  }

  // 4. ACTUALIZAR CLASE ACTIVA EN EL MENÚ DE NAVEGACIÓN (HEADER)
  // Desactiva el estilo 'active-page' en todos los links del menú.
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-page'));

  // Busca el link del menú que corresponde a la página actual (ej: data-page="products").
  const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
  if (activeLink) {
    // Le agrega el estilo 'active-page' para destacarlo.
    activeLink.classList.add('active-page');
  }

  // 5. FILTRAR PRODUCTOS SI VAMOS A LA PÁGINA DE MARCAS
  // Si el destino es la página de productos, llama a la función de filtrado
  // usando el valor de 'filter' (será 'all' o un nombre de categoría).
  if (pageName === 'products') {
    filterProducts(filter);
  }
}
// --------------------------------------------------------------------------

// 1. NAVEGACIÓN ENTRE PÁGINAS (LINKS DEL HEADER)
// Itera sobre todos los links de la barra de navegación.
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Evita que el link navegue a otra URL (comportamiento por defecto).
    const page = this.getAttribute('data-page'); // Obtiene el valor de 'data-page' (ej: 'home', 'products').
    navigateTo(page); // Llama a la función de navegación para cambiar de vista.
  });
});
// --------------------------------------------------------------------------

// 2. CLICK EN CATEGORÍAS PARA IR A PRODUCTOS FILTRADOS
// Itera sobre todas las tarjetas de categoría en la sección de Categorías.
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', function() {
    const category = this.getAttribute('data-category'); // Obtiene el filtro (ej: 'ropaTrabajo').
    // Navega a la página de 'products' (Marcas) y pasa la categoría como filtro.
    navigateTo('products', category);
  });
});
// --------------------------------------------------------------------------

// 3. FUNCIÓN PARA FILTRAR PRODUCTOS (MARCAS)
// Recibe una categoría o 'all' como argumento.
function filterProducts(category) {
  const products = document.querySelectorAll('.product-card'); // Obtiene todas las tarjetas de marca.

  products.forEach(product => {
    // Lógica de filtrado:
    // Si la categoría es 'all' O el atributo data-category del producto incluye el filtro actual:
    if (category === 'all' || product.getAttribute('data-category').includes(category)) {
      product.style.display = 'block'; // Muestra la tarjeta.
    } else {
      product.style.display = 'none'; // Oculta la tarjeta.
    }
  });
}
// --------------------------------------------------------------------------

// 4. CLICK EN EL BOTÓN "VER TODAS LAS MARCAS" (Página de Categorías)
const allBrandsBtn = document.querySelector('.all-brands-btn');
if (allBrandsBtn) {
  allBrandsBtn.addEventListener('click', function() {
    // Navega a la página de 'products' y utiliza 'all' como filtro para mostrar todo.
    navigateTo('products', 'all');
  });
}
// --------------------------------------------------------------------------

// 5. SOLUCIÓN AL PROBLEMA ORIGINAL: CLICK EN EL BOTÓN CTA "VER PRODUCTOS" (Página de Inicio)
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
  ctaButton.addEventListener('click', function(e) {
    e.preventDefault(); // Evita el salto de página/comportamiento por defecto.
    const page = this.getAttribute('data-page'); // Obtiene 'products'.
    // Navega a la página de 'products' y usa 'all' para mostrar todas las marcas.
    navigateTo(page, 'all');
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // --- Lógica del Menú Hamburguesa ---
  const menuButton = document.getElementById('mobile-menu-button');
  const navLinks = document.getElementById('nav-links');

  if (menuButton && navLinks) {
    // 1. Abrir/cerrar menú al hacer clic en el botón
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuButton.classList.toggle('active'); // Para la animación de la "X"
    });

    // 2. Cerrar menú automáticamente al hacer clic en un enlace (para SPAs)
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuButton.classList.remove('active');
      });
    });
  }

  // --- Aquí iría el resto de tu lógica de app.js (si la tienes) ---
  // Por ejemplo, el código que maneja el cambio de páginas.

});
