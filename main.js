// ==========================
// CONFIGURATION WHATSAPP
// ==========================

const WHATSAPP_NUMBER = "2250103021890";
const WHATSAPP_DISPLAY = "+225 01 03 02 18 90";

// ==========================
// LISTE DES PRODUITS
// ==========================

const products = [
  {
    id: 1,
    name: "Bracelet perles roses",
    price: 5000,
    priceDisplay: "5 000 FCFA",
    description: "Bracelet élégant en perles roses et dorées, parfait pour toutes les occasions.",
    label: "Bracelet",
    category: "Bracelet",
    badge: "Populaire",
    image: "bracelet-rose"
  },
  {
    id: 2,
    name: "Collier perles ivoire",
    price: 8500,
    priceDisplay: "8 500 FCFA",
    description: "Collier sophistiqué en perles ivoire, une pièce intemporelle pour votre garde-robe.",
    label: "Collier",
    category: "Collier",
    badge: "Nouveau",
    image: "collier-ivoire"
  },
  {
    id: 3,
    name: "Boucles perles dorées",
    price: 4000,
    priceDisplay: "4 000 FCFA",
    description: "Boucles d'oreilles légères et élégantes en perles dorées, pour un look raffiné.",
    label: "Boucles",
    category: "Boucles",
    badge: null,
    image: "boucles-dorees"
  },
  {
    id: 4,
    name: "Set bracelet + collier",
    price: 12000,
    priceDisplay: "12 000 FCFA",
    description: "Ensemble assorti blanc & or, idéal pour une tenue complète et harmonieuse.",
    label: "Ensemble",
    category: "Ensemble",
    badge: "Best-seller",
    image: "set-complet"
  },
  {
    id: 5,
    name: "Bracelet multicolore",
    price: 4500,
    priceDisplay: "4 500 FCFA",
    description: "Bracelet joyeux multicolore, pour apporter une touche de gaieté à votre style.",
    label: "Bracelet",
    category: "Bracelet",
    badge: null,
    image: "bracelet-multicolore"
  },
  {
    id: 6,
    name: "Choker perles minimaliste",
    price: 6500,
    priceDisplay: "6 500 FCFA",
    description: "Choker fin et discret en perles, pour un style moderne et épuré.",
    label: "Choker",
    category: "Choker",
    badge: "Tendance",
    image: "choker-minimaliste"
  },
  {
    id: 7,
    name: "Bracelet perles bleues",
    price: 5500,
    priceDisplay: "5 500 FCFA",
    description: "Bracelet apaisant en perles bleues, évoquant la sérénité et l'élégance.",
    label: "Bracelet",
    category: "Bracelet",
    badge: null,
    image: "bracelet-bleu"
  },
  {
    id: 8,
    name: "Collier perles nacrées",
    price: 9000,
    priceDisplay: "9 000 FCFA",
    description: "Collier lumineux en perles nacrées, pour un éclat naturel et raffiné.",
    label: "Collier",
    category: "Collier",
    badge: "Nouveau",
    image: "collier-nacre"
  },
  {
    id: 9,
    name: "Boucles perles blanches",
    price: 4200,
    priceDisplay: "4 200 FCFA",
    description: "Boucles d'oreilles classiques en perles blanches, intemporelles et élégantes.",
    label: "Boucles",
    category: "Boucles",
    badge: null,
    image: "boucles-blanches"
  }
];

// ==========================
// GESTION DU PANIER
// ==========================

let cart = JSON.parse(localStorage.getItem('perleriebyvero_cart')) || [];

function saveCart() {
  localStorage.setItem('perleriebyvero_cart', JSON.stringify(cart));
}

function addToCart(product, quantity = 1) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  
  saveCart();
  updateCartUI();
  showNotification(`${product.name} ajouté au panier !`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showNotification('Article retiré du panier');
}

function updateCartQuantity(productId, quantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      saveCart();
      updateCartUI();
    }
  }
}

function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// ==========================
// INTERFACE UTILISATEUR
// ==========================

function updateCartUI() {
  const cartCount = getCartCount();
  const cartCountEl = document.getElementById('cart-count');
  const cartContent = document.getElementById('cart-content');
  const cartEmpty = document.getElementById('cart-empty');
  const cartFooter = document.getElementById('cart-footer');
  const cartTotalPrice = document.getElementById('cart-total-price');
  
  // Mise à jour du compteur
  if (cartCountEl) {
    cartCountEl.textContent = cartCount;
    cartCountEl.style.display = cartCount > 0 ? 'flex' : 'none';
  }
  
  // Affichage du panier
  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = 'flex';
    if (cartFooter) cartFooter.style.display = 'none';
    if (cartContent) {
      cartContent.innerHTML = '';
      cartContent.appendChild(cartEmpty);
    }
  } else {
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';
    if (cartTotalPrice) {
      cartTotalPrice.textContent = formatPrice(getCartTotal());
    }
    
    if (cartContent) {
      cartContent.innerHTML = '';
      cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartContent.appendChild(cartItem);
      });
    }
  }
}

function createCartItem(item) {
  const div = document.createElement('div');
  div.className = 'cart-item';
  div.innerHTML = `
    <div class="cart-item-image">
      <i class="fas fa-gem"></i>
    </div>
    <div class="cart-item-info">
      <h4>${item.name}</h4>
      <p class="cart-item-price">${item.priceDisplay}</p>
    </div>
    <div class="cart-item-controls">
      <button class="qty-btn" data-id="${item.id}" data-action="decrease" aria-label="Diminuer la quantité">
        <i class="fas fa-minus"></i>
      </button>
      <span class="cart-item-qty">${item.quantity}</span>
      <button class="qty-btn" data-id="${item.id}" data-action="increase" aria-label="Augmenter la quantité">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <button class="cart-item-remove" data-id="${item.id}" aria-label="Retirer du panier">
      <i class="fas fa-trash"></i>
    </button>
  `;
  
  // Événements
  div.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.getAttribute('data-action');
      const id = parseInt(btn.getAttribute('data-id'));
      const item = cart.find(i => i.id === id);
      if (item) {
        if (action === 'increase') {
          updateCartQuantity(id, item.quantity + 1);
        } else {
          updateCartQuantity(id, item.quantity - 1);
        }
      }
    });
  });
  
  div.querySelector('.cart-item-remove').addEventListener('click', () => {
    removeFromCart(item.id);
  });
  
  return div;
}

// ==========================
// GESTION DU PANIER LATÉRAL
// ==========================

function openCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (sidebar) {
    sidebar.classList.add('active');
    sidebar.setAttribute('aria-hidden', 'false');
  }
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (sidebar) {
    sidebar.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
  }
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================
// GÉNÉRATION DES PRODUITS
// ==========================

let currentFilter = 'all';

function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);
  
  grid.innerHTML = '';
  
  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search"></i>
        <p>Aucun produit trouvé dans cette catégorie</p>
      </div>
    `;
    return;
  }
  
  filteredProducts.forEach((product, index) => {
    const card = createProductCard(product);
    card.style.animationDelay = `${index * 0.1}s`;
    grid.appendChild(card);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('data-category', product.category);
  
  const badgeHTML = product.badge 
    ? `<span class="product-badge product-badge-${product.badge.toLowerCase().replace(' ', '-')}">${product.badge}</span>`
    : '';
  
  card.innerHTML = `
    <div class="product-image-wrapper">
      <div class="product-image" style="background: linear-gradient(135deg, ${getGradientForProduct(product.id)});">
        <i class="fas fa-gem"></i>
      </div>
      ${badgeHTML}
      <button class="product-quick-add" data-id="${product.id}" aria-label="Ajouter au panier">
        <i class="fas fa-shopping-bag"></i>
      </button>
    </div>
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">${product.priceDisplay}</span>
        <button class="btn btn-primary product-add-btn" data-id="${product.id}">
          <i class="fas fa-shopping-bag"></i>
          <span>Ajouter</span>
        </button>
      </div>
    </div>
  `;
  
  // Événements
  const addBtn = card.querySelector('.product-add-btn');
  const quickAddBtn = card.querySelector('.product-quick-add');
  
  [addBtn, quickAddBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product, 1);
        animateAddToCart(btn);
      });
    }
  });
  
  return card;
}

function getGradientForProduct(id) {
  const gradients = [
    '#ff8c42, #ffb380',
    '#ffb84d, #ffd4a3',
    '#d4af37, #f4e4bc',
    '#ffa366, #ffe0cc',
    '#ff8c42, #ffe8d6',
    '#e6732e, #ffb380',
    '#ffb84d, #fff5e6',
    '#ffd4a3, #fff8f0',
    '#ffa366, #ffe8d6'
  ];
  return gradients[(id - 1) % gradients.length];
}

// ==========================
// FILTRES
// ==========================

function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      currentFilter = filter;
      
      // Mise à jour UI
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Animation de transition
      const grid = document.getElementById('products-grid');
      if (grid) {
        grid.style.opacity = '0';
        setTimeout(() => {
          renderProducts(filter);
          grid.style.opacity = '1';
        }, 200);
      }
    });
  });
}

// ==========================
// WHATSAPP
// ==========================

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, '_blank');
}

function generateWhatsAppMessage() {
  if (cart.length === 0) {
    return "Bonjour, je suis intéressée par vos bijoux en perles. Pouvez-vous m'en dire plus ?";
  }
  
  let message = "Bonjour, je souhaite commander les articles suivants :\n\n";
  
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   Quantité : ${item.quantity}\n`;
    message += `   Prix unitaire : ${item.priceDisplay}\n`;
    message += `   Sous-total : ${formatPrice(item.price * item.quantity)}\n\n`;
  });
  
  message += `💰 Total : ${formatPrice(getCartTotal())}\n\n`;
  message += "Merci de me confirmer la disponibilité et les modalités de livraison.";
  
  return message;
}

// ==========================
// UTILITAIRES
// ==========================

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function animateAddToCart(button) {
  button.classList.add('animate');
  setTimeout(() => button.classList.remove('animate'), 600);
}

// ==========================
// MENU MOBILE
// ==========================

function setupMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Fermer au clic sur un lien
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// ==========================
// SCROLL SMOOTH & HEADER
// ==========================

function setupScrollEffects() {
  const header = document.getElementById('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (header) {
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    lastScroll = currentScroll;
  });
  
  // Smooth scroll pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==========================
// INITIALISATION
// ==========================

document.addEventListener('DOMContentLoaded', () => {
  // Configuration WhatsApp
  const whatsappDisplay = document.getElementById('whatsapp-display');
  if (whatsappDisplay) {
    whatsappDisplay.textContent = WHATSAPP_DISPLAY;
  }
  
  // Panier
  updateCartUI();
  
  // Boutons panier
  const cartToggle = document.getElementById('cart-toggle');
  const cartClose = document.getElementById('cart-close');
  const cartOverlay = document.getElementById('cart-overlay');
  
  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  
  // Checkout WhatsApp
  const whatsappCheckout = document.getElementById('whatsapp-checkout');
  if (whatsappCheckout) {
    whatsappCheckout.addEventListener('click', () => {
      const message = generateWhatsAppMessage();
      openWhatsApp(message);
      closeCart();
    });
  }
  
  // Boutons WhatsApp globaux
  const whatsappButtons = document.querySelectorAll('.whatsapp-btn:not(#whatsapp-checkout)');
  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const message = generateWhatsAppMessage();
      openWhatsApp(message);
    });
  });
  
  // Bouton WhatsApp flottant
  const whatsappFloat = document.getElementById('whatsapp-float');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', (e) => {
      e.preventDefault();
      const message = generateWhatsAppMessage();
      openWhatsApp(message);
    });
  }
  
  // Produits
  renderProducts();
  setupFilters();
  
  // Menu mobile
  setupMobileMenu();
  
  // Scroll effects
  setupScrollEffects();
  
  // Animation au scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.product-card, .about-card, .contact-box').forEach(el => {
    observer.observe(el);
  });
});