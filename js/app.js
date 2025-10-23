// Navegación entre páginas
const navLinks = document.querySelectorAll('.nav-link, .cta-button');
const pages = document.querySelectorAll('.page-content');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPage = link.getAttribute('data-page');

    // Ocultar todas las páginas
    pages.forEach(page => page.classList.add('hidden'));

    // Mostrar la página seleccionada
    document.getElementById(`${targetPage}-page`).classList.remove('hidden');

    // Actualizar navegación activa
    document.querySelectorAll('.nav-link').forEach(navLink => {
      navLink.classList.remove('active-page');
    });

    if (link.classList.contains('nav-link')) {
      link.classList.add('active-page');
    } else {
      document.querySelector(`[data-page="${targetPage}"].nav-link`).classList.add('active-page');
    }

    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Sistema de filtrado de productos
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');

    // Actualizar botones activos
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filtrar productos (acepta múltiples categorías)
    productCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(" ");
      if (category === 'all' || categories.includes(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
