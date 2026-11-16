/**
 * AIMPRIMIR3D - Catálogo Modular para Pre-Tienda y Futuro E-commerce
 * Base de datos de productos y renderizado interactivo en tienda.html
 */

const STORE_PRODUCTS = [
  {
    id: "rep-01",
    name: "Engranaje Técnico Helicoidal / Recto a Medida",
    category: "mecanica",
    categoryLabel: "Repuestos y Mecánica",
    priceEstimate: "Desde RD$ 650",
    material: "Nylon / PETG Técnico / ASA",
    leadTime: "24 - 48 hrs según urgencia",
    badge: "Bajo Pedido",
    image: "assets/img/slide2.png",
    description: "Reemplazo de alta resistencia para electrodomésticos, maquinaria agrícola, motores y herramientas descontinuadas. Fabricado para soportar torque y fricción.",
  },
  {
    id: "rep-02",
    name: "Adaptador de Tubería o Brida Industrial",
    category: "mecanica",
    categoryLabel: "Repuestos y Mecánica",
    priceEstimate: "Desde RD$ 850",
    material: "PETG / ABS Alta Temperatura",
    leadTime: "2 a 3 días hábiles",
    badge: "Bajo Pedido",
    image: "assets/img/slide3.png",
    description: "Acoples, reducciones y bridas a medida resistentes a químicos moderados y humedad continua. Ideal para talleres y sistemas neumáticos.",
  },
  {
    id: "sop-01",
    name: "Soporte Elevador Ergonómico para Laptop / Tablet",
    category: "organizacion",
    categoryLabel: "Soportes y Ergonomía",
    priceEstimate: "RD$ 950",
    material: "PLA+ Reforzado",
    leadTime: "1 a 2 días hábiles",
    badge: "Fabricación Continua",
    image: "assets/img/slide3.png",
    description: "Mejora la postura de trabajo y la ventilación del equipo. Diseño modular, resistente y plegable con pads antideslizantes.",
  },
  {
    id: "sop-02",
    name: "Base y Colgador de Auriculares / Mandos Gaming",
    category: "organizacion",
    categoryLabel: "Soportes y Ergonomía",
    priceEstimate: "RD$ 750",
    material: "PLA Bio / PETG",
    leadTime: "1 a 2 días hábiles",
    badge: "Fabricación Continua",
    image: "assets/img/slide1.png",
    description: "Organiza tu escritorio con un diseño moderno y minimalista con el logotipo grabado de tu marca o iniciales personalizadas.",
  },
  {
    id: "corp-01",
    name: "Llaveros 3D Corporativos con Relieve de Marca",
    category: "corporativo",
    categoryLabel: "Artículos Corporativos",
    priceEstimate: "Desde RD$ 85 c/u (Lotes 50+)",
    material: "PLA Biicolor / PETG",
    leadTime: "3 a 5 días hábiles",
    badge: "Lotes al por Mayor",
    image: "assets/img/logonombre.png",
    description: "Merchandising de alto impacto visual y táctil. Tu logotipo tridimensional a doble color para eventos, fidelización de clientes o lanzamientos.",
  },
  {
    id: "corp-02",
    name: "Placas Identificadoras de Escritorio / Trofeos 3D",
    category: "corporativo",
    categoryLabel: "Artículos Corporativos",
    priceEstimate: "Desde RD$ 1,200",
    material: "PLA Silk / Resina UV",
    leadTime: "3 a 4 días hábiles",
    badge: "Personalización Total",
    image: "assets/img/slide3.png",
    description: "Reconocimientos, premios empresariales e identificadores de oficina con acabados metálicos y detalles nítidos.",
  },
  {
    id: "proto-01",
    name: "Carcasa y Enclosure para Proyectos IoT / Arduino",
    category: "prototipos",
    categoryLabel: "Prototipos e Ingeniería",
    priceEstimate: "Desde RD$ 800",
    material: "ABS / PETG Resistente",
    leadTime: "24 a 48 hrs",
    badge: "Ingeniería",
    image: "assets/img/slide2.png",
    description: "Cajas con tolerancias exactas para tarjetas PCB, sensores, puertos USB, tornillos roscados y ranuras de ventilación.",
  },
  {
    id: "arte-01",
    name: "Figura Coleccionable en Alta Resolución (Resina 8K)",
    category: "arte",
    categoryLabel: "Arte y Coleccionismo",
    priceEstimate: "Desde RD$ 1,500",
    material: "Resina UV Alta Precisión",
    leadTime: "2 a 4 días hábiles",
    badge: "Detalle Extremo",
    image: "assets/img/slide1.png",
    description: "Miniaturas para juegos de rol, bustos detallados y personajes de colección con acabados microscópicos sin líneas de capa visibles.",
  },
];

// Renderizado en la página tienda.html
function renderStoreProducts(productsToRender) {
  const container = document.getElementById("store-products-grid");
  if (!container) return;

  if (productsToRender.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="p-4 bg-light rounded-4">
          <i class="fas fa-search fa-3x text-muted mb-3"></i>
          <h4>No se encontraron productos</h4>
          <p class="text-muted">Prueba con otra palabra clave o solicita una fabricación personalizada.</p>
          <a href="contacto.html" class="btn btn-primary-custom mt-2">Cotizar Fabricación a Medida</a>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = productsToRender
    .map(
      (prod) => `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="store-card">
        <div class="store-thumb">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          <span class="store-status-badge">${prod.badge}</span>
        </div>
        <div class="store-body">
          <span class="meta-badge">${prod.categoryLabel}</span>
          <h5 class="fw-bold mb-2">${prod.name}</h5>
          <p class="text-muted small mb-3">${prod.description}</p>
          
          <div class="mb-3 pt-2 border-top">
            <div class="d-flex justify-content-between text-muted small mb-1">
              <span><i class="fas fa-layer-group me-1 text-primary"></i> Material:</span>
              <strong class="text-dark">${prod.material}</strong>
            </div>
            <div class="d-flex justify-content-between text-muted small">
              <span><i class="fas fa-clock me-1 text-primary"></i> Estimado:</span>
              <span class="text-dark">${prod.leadTime}</span>
            </div>
          </div>

          <div class="store-price mb-3">
            ${prod.priceEstimate}
          </div>

          <div class="d-grid gap-2">
            <a href="contacto.html?producto=${encodeURIComponent(prod.name)}" class="btn btn-primary-custom btn-sm">
              <i class="fas fa-paper-plane me-1"></i> Solicitar este Producto
            </a>
            <a href="https://wa.me/18494622228?text=${encodeURIComponent('Hola AIMPRIMIR3D, me interesa cotizar/ordenar el producto: ' + prod.name)}" target="_blank" class="btn btn-outline-custom btn-sm">
              <i class="fab fa-whatsapp me-1 text-success"></i> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Inicialización de filtros y búsqueda en tienda.html
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("store-products-grid");
  if (!grid) return;

  renderStoreProducts(STORE_PRODUCTS);

  // Filtrado por categoría
  const filterBtns = document.querySelectorAll(".store-filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      if (category === "all") {
        renderStoreProducts(STORE_PRODUCTS);
      } else {
        const filtered = STORE_PRODUCTS.filter((p) => p.category === category);
        renderStoreProducts(filtered);
      }
    });
  });

  // Búsqueda en tiempo real
  const searchInput = document.getElementById("store-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase().trim();
      if (!term) {
        renderStoreProducts(STORE_PRODUCTS);
        return;
      }
      const filtered = STORE_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.material.toLowerCase().includes(term)
      );
      renderStoreProducts(filtered);
    });
  }
});
