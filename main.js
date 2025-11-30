// ==========================
// CONFIGURATION WHATSAPP
// ==========================

// Remplace par ton vrai numéro (sans +)
const WHATSAPP_NUMBER = "2250700000000";
const WHATSAPP_DISPLAY = "+225 07 00 00 00 00";


// ==========================
// LISTE DES PRODUITS
// ==========================

const products = [
  {
    id: 1,
    name: "Bracelet perles roses",
    price: "5 000 FCFA",
    description: "Bracelet en perles roses et dorées.",
    label: "Bracelet"
  },
  {
    id: 2,
    name: "Collier perles ivoire",
    price: "8 500 FCFA",
    description: "Collier élégant en perles ivoire.",
    label: "Collier"
  },
  {
    id: 3,
    name: "Boucles perles dorées",
    price: "4 000 FCFA",
    description: "Boucles d'oreilles légères et élégantes.",
    label: "Boucles"
  },
  {
    id: 4,
    name: "Set bracelet + collier",
    price: "12 000 FCFA",
    description: "Ensemble assorti blanc & or.",
    label: "Ensemble"
  },
  {
    id: 5,
    name: "Bracelet multicolore",
    price: "4 500 FCFA",
    description: "Bracelet joyeux multicolore.",
    label: "Bracelet"
  },
  {
    id: 6,
    name: "Choker perles minimaliste",
    price: "6 500 FCFA",
    description: "Choker fin et discret.",
    label: "Choker"
  }
];


// ==========================
// FONCTIONS
// ==========================

// Ouvre WhatsApp avec message
function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, "_blank");
}

// Génération des cartes produits
function renderProducts() {
  const grid = document.getElementById("products-grid");

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <div class="product-image">${product.label}</div>
      <h3 class="product-title">${product.name}</h3>
      <p class="product-description">${product.description}</p>

      <div class="product-footer">
        <span class="product-price">${product.price}</span>

        <button class="btn btn-primary whatsapp-btn" data-id="${product.id}">
          WhatsApp
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  attachProductEvents();
}

// Attache les events sur les boutons produits
function attachProductEvents() {
  const buttons = document.querySelectorAll("[data-id]");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const product = products.find(p => p.id == id);

      const message =
        `Bonjour, je souhaite commander :\n` +
        `• ${product.name}\n` +
        `• Prix : ${product.price}\n` +
        `Quantité : 1\n\n` +
        `Merci de me confirmer la disponibilité.`;

      openWhatsApp(message);
    });
  });
}

// Setup des boutons globaux
function setupGlobalButtons() {
  const headerBtn = document.getElementById("header-whatsapp-btn");
  const heroBtn = document.getElementById("hero-whatsapp-btn");
  const contactBtn = document.getElementById("contact-whatsapp-btn");

  const message = 
    "Bonjour, je suis intéressée par vos bijoux en perles. Pouvez-vous m’en dire plus ?";

  [headerBtn, heroBtn, contactBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => openWhatsApp(message));
    }
  });
}

// ==========================
// INITIALISATION
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("whatsapp-display").innerText = WHATSAPP_DISPLAY;

  renderProducts();
  setupGlobalButtons();
});
