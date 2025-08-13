// ========================
// INICIALIZAÇÃO
// ========================
document.addEventListener("DOMContentLoaded", function () {
  initializeMenu();
  initializeSmoothScrolling();
  initializeAnimations();
  initializeFeedbackSystem();

  // Inicializa funcionalidades específicas da página
  const currentPage = getCurrentPage();
  if (currentPage === "casinha") {
    initializeCasinhaPage();
  }

  // Lazy load do YouTube na home
  initializeYouTubeLazyLoad();

  // Formulário de contato da home
  initializeContactForm();
});

// ========================
// ROTEAMENTO E NAVEGAÇÃO
// ========================
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1);

  if (page === "casinha.html" || page === "casinha") {
    return "casinha";
  } else if (page === "index.html" || page === "" || page === "/") {
    return "home";
  }
  return "home";
}

function navigateTo(page) {
  const baseUrl =
    window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "/");

  if (page === "home") {
    window.location.href = baseUrl + "index.html";
  } else if (page === "casinha") {
    window.location.href = baseUrl + "casinha.html";
  }
}

// Função para redirecionar para seções específicas considerando a página atual
function navigateToSection(sectionId) {
  const currentPage = getCurrentPage();
  const baseUrl =
    window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "/");

  // Se estiver na página da casinha e tentar acessar seções da home
  const homeSections = [
    "home",
    "highlights",
    "services",
    "about",
    "contact",
    "feedback",
  ];
  const casinhaSections = ["galeria", "personalizar"];

  if (currentPage === "casinha" && homeSections.includes(sectionId)) {
    // Redireciona para a página home com a seção específica
    window.location.href = baseUrl + "index.html#" + sectionId;
  } else if (currentPage === "home" && casinhaSections.includes(sectionId)) {
    // Redireciona para a página da casinha com a seção específica
    window.location.href = baseUrl + "casinha.html#" + sectionId;
  } else {
    // Navegação normal dentro da mesma página
    const target = document.querySelector("#" + sectionId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
}

function initializeCasinhaPage() {
  initializeImageGallery();
  initializeMarketplace();
  initializeFAQ();
  initializeCustomization();
}

// ========================
// LAZY LOAD YOUTUBE
// ========================
function initializeYouTubeLazyLoad() {
  const lazyYoutube = document.getElementById("lazy-youtube");
  if (lazyYoutube) {
    const poster = lazyYoutube.querySelector(".video-poster");
    if (poster) {
      poster.addEventListener("click", function () {
        lazyYoutube.innerHTML = `<iframe src="https://www.youtube.com/embed/KTV9ZMeIYkw?si=uyJjebn9JnLGVHSL&autoplay=1&mute=1" title="CM Restauração - Nossos Serviços" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%;height:100%;border-radius:15px;"></iframe>`;
      });
    }
  }
}

// ========================
// MENU MOBILE E NAVEGAÇÃO
// ========================
function initializeMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
}

// ========================
// SMOOTH SCROLLING
// ========================
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute("href").replace("#", "");
      navigateToSection(sectionId);
    });
  });
}

// ========================
// ANIMAÇÕES
// ========================
function initializeAnimations() {
  // Navbar background on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(44, 62, 80, 0.95)";
        navbar.style.backdropFilter = "blur(10px)";
      } else {
        navbar.style.background = "#2c3e50";
        navbar.style.backdropFilter = "none";
      }
    }
  });

  // Intersection Observer para animações no scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observa elementos que devem animar
  document
    .querySelectorAll(".service-card, .highlight-card, .stat-item")
    .forEach((el) => {
      observer.observe(el);
    });
}

// ========================
// GALERIA DE IMAGENS DA CASINHA
// ========================
function openModal(img) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const caption = document.getElementById("modalCaption");

  if (modal && modalImg && caption) {
    modal.style.display = "block";
    modalImg.src = img.src;
    caption.innerHTML = img.alt;

    // Adiciona classe para animação
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
  }
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
}

function initializeImageGallery() {
  // Adiciona eventos de teclado para fechar modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

// ========================
// MARKETPLACE DA CASINHA
// ========================
let currentConfig = {
  size: "grande",
  hasVaranda: false,
  palette: "candy",
  window: "simples",
  door: "simples",
  extras: [],
  customDimensions: {
    width: 1.6,
    length: 1.6,
    height: 2.0,
    hasVeranda: true,
  },
};

let priceData = {
  grande: { base: 3100, varanda: 3500 },
};

function initializeMarketplace() {
  if (getCurrentPage() !== "casinha") return;

  updateTotalPrice();

  // Event listeners para todas as opções
  document.querySelectorAll("[data-option]").forEach((btn) => {
    btn.addEventListener("click", function () {
      handleOptionSelect(this);
    });
  });

  // Event listeners para checkboxes de extras
  document
    .querySelectorAll('input[data-option="extra"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        handleExtraToggle(this);
      });
    });

  // Event listeners especiais para checkboxes de varanda
  document.querySelectorAll("input[data-size]").forEach((checkbox) => {
    checkbox.addEventListener("click", function (e) {
      e.stopPropagation(); // Previne o evento do botão pai
    });

    checkbox.addEventListener("change", function () {
      toggleVarandaInline(this);
    });
  });

  // Previne clique no label da varanda de ativar o botão
  document.querySelectorAll(".option-btn .checkbox-option").forEach((label) => {
    label.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
}

function handleOptionSelect(btn) {
  const option = btn.dataset.option;
  const value = btn.dataset.value;
  const price = parseInt(btn.dataset.price) || 0;

  // Remove active de outros botões do mesmo grupo
  const group = btn.closest(".option-buttons");
  if (group) {
    group
      .querySelectorAll(".option-btn")
      .forEach((b) => b.classList.remove("active"));
  }

  // Adiciona active ao botão clicado
  btn.classList.add("active");

  // Atualiza configuração
  currentConfig[option] = value;

  // Lógica específica para tamanhos
  if (option === "size") {
    handleSizeChange(value);
  }

  updateTotalPrice();
}

function handleSizeChange(size) {
  const customPanel = document.getElementById("customSizePanel");

  if (size === "custom" && customPanel) {
    customPanel.style.display = "block";
    updateCustomDimensions();
  } else if (customPanel) {
    customPanel.style.display = "none";
    currentConfig.size = size;
  }

  // Reset varanda checkboxes
  document.querySelectorAll("[data-size]").forEach((checkbox) => {
    checkbox.checked = false;
  });
  currentConfig.hasVaranda = false;
}

function toggleVarandaInline(checkbox) {
  const size = checkbox.dataset.size;
  currentConfig.hasVaranda = checkbox.checked;

  // Uncheck other varanda checkboxes
  document.querySelectorAll("[data-size]").forEach((cb) => {
    if (cb !== checkbox) cb.checked = false;
  });

  updateTotalPrice();
}

function handleExtraToggle(checkbox) {
  const value = checkbox.dataset.value;

  if (checkbox.checked) {
    if (!currentConfig.extras.includes(value)) {
      currentConfig.extras.push(value);
    }
  } else {
    currentConfig.extras = currentConfig.extras.filter(
      (extra) => extra !== value
    );
  }

  updateTotalPrice();
}

function updateTotalPrice() {
  const totalElement = document.getElementById("totalPrice");
  if (!totalElement) return;

  let total = 0;

  // Preço base do tamanho
  if (currentConfig.size === "custom") {
    total = calculateCustomPrice();
  } else {
    const sizeData = priceData[currentConfig.size];
    total = currentConfig.hasVaranda ? sizeData.varanda : sizeData.base;
  }

  // Adiciona preço das opções
  document.querySelectorAll(".option-btn.active[data-price]").forEach((btn) => {
    const price = parseInt(btn.dataset.price) || 0;
    total += price;
  });

  // Adiciona preço dos extras
  document
    .querySelectorAll('input[data-option="extra"]:checked')
    .forEach((checkbox) => {
      const price = parseInt(checkbox.dataset.price) || 0;
      total += price;
    });

  totalElement.textContent = total.toLocaleString();
}

function calculateCustomPrice() {
  const dims = currentConfig.customDimensions;
  const area = dims.width * dims.length;
  const volume = area * dims.height;

  // Fórmula base: R$ 1000 por m³ + R$ 500 por m² de área
  let basePrice = volume * 1000 + area * 500;

  // Acréscimo por varanda
  if (dims.hasVeranda) {
    const varandaArea = dims.width * 0.6; // 60cm de profundidade
    basePrice += varandaArea * 400;
  }

  return Math.round(basePrice);
}

function updateCustomDimensions() {
  const widthEl = document.getElementById("customWidth");
  const lengthEl = document.getElementById("customLength");
  const heightEl = document.getElementById("customHeight");
  const verandaEl = document.getElementById("includeVeranda");
  const previewEl = document.getElementById("previewText");

  if (!widthEl || !lengthEl || !heightEl || !verandaEl || !previewEl) return;

  const width = parseFloat(widthEl.value);
  const length = parseFloat(lengthEl.value);
  const height = parseFloat(heightEl.value);
  const hasVeranda = verandaEl.checked;

  currentConfig.customDimensions = { width, length, height, hasVeranda };

  // Atualiza preview
  const totalLength = hasVeranda
    ? Math.round((length + 0.6) * 10) / 10
    : length;
  const previewText = `
    Área Útil: ${width}m × ${length}m<br/>
    ${hasVeranda ? `Com Varanda: ${width}m × ${totalLength}m<br/>` : ""}
    Altura: ${height}m
  `;

  previewEl.innerHTML = previewText;
  updateTotalPrice();
}

function applyCustomSize() {
  updateCustomDimensions();
  // Simula clique no botão personalizado para ativar
  const customBtn = document.querySelector('[data-value="custom"]');
  if (customBtn && !customBtn.classList.contains("active")) {
    customBtn.click();
  }
}

// ========================
// SISTEMA DE CORES/PALETAS
// ========================
const palettes = {
  candy: {
    wall: "#E5D0EC",
    roof: "#FFDDE1",
    windows: "#B4D9F5",
    doors: "#C48A85",
    floor: "#F8EFD4",
  },
  nature: {
    wall: "#A8C09C",
    roof: "#4B5B4B",
    windows: "#D9E1E2",
    doors: "#D6C4B0",
    floor: "#DDD6CE",
  },
  classic: {
    wall: "#CBBBA0",
    roof: "#8B5B4A",
    windows: "#B7D9D3",
    doors: "#994F4D",
    floor: "#B8A99A",
  },
  vibrant: {
    wall: "#FF6A13",
    roof: "#012169",
    windows: "#651E38",
    doors: "#D4A017",
    floor: "#F8E08E",
  },
  minimal: {
    wall: "#F5F6F7",
    roof: "#A2AAAD",
    windows: "#D9E1E2",
    doors: "#1F2A44",
    floor: "#DDD6CE",
  },
};

function selectPalette(paletteName) {
  // Remove active de outras paletas
  document.querySelectorAll(".palette-card").forEach((card) => {
    card.classList.remove("active");
  });

  // Ativa paleta selecionada
  const selectedCard = document.querySelector(
    `[data-palette="${paletteName}"]`
  );
  if (selectedCard) {
    selectedCard.classList.add("active");
  }

  currentConfig.palette = paletteName;

  // Atualiza controles de cor personalizados
  const palette = palettes[paletteName];
  const wallEl = document.getElementById("customWall");
  const roofEl = document.getElementById("customRoof");
  const windowsEl = document.getElementById("customWindows");
  const doorsEl = document.getElementById("customDoors");
  const floorEl = document.getElementById("customFloor");

  if (wallEl) wallEl.value = palette.wall;
  if (roofEl) roofEl.value = palette.roof;
  if (windowsEl) windowsEl.value = palette.windows;
  if (doorsEl) doorsEl.value = palette.doors;
  if (floorEl) floorEl.value = palette.floor;

  updatePalettePreview();
}

function toggleColorCustomization() {
  const section = document.getElementById("paletteCustomization");
  const icon = document.getElementById("expandColorsIcon");
  const text = document.getElementById("expandColorsText");

  if (!section || !icon || !text) return;

  if (section.style.display === "none" || !section.style.display) {
    section.style.display = "block";
    icon.style.transform = "rotate(180deg)";
    text.textContent = "Ocultar personalização de cores";
  } else {
    section.style.display = "none";
    icon.style.transform = "rotate(0deg)";
    text.textContent = "Não é o que queria? Escolha sua cor aqui";
  }
}

function updatePalettePreview() {
  const preview = document.getElementById("mainPalettePreview");
  if (!preview) return;

  const strips = preview.querySelectorAll(".color-strip");
  const wallEl = document.getElementById("customWall");
  const roofEl = document.getElementById("customRoof");
  const windowsEl = document.getElementById("customWindows");
  const doorsEl = document.getElementById("customDoors");
  const floorEl = document.getElementById("customFloor");

  if (
    strips.length >= 5 &&
    wallEl &&
    roofEl &&
    windowsEl &&
    doorsEl &&
    floorEl
  ) {
    strips[0].style.background = wallEl.value;
    strips[1].style.background = roofEl.value;
    strips[2].style.background = windowsEl.value;
    strips[3].style.background = doorsEl.value;
    strips[4].style.background = floorEl.value;
  }
}

function applyCurrentPalette() {
  const wallEl = document.getElementById("customWall");
  const roofEl = document.getElementById("customRoof");
  const windowsEl = document.getElementById("customWindows");
  const doorsEl = document.getElementById("customDoors");
  const floorEl = document.getElementById("customFloor");

  if (!wallEl || !roofEl || !windowsEl || !doorsEl || !floorEl) return;

  // Salva paleta personalizada
  currentConfig.customPalette = {
    wall: wallEl.value,
    roof: roofEl.value,
    windows: windowsEl.value,
    doors: doorsEl.value,
    floor: floorEl.value,
  };

  // Feedback visual
  const button = document.querySelector(".btn-apply-palette");
  if (button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Paleta Aplicada!';
    button.style.background = "#27ae60";

    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = "";
    }, 2000);
  }
}

// ========================
// MUDANÇA DE IMAGEM PRINCIPAL
// ========================
function changeMainImage(thumbnail) {
  const mainImage = document.getElementById("mainImage");
  const currentActive = document.querySelector(".thumbnail.active");

  if (!mainImage) return;

  // Remove active da thumbnail atual
  if (currentActive) {
    currentActive.classList.remove("active");
  }

  // Adiciona active à nova thumbnail
  thumbnail.classList.add("active");

  // Muda a imagem principal com efeito
  mainImage.style.opacity = "0.5";
  setTimeout(() => {
    mainImage.src = thumbnail.src;
    mainImage.alt = thumbnail.alt;
    mainImage.style.opacity = "1";
  }, 200);
}

// ========================
// REDIRECIONAMENTOS DOS DESTAQUES
// ========================
function openMarketplace(productType) {
  if (productType === "casinha-boneca") {
    navigateTo("casinha");
  }
}

function openContact(serviceType) {
  // Redireciona para seção de contato com serviço pré-selecionado
  navigateToSection("contact");

  // Aguarda um pouco para a página carregar e então seleciona o serviço
  setTimeout(() => {
    const serviceSelect = document.querySelector("#contactForm select");
    if (serviceSelect) {
      const serviceMap = {
        restauracao: "Restauração",
        montagem: "Montagem/Desmontagem",
      };

      const serviceName = serviceMap[serviceType];
      if (serviceName) {
        for (let option of serviceSelect.options) {
          if (option.text.includes(serviceName)) {
            option.selected = true;
            break;
          }
        }
      }
    }
  }, 500);
}

// ========================
// FINALIZAÇÃO DE COMPRA
// ========================
function finalizePurchase() {
  const config = currentConfig;
  let message = "🏠 *PEDIDO DE CASINHA DE BONECA* 🏠\n\n";

  // Configuração de tamanho
  if (config.size === "custom") {
    const dims = config.customDimensions;
    message += `📏 *Tamanho:* Personalizado\n`;
    message += `   • Área Útil: ${dims.width}m × ${dims.length}m\n`;
    message += `   • Altura: ${dims.height}m\n`;
    if (dims.hasVeranda) {
      message += `   • Com Varanda (+60cm)\n`;
    }
  } else {
    message += `📏 *Tamanho:* ${
      config.size.charAt(0).toUpperCase() + config.size.slice(1)
    }\n`;
    if (config.hasVaranda) {
      message += `   • Com Varanda\n`;
    }
  }

  // Paleta de cores
  const paletteNames = {
    candy: "🧁 Doce & Infantil",
    nature: "🌿 Natureza & Tranquilidade",
    classic: "🏛️ Clássico & Elegante",
    vibrant: "🌈 Vibrante & Criativo",
    minimal: "⚡ Minimalista & Moderno",
  };
  message += `\n🎨 *Cores:* ${paletteNames[config.palette]}\n`;

  if (config.customPalette) {
    message += `   • Personalizada aplicada\n`;
  }

  // Opções
  message += `\n🪟 *Janelas:* ${config.window}\n`;
  message += `🚪 *Portas:* ${config.door}\n`;

  // Extras
  if (config.extras.length > 0) {
    message += `\n✨ *Extras:*\n`;
    const extraNames = {
      jardim: "🌱 Jardim Lateral",
      cerca: "🚧 Cercadinho Completo",
      luz: "💡 Kit Iluminação LED",
      mobilia: "🪑 Mobília Interna",
    };
    config.extras.forEach((extra) => {
      message += `   • ${extraNames[extra]}\n`;
    });
  }

  // Preço total
  const totalElement = document.getElementById("totalPrice");
  const total = totalElement ? totalElement.textContent : "0";
  message += `\n💰 *TOTAL: R$ ${total}*\n\n`;
  message += `📍 Quero fazer o pedido desta casinha!\n`;
  message += `📞 Entraremos em contato para confirmar detalhes e prazo de entrega.`;

  // Envia para WhatsApp
  const whatsappUrl = `https://wa.me/5543999809090?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");
}

// ========================
// FAQ DA CASINHA
// ========================
function initializeFAQ() {
  // FAQ já funciona com a função toggleFaq existente
}

function toggleFaq(element) {
  const faqItem = element.closest(".faq-item");
  const answer = faqItem.querySelector(".faq-answer");
  const icon = element.querySelector("i");

  if (!faqItem || !answer || !icon) return;

  // Toggle da resposta
  if (answer.style.maxHeight && answer.style.maxHeight !== "0px") {
    answer.style.maxHeight = "0px";
    icon.style.transform = "rotate(0deg)";
    faqItem.classList.remove("active");
  } else {
    answer.style.maxHeight = answer.scrollHeight + "px";
    icon.style.transform = "rotate(180deg)";
    faqItem.classList.add("active");
  }
}

function initializeCustomization() {
  // Event listeners para dimensões personalizadas
  const dimensionInputs = [
    "customWidth",
    "customLength",
    "customHeight",
    "includeVeranda",
  ];
  dimensionInputs.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("input", updateCustomDimensions);
      element.addEventListener("change", updateCustomDimensions);
    }
  });
}

// ========================
// FORMULÁRIO DE CONTATO (HOME)
// ========================
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const service = this.querySelector("select").value;
    const message = this.querySelector("textarea").value;

    let whatsappMessage = `Olá! Gostaria de solicitar um orçamento:\n\n`;
    whatsappMessage += `📋 *Dados do Cliente:*\n`;
    whatsappMessage += `Nome: ${name}\n`;
    whatsappMessage += `Telefone: ${phone}\n\n`;
    whatsappMessage += `🔧 *Serviço Desejado:* ${service}\n\n`;
    whatsappMessage += `💬 *Mensagem:*\n${message}`;

    const whatsappUrl = `https://wa.me/5543999809090?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappUrl, "_blank");

    // Reset form
    this.reset();
    alert("Redirecionando para o WhatsApp...");
  });
}

// ========================
// SISTEMA DE FEEDBACK
// ========================
function initializeFeedbackSystem() {
  const feedbackForm = document.getElementById("feedbackForm");
  if (!feedbackForm) return;

  // Inicializa sistema de estrelas
  initializeStarRating();

  // Event listener para o formulário
  feedbackForm.addEventListener("submit", handleFeedbackSubmission);
}

function initializeStarRating() {
  const stars = document.querySelectorAll(".star-rating .star");
  const ratingInput = document.getElementById("rating");

  if (!stars.length || !ratingInput) return;

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => highlightStars(index + 1));
    star.addEventListener("mouseout", () => resetStars());
    star.addEventListener("click", () => setRating(index + 1));
  });

  function highlightStars(rating) {
    stars.forEach((star, index) => {
      star.classList.toggle("hovered", index < rating);
    });
  }

  function resetStars() {
    const currentRating = parseInt(ratingInput.value) || 0;
    stars.forEach((star, index) => {
      star.classList.remove("hovered");
      star.classList.toggle("selected", index < currentRating);
    });
  }

  function setRating(rating) {
    ratingInput.value = rating;
    stars.forEach((star, index) => {
      star.classList.toggle("selected", index < rating);
    });
  }
}

function handleFeedbackSubmission(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name = formData.get("name");
  const rating = formData.get("rating");
  const comment = formData.get("comment");

  // Validação
  if (!name || !rating || !comment) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  if (rating < 1 || rating > 5) {
    alert("Por favor, selecione uma avaliação de 1 a 5 estrelas.");
    return;
  }

  // Monta mensagem para WhatsApp
  let whatsappMessage = `⭐ *AVALIAÇÃO DO SERVIÇO* ⭐\n\n`;
  whatsappMessage += `👤 *Cliente:* ${name}\n`;
  whatsappMessage += `⭐ *Avaliação:* ${rating}/5 estrelas\n\n`;
  whatsappMessage += `💬 *Comentário:*\n${comment}\n\n`;
  whatsappMessage += `📅 *Data:* ${new Date().toLocaleDateString("pt-BR")}`;

  // Envia para WhatsApp
  const whatsappUrl = `https://wa.me/5543999809090?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  window.open(whatsappUrl, "_blank");

  // Reset form e feedback visual
  e.target.reset();
  document.getElementById("rating").value = "";
  document.querySelectorAll(".star").forEach((star) => {
    star.classList.remove("selected");
  });

  alert("Obrigado pela sua avaliação! Redirecionando para o WhatsApp...");
}
