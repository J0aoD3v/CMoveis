// Lazy load do vídeo do YouTube na home
document.addEventListener("DOMContentLoaded", function () {
  const lazyYoutube = document.getElementById("lazy-youtube");
  if (lazyYoutube) {
    const poster = lazyYoutube.querySelector(".video-poster");
    if (poster) {
      poster.addEventListener("click", function () {
        lazyYoutube.innerHTML = `<iframe src=\"https://www.youtube.com/embed/KTV9ZMeIYkw?si=uyJjebn9JnLGVHSL&autoplay=1&mute=1\" title=\"CM Restauração - Nossos Serviços\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen style=\"width:100%;height:100%;border-radius:15px;\"></iframe>`;
      });
    }
  }
});
// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const name = this.querySelector('input[type="text"]').value;
  const message = this.querySelector("textarea").value;

  // Create WhatsApp message without phone
  const whatsappMessage = `Ola! Meu nome e ${name}. ${message}`;
  const whatsappURL = `https://wa.me/5543999809090?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Open WhatsApp
  window.open(whatsappURL, "_blank");

  // Reset form
  this.reset();

  // Show success message
  alert("Redirecionando para o WhatsApp...");
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(44, 62, 80, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "#2c3e50";
    navbar.style.backdropFilter = "none";
  }
});

// Animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
    }
  });
}, observerOptions);

// Observe service cards and other elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".service-card, .contact-item, .feature, .highlight-card"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transition = "opacity 0.6s ease";
    observer.observe(el);
  });

  // Initialize marketplace state
  updateSizeDisplay();
});

// Click to call functionality
document.querySelectorAll(".contact-item").forEach((item) => {
  const phone = item.querySelector("p");
  if (phone && phone.textContent.includes("(43)")) {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      const phoneNumber = phone.textContent.replace(/\D/g, "");
      const whatsappURL = `https://wa.me/55${phoneNumber}`;
      window.open(whatsappURL, "_blank");
    });
  }
});

// Loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Marketplace functionality
let currentSelection = {
  size: "pequena",
  varandaStates: {
    pequena: false,
    media: false,
    grande: false,
  },
  customSize: {
    width: 1.2,
    length: 1.2,
    height: 1.8,
    hasVeranda: true,
  },
  palette: "candy",
  customPalette: null,
  window: "simples",
  door: "simples",
  extras: [],
};

let basePrices = {
  pequena: 1800,
  media: 2400,
  grande: 3100,
  custom: 0, // Will be calculated based on dimensions
};

let varandaPrices = {
  pequena: 400,
  media: 400,
  grande: 400,
};

// Pantone Color Palettes
const pantonePalettes = {
  candy: {
    name: "🧁 Doce & Infantil",
    description: "Candy/Pastel",
    colors: {
      wall: { name: "Pantone 9280 C (Lilac Hint)", hex: "#E5D0EC" },
      roof: { name: "Pantone 705 C", hex: "#FFDDE1" },
      windows: { name: "Pantone 290 C", hex: "#B4D9F5" },
      doors: { name: "Pantone 7606 C", hex: "#C48A85" },
      floor: { name: "Pantone 7499 C", hex: "#F8EFD4" },
      fence: { name: "Pantone 670 C", hex: "#E4A9C3" },
    },
  },
  nature: {
    name: "🌿 Natureza & Tranquilidade",
    description: "Calm/Zen",
    colors: {
      wall: { name: "Pantone 7494 C", hex: "#A8C09C" },
      roof: { name: "Pantone 5535 C", hex: "#4B5B4B" },
      windows: { name: "Pantone 7541 C", hex: "#D9E1E2" },
      doors: { name: "Pantone 7528 C", hex: "#D6C4B0" },
      floor: { name: "Pantone 7527 C", hex: "#DDD6CE" },
      fence: { name: "Pantone 5565 C", hex: "#B6C8B1" },
    },
  },
  classic: {
    name: "🏛️ Clássico & Elegante",
    description: "Colonial/Antigo",
    colors: {
      wall: { name: "Pantone 7529 C", hex: "#CBBBA0" },
      roof: { name: "Pantone 7596 C", hex: "#8B5B4A" },
      windows: { name: "Pantone 5493 C", hex: "#B7D9D3" },
      doors: { name: "Pantone 1807 C", hex: "#994F4D" },
      floor: { name: "Pantone 7530 C", hex: "#B8A99A" },
      fence: { name: "Pantone 7531 C", hex: "#85715E" },
    },
  },
  vibrant: {
    name: "🌈 Vibrante & Criativo",
    description: "Lúdico/Artesanal",
    colors: {
      wall: { name: "Pantone 165 C", hex: "#FF6A13" },
      roof: { name: "Pantone 280 C", hex: "#012169" },
      windows: { name: "Pantone 229 C", hex: "#651E38" },
      doors: { name: "Pantone 110 C", hex: "#D4A017" },
      floor: { name: "Pantone 7401 C", hex: "#F8E08E" },
      fence: { name: "Pantone 297 C", hex: "#71C5E8" },
    },
  },
  minimal: {
    name: "⚡ Minimalista & Moderno",
    description: "Escandinavo",
    colors: {
      wall: { name: "Pantone Cool Gray 1 C", hex: "#F5F6F7" },
      roof: { name: "Pantone 430 C", hex: "#A2AAAD" },
      windows: { name: "Pantone 7541 C", hex: "#D9E1E2" },
      doors: { name: "Pantone 432 C", hex: "#1F2A44" },
      floor: { name: "Pantone 7527 C", hex: "#DDD6CE" },
      fence: { name: "Pantone 429 C", hex: "#B1B3B3" },
    },
  },
};

function openMarketplace(product) {
  document.getElementById("marketplace").style.display = "block";
  document.getElementById("marketplace").scrollIntoView({ behavior: "smooth" });
  calculatePrice();
  // Initialize palette on first open
  loadPaletteToControls("candy");
}

function closeMarketplace() {
  document.getElementById("marketplace").style.display = "none";
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
}

// Palette Functions
function selectPalette(paletteKey) {
  // Remove active from all palette cards
  document.querySelectorAll(".palette-card").forEach((card) => {
    card.classList.remove("active");
  });

  // Add active to selected palette
  document
    .querySelector(`[data-palette="${paletteKey}"]`)
    .classList.add("active");

  // Update current selection
  currentSelection.palette = paletteKey;
  currentSelection.customPalette = null;

  // Load palette colors into the customization controls
  loadPaletteToControls(paletteKey);

  console.log("Paleta selecionada:", paletteKey);
}

function loadPaletteToControls(paletteKey) {
  const palette = pantonePalettes[paletteKey];
  if (!palette) return;

  // Update color inputs with palette colors
  document.getElementById("customWall").value = palette.colors.wall.hex;
  document.getElementById("customRoof").value = palette.colors.roof.hex;
  document.getElementById("customWindows").value = palette.colors.windows.hex;
  document.getElementById("customDoors").value = palette.colors.doors.hex;
  document.getElementById("customFloor").value = palette.colors.floor.hex;

  // Update the preview
  updatePalettePreview();
}

function updatePalettePreview() {
  const preview = document.getElementById("mainPalettePreview");
  if (!preview) return;

  const parts = ["Wall", "Roof", "Windows", "Doors", "Floor"];
  const strips = preview.querySelectorAll(".color-strip");

  parts.forEach((part, index) => {
    const input = document.getElementById(`custom${part}`);
    if (input && strips[index]) {
      strips[index].style.background = input.value;
    }
  });
}

function applyCurrentPalette() {
  const customColors = {
    wall: document.getElementById("customWall").value,
    roof: document.getElementById("customRoof").value,
    windows: document.getElementById("customWindows").value,
    doors: document.getElementById("customDoors").value,
    floor: document.getElementById("customFloor").value,
  };

  currentSelection.customPalette = customColors;
  currentSelection.palette = "custom";

  // Remove active from predefined palettes
  document.querySelectorAll(".palette-card").forEach((card) => {
    card.classList.remove("active");
  });

  // Visual feedback
  const button = document.querySelector(".btn-apply-palette");
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-check"></i> Paleta Aplicada!';
  button.style.background = "linear-gradient(135deg, #27ae60, #2ecc71)";

  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = "linear-gradient(135deg, #f39c12, #e67e22)";
  }, 2000);

  console.log("Paleta aplicada:", customColors);
}

function openContact(service) {
  // Create service request form
  const customerName = prompt("Digite seu nome:");
  if (!customerName) return;

  let serviceDetails = "";
  let locationInfo = "";

  if (service === "restauracao") {
    // Specific questions for restoration service
    const furnitureType = prompt(
      "Que tipo de móvel precisa restaurar? (Ex: mesa, cadeira, armário, etc.)"
    );
    if (!furnitureType) return;

    const furnitureCondition = prompt(
      "Qual o estado atual do móvel? (Ex: riscado, desbotado, quebrado, etc.)"
    );
    if (!furnitureCondition) return;

    const desiredFinish = prompt(
      "Que tipo de acabamento deseja? (Ex: verniz natural, cor específica, etc.)"
    );
    if (!desiredFinish) return;

    // Ask for delivery/pickup preference for restoration
    const serviceLocation = confirm(
      "Escolha o local do serviço:\n\nOK = Buscar e entregar no meu endereço\nCancelar = Levar até a CM Restauração"
    );

    if (serviceLocation) {
      // Service with pickup and delivery
      const street = prompt("Rua/Avenida:");
      if (!street) return;

      const number = prompt("Número:");
      if (!number) return;

      const neighborhood = prompt("Bairro:");
      if (!neighborhood) return;

      const city = prompt("Cidade:");
      if (!city) return;

      const complement = prompt(
        "Complemento (opcional - apartamento, bloco, etc):"
      );

      locationInfo = `BUSCA E ENTREGA NO ENDEREÇO:\n`;
      locationInfo += `${street}, ${number}\n`;
      if (complement) locationInfo += `${complement}\n`;
      locationInfo += `${neighborhood} - ${city}\n`;
    } else {
      // Customer brings items to workshop
      locationInfo = `ENTREGA NA OFICINA:\n`;
      locationInfo += `Cliente levará até a CM Restauração de Móveis\n`;
      locationInfo += `Região de Londrina\n`;
    }

    serviceDetails = `TIPO DE MÓVEL: ${furnitureType}\n`;
    serviceDetails += `ESTADO ATUAL: ${furnitureCondition}\n`;
    serviceDetails += `ACABAMENTO DESEJADO: ${desiredFinish}\n`;
  } else if (service === "montagem") {
    // Specific questions for assembly service
    const furnitureToAssemble = prompt(
      "Que móvel precisa montar? (Ex: guarda-roupa, cama, estante, etc.)"
    );
    if (!furnitureToAssemble) return;

    const furnitureBrand = prompt(
      "Qual a marca/loja? (Ex: Casas Bahia, Magazine Luiza, etc.)"
    );
    if (!furnitureBrand) return;

    const hasInstructions = confirm(
      "Tem o manual de instruções?\n\nOK = Sim\nCancelar = Não"
    );

    // Ask for service location for assembly
    const serviceLocation = confirm(
      "Escolha o local da montagem:\n\nOK = No meu endereço\nCancelar = Levar até a CM Restauração para montar"
    );

    if (serviceLocation) {
      // Assembly at customer's location
      const street = prompt("Rua/Avenida:");
      if (!street) return;

      const number = prompt("Número:");
      if (!number) return;

      const neighborhood = prompt("Bairro:");
      if (!neighborhood) return;

      const city = prompt("Cidade:");
      if (!city) return;

      const complement = prompt(
        "Complemento (opcional - apartamento, bloco, etc):"
      );

      locationInfo = `MONTAGEM NO ENDEREÇO:\n`;
      locationInfo += `${street}, ${number}\n`;
      if (complement) locationInfo += `${complement}\n`;
      locationInfo += `${neighborhood} - ${city}\n`;
    } else {
      // Customer brings items to workshop
      locationInfo = `MONTAGEM NA OFICINA:\n`;
      locationInfo += `Cliente levará até a CM Restauração de Móveis\n`;
      locationInfo += `Região de Londrina\n`;
    }

    serviceDetails = `MÓVEL PARA MONTAR: ${furnitureToAssemble}\n`;
    serviceDetails += `MARCA/LOJA: ${furnitureBrand}\n`;
    serviceDetails += `MANUAL DE INSTRUÇÕES: ${
      hasInstructions ? "Sim" : "Não"
    }\n`;
  } else {
    // Generic service form for other services
    const additionalInfo = prompt("Descreva o serviço que precisa:");
    if (!additionalInfo) return;

    // Ask for delivery/pickup preference
    const serviceLocation = confirm(
      "Escolha o local do serviço:\n\nOK = No meu endereço\nCancelar = Levar até a CM Restauração"
    );

    if (serviceLocation) {
      // Service at customer's location
      const street = prompt("Rua/Avenida:");
      if (!street) return;

      const number = prompt("Número:");
      if (!number) return;

      const neighborhood = prompt("Bairro:");
      if (!neighborhood) return;

      const city = prompt("Cidade:");
      if (!city) return;

      const complement = prompt(
        "Complemento (opcional - apartamento, bloco, etc):"
      );

      locationInfo = `ATENDIMENTO NO ENDEREÇO:\n`;
      locationInfo += `${street}, ${number}\n`;
      if (complement) locationInfo += `${complement}\n`;
      locationInfo += `${neighborhood} - ${city}\n`;
    } else {
      // Customer brings items to workshop
      locationInfo = `ATENDIMENTO NA OFICINA:\n`;
      locationInfo += `Cliente levará até a CM Restauração de Móveis\n`;
      locationInfo += `Região de Londrina\n`;
    }

    serviceDetails = `DESCRIÇÃO DO SERVIÇO:\n${additionalInfo}\n`;
  }

  // Create WhatsApp message
  let message = "";
  switch (service) {
    case "restauracao":
      message = "SOLICITAÇÃO DE RESTAURAÇÃO\n\n";
      break;
    case "montagem":
      message = "SOLICITAÇÃO DE MONTAGEM\n\n";
      break;
    default:
      message = `SOLICITAÇÃO DE SERVIÇO\n\n`;
  }

  message += `Cliente: ${customerName}\n\n`;
  message += locationInfo + `\n`;
  message += serviceDetails + `\n`;
  message += `Aguardo contato para agendamento e orçamento!`;

  const whatsappURL = `https://wa.me/5543999809090?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, "_blank");

  alert("Solicitação enviada! Redirecionando para o WhatsApp...");
}

// Gallery functionality
function changeMainImage(thumbnail) {
  const mainImage = document.getElementById("mainImage");
  if (mainImage) {
    mainImage.src = thumbnail.src;
  }

  // Update active thumbnail
  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.classList.remove("active");
  });
  thumbnail.classList.add("active");
}

// Option selection functionality
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("option-btn") ||
    e.target.closest(".option-btn")
  ) {
    const button = e.target.classList.contains("option-btn")
      ? e.target
      : e.target.closest(".option-btn");
    const optionType = button.dataset.option;
    const optionValue = button.dataset.value;

    // Remove active class from siblings in the same group
    const parent = button.closest(".option-buttons") || button.parentNode;
    parent.querySelectorAll(".option-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to clicked button
    button.classList.add("active");

    // Update selection
    currentSelection[optionType] = optionValue;

    // Show/hide custom size panel
    if (optionType === "size") {
      const customPanel = document.getElementById("customSizePanel");
      if (optionValue === "custom") {
        customPanel.style.display = "block";
        updateCustomSizePreview();
      } else {
        customPanel.style.display = "none";
        updateSizeDisplay();
      }
    }

    calculatePrice();
  }
});

// Handle checkboxes
document.addEventListener("change", (e) => {
  if (e.target.type === "checkbox" && e.target.dataset.option === "extra") {
    const extraValue = e.target.dataset.value;

    if (e.target.checked) {
      if (!currentSelection.extras.includes(extraValue)) {
        currentSelection.extras.push(extraValue);
      }
    } else {
      currentSelection.extras = currentSelection.extras.filter(
        (extra) => extra !== extraValue
      );
    }

    calculatePrice();
  }

  // Handle custom size inputs
  if (
    e.target.id === "includeVeranda" ||
    e.target.id === "customWidth" ||
    e.target.id === "customLength" ||
    e.target.id === "customHeight"
  ) {
    updateCustomSizePreview();
  }
});

// Custom size functions
function updateCustomSizePreview() {
  const width = parseFloat(document.getElementById("customWidth").value) || 1.2;
  const length =
    parseFloat(document.getElementById("customLength").value) || 1.2;
  const height =
    parseFloat(document.getElementById("customHeight").value) || 1.8;
  const hasVeranda = document.getElementById("includeVeranda").checked;

  currentSelection.customSize = { width, length, height, hasVeranda };

  const previewText = document.getElementById("previewText");
  if (previewText) {
    const totalLength = hasVeranda ? length + 0.6 : length;
    previewText.innerHTML = `
      Área Útil: ${width.toFixed(1)}m × ${length.toFixed(1)}m<br>
      ${
        hasVeranda
          ? `Com Varanda: ${width.toFixed(1)}m × ${totalLength.toFixed(1)}m<br>`
          : ""
      }
      Altura: ${height.toFixed(1)}m
    `;
  }
}

function applyCustomSize() {
  // Update the current selection
  updateCustomSizePreview();

  // Calculate custom price
  calculatePrice();

  // Visual feedback
  const button = document.querySelector(".btn-apply-size");
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-check"></i> Dimensões Aplicadas!';
  button.style.background = "linear-gradient(135deg, #27ae60, #2ecc71)";

  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = "linear-gradient(135deg, #3498db, #2980b9)";
  }, 2000);
}

function toggleVarandaInline(checkbox) {
  const size = checkbox.dataset.size;
  currentSelection.varandaStates[size] = checkbox.checked;

  // Update display for this specific size and calculate price
  updateSizeDisplayForButton(size);
  calculatePrice();
}

function updateSizeDisplayForButton(size) {
  const button = document.querySelector(`[data-value="${size}"]`);
  if (!button) return;

  const priceDisplay = button.querySelector(".price-display");
  const varandaInfo = button.querySelector(".varanda-info");
  const basePrice = parseInt(button.dataset.price);
  const varandaPrice = varandaPrices[size] || 400;
  const hasVaranda = currentSelection.varandaStates[size];

  if (hasVaranda) {
    const totalPrice = basePrice + varandaPrice;
    priceDisplay.textContent = `R$ ${totalPrice.toLocaleString("pt-BR")}`;

    // Update dimensions info
    let dimensions = "";
    if (size === "pequena") {
      dimensions = "🏡 Com Varanda: 1,20m × 1,80m • 📏 Altura: 1,80m";
    } else if (size === "media") {
      dimensions = "🏡 Com Varanda: 1,40m × 2,00m • 📏 Altura: 2,00m";
    } else if (size === "grande") {
      dimensions = "🏡 Com Varanda: 1,60m × 2,20m • 📏 Altura: 2,00m";
    }
    varandaInfo.textContent = dimensions;
  } else {
    priceDisplay.textContent = `R$ ${basePrice.toLocaleString("pt-BR")}`;

    // Update dimensions info
    let dimensions = "";
    if (size === "pequena") {
      dimensions = "📏 Altura: 1,80m";
    } else if (size === "media") {
      dimensions = "📏 Altura: 2,00m";
    } else if (size === "grande") {
      dimensions = "📏 Altura: 2,00m";
    }
    varandaInfo.textContent = dimensions;
  }
}

// Função legacy removida - agora usamos toggleVarandaInline
function toggleVaranda() {
  // Não usada mais
}

function updateSizeDisplay() {
  // Atualiza todas as opções de tamanho
  ["pequena", "media", "grande"].forEach((size) => {
    updateSizeDisplayForButton(size);
  });
}

function calculatePrice() {
  let total = basePrices[currentSelection.size] || 1800;

  // Add varanda price if selected for current size
  if (
    currentSelection.size !== "custom" &&
    currentSelection.varandaStates[currentSelection.size]
  ) {
    total += varandaPrices[currentSelection.size] || 400;
  }

  // Calculate custom size price
  if (currentSelection.size === "custom") {
    const { width, length, height, hasVeranda } = currentSelection.customSize;
    const totalLength = hasVeranda ? length + 0.6 : length;
    const volume = width * totalLength * height;

    // Base price calculation: R$ 1000 per cubic meter + base cost
    const baseCustomPrice = Math.round(volume * 1000 + 1500);
    total = Math.max(baseCustomPrice, 2000); // Minimum R$ 2000
  }

  // Add extra prices
  currentSelection.extras.forEach((extra) => {
    const checkbox = document.querySelector(`input[data-value="${extra}"]`);
    if (checkbox) {
      const extraPrice = parseInt(checkbox.dataset.price) || 0;
      total += extraPrice;
    }
  });

  // Add window and door prices
  const activeWindow = document.querySelector(
    '.option-btn.active[data-option="window"]'
  );
  if (activeWindow) {
    const windowPrice = parseInt(activeWindow.dataset.price) || 0;
    total += windowPrice;
  }

  const activeDoor = document.querySelector(
    '.option-btn.active[data-option="door"]'
  );
  if (activeDoor) {
    const doorPrice = parseInt(activeDoor.dataset.price) || 0;
    total += doorPrice;
  }

  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    totalPriceElement.textContent = total.toLocaleString("pt-BR");
  }
}

function finalizePurchase() {
  const customerName = prompt("Digite seu nome:");
  if (!customerName) return;

  // Ask for delivery preference
  const deliveryChoice = confirm(
    "Escolha a forma de entrega:\n\nOK = Entregar no meu endereço\nCancelar = Retirar na CM Restauração"
  );

  let deliveryInfo = "";

  if (deliveryChoice) {
    // Customer wants delivery - collect address
    const street = prompt("Rua/Avenida:");
    if (!street) return;

    const number = prompt("Número:");
    if (!number) return;

    const neighborhood = prompt("Bairro:");
    if (!neighborhood) return;

    const city = prompt("Cidade:");
    if (!city) return;

    const complement = prompt(
      "Complemento (opcional - apartamento, bloco, etc):"
    );

    deliveryInfo = `ENTREGA NO ENDEREÇO:\n`;
    deliveryInfo += `${street}, ${number}\n`;
    if (complement) deliveryInfo += `${complement}\n`;
    deliveryInfo += `${neighborhood} - ${city}\n`;
  } else {
    // Customer will pick up
    deliveryInfo = `RETIRADA NO LOCAL:\n`;
    deliveryInfo += `Cliente retirará na CM Restauração de Móveis\n`;
  }

  // Format the order
  let orderMessage = `PEDIDO CASINHA DE BONECA\n\n`;
  orderMessage += `Cliente: ${customerName}\n\n`;
  orderMessage += `DETALHES DO PEDIDO:\n`;

  // Size with dimensions
  if (currentSelection.size === "custom") {
    const { width, length, height, hasVeranda } = currentSelection.customSize;
    const totalLength = hasVeranda ? length + 0.6 : length;
    orderMessage += `Tamanho: Personalizado\n`;
    orderMessage += `Area Util: ${width.toFixed(1)}m x ${length.toFixed(1)}m\n`;
    if (hasVeranda) {
      orderMessage += `Com Varanda: ${width.toFixed(
        1
      )}m x ${totalLength.toFixed(1)}m\n`;
    }
    orderMessage += `Altura: ${height.toFixed(1)}m\n`;
  } else {
    const sizeText = {
      pequena:
        "Pequena - Area Util: 1,2x1,2m | Com Varanda: 1,2x1,8m | Alt: 1,8m",
      media: "Media - Area Util: 1,4x1,4m | Com Varanda: 1,4x2,0m | Alt: 2,0m",
      grande:
        "Grande - Area Util: 1,6x1,6m | Com Varanda: 1,6x2,2m | Alt: 2,0m",
    };
    orderMessage += `Tamanho: ${
      sizeText[currentSelection.size] || currentSelection.size
    }\n`;
  }

  // Palette information
  if (currentSelection.palette === "custom" && currentSelection.customPalette) {
    orderMessage += `Paleta: Personalizada\n`;
    orderMessage += `Parede: ${currentSelection.customPalette.wall}\n`;
    orderMessage += `Telhado: ${currentSelection.customPalette.roof}\n`;
    orderMessage += `Janelas: ${currentSelection.customPalette.windows}\n`;
    orderMessage += `Portas: ${currentSelection.customPalette.doors}\n`;
    orderMessage += `Piso: ${currentSelection.customPalette.floor}\n`;
  } else if (pantonePalettes[currentSelection.palette]) {
    const palette = pantonePalettes[currentSelection.palette];
    orderMessage += `Paleta: ${palette.description}\n`;
  }

  orderMessage += `Janela: ${
    currentSelection.window.charAt(0).toUpperCase() +
    currentSelection.window.slice(1)
  }\n`;
  orderMessage += `Porta: ${
    currentSelection.door.charAt(0).toUpperCase() +
    currentSelection.door.slice(1)
  }\n`;

  if (currentSelection.extras.length > 0) {
    orderMessage += `Extras: ${currentSelection.extras
      .map((extra) => {
        const extraNames = {
          varanda: "Varanda Ampliada",
          jardim: "Jardim Lateral",
          cerca: "Cercadinho Completo",
          luz: "Kit Iluminacao LED",
          mobilia: "Mobilia Interna",
        };
        return (
          extraNames[extra] || extra.charAt(0).toUpperCase() + extra.slice(1)
        );
      })
      .join(", ")}\n`;
  }

  const totalPriceElement = document.getElementById("totalPrice");
  const totalPrice = totalPriceElement
    ? totalPriceElement.textContent
    : "2.200";
  orderMessage += `\nTOTAL: R$ ${totalPrice}\n\n`;

  // Add delivery information
  orderMessage += deliveryInfo + `\n`;

  orderMessage += `Prazo: 15-30 dias uteis\n`;
  if (deliveryChoice) {
    orderMessage += `Frete: A combinar conforme localizacao\n`;
  }
  orderMessage += `\nAguardo confirmacao!`;

  // Send to WhatsApp
  const whatsappURL = `https://wa.me/5543999809090?text=${encodeURIComponent(
    orderMessage
  )}`;
  window.open(whatsappURL, "_blank");

  alert("Pedido enviado! Redirecionando para o WhatsApp...");
}

// Initialize palette system
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the first palette with default colors
  loadPaletteToControls("candy");

  // Add event listeners for custom size inputs
  const customInputs = ["customWidth", "customLength", "customHeight"];
  customInputs.forEach((inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener("input", updateCustomSizePreview);
    }
  });

  // Initialize custom size preview
  updateCustomSizePreview();

  console.log("Sistema de paletas inicializado");

  // Add WhatsApp click event
  const whatsappContact = document.querySelector(".contact-item.clickable");
  if (whatsappContact) {
    whatsappContact.addEventListener("click", function () {
      const customerName = prompt("Digite seu nome:");
      if (!customerName) return;

      const phoneNumber = "5543999809090";
      const message = `Ola! Meu nome e ${customerName}. Gostaria de saber mais sobre os servicos da CM Restauracao de Moveis.`;
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappURL, "_blank");
    });
  }
});

// Toggle color customization section
function toggleColorCustomization() {
  const customizationPanel = document.getElementById("paletteCustomization");
  const expandButton = document.querySelector(".btn-expand-colors");
  const expandText = document.getElementById("expandColorsText");
  const expandIcon = document.getElementById("expandColorsIcon");

  if (customizationPanel.style.display === "none") {
    customizationPanel.style.display = "block";
    expandButton.classList.add("expanded");
    expandText.textContent = "Fechar personalização";
    expandIcon.classList.remove("fa-chevron-down");
    expandIcon.classList.add("fa-chevron-up");
  } else {
    customizationPanel.style.display = "none";
    expandButton.classList.remove("expanded");
    expandText.textContent = "Não é o que queria? Escolha sua cor aqui";
    expandIcon.classList.remove("fa-chevron-up");
    expandIcon.classList.add("fa-chevron-down");
  }
}

// ================================
// SISTEMA DE FEEDBACK E AVALIAÇÃO
// ================================

let currentRating = 0;

// Inicializar sistema de avaliação por estrelas
document.addEventListener("DOMContentLoaded", function () {
  initializeFeedbackSystem();
});

function initializeFeedbackSystem() {
  const stars = document.querySelectorAll(".star-rating .star");
  const ratingText = document.getElementById("ratingText");
  const feedbackForm = document.getElementById("feedbackForm");

  // Configurar eventos das estrelas
  stars.forEach((star, index) => {
    star.addEventListener("mouseenter", () => {
      highlightStars(index + 1);
      updateRatingText(index + 1);
    });

    star.addEventListener("mouseleave", () => {
      highlightStars(currentRating);
      updateRatingText(currentRating);
    });

    star.addEventListener("click", () => {
      currentRating = index + 1;
      selectStars(currentRating);
      updateRatingText(currentRating);
    });
  });

  // Configurar envio do formulário
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", handleFeedbackSubmit);
  }
}

function highlightStars(rating) {
  const stars = document.querySelectorAll(".star-rating .star");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("hovered");
    } else {
      star.classList.remove("hovered");
    }
  });
}

function selectStars(rating) {
  const stars = document.querySelectorAll(".star-rating .star");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("selected");
    } else {
      star.classList.remove("selected");
    }
  });
}

function updateRatingText(rating) {
  const ratingText = document.getElementById("ratingText");
  if (!ratingText) return;

  const ratingTexts = {
    0: "Clique nas estrelas para avaliar",
    1: "⭐ Muito insatisfeito",
    2: "⭐⭐ Insatisfeito",
    3: "⭐⭐⭐ Neutro",
    4: "⭐⭐⭐⭐ Satisfeito",
    5: "⭐⭐⭐⭐⭐ Muito satisfeito",
  };

  ratingText.textContent = ratingTexts[rating] || ratingTexts[0];
}

function handleFeedbackSubmit(event) {
  event.preventDefault();

  // Validar se uma avaliação foi selecionada
  if (currentRating === 0) {
    alert("Por favor, selecione uma avaliação de 1 a 5 estrelas.");
    return;
  }

  // Coletar dados do formulário
  const formData = {
    rating: currentRating,
    customerName: document.getElementById("customerName").value,
    serviceType: document.getElementById("serviceType").value,
    feedbackText: document.getElementById("feedbackText").value,
    allowPublish: document.getElementById("allowPublish").checked,
    date: new Date().toLocaleDateString("pt-BR"),
  };

  // Simular envio (você pode substituir por integração real)
  sendFeedback(formData);
}

function sendFeedback(feedbackData) {
  // Aqui você implementaria o envio real para um servidor
  // Por enquanto, vamos simular e mostrar uma mensagem de sucesso

  // Criar mensagem do WhatsApp
  const customerName = feedbackData.customerName;
  const rating = "⭐".repeat(feedbackData.rating);
  const service = feedbackData.serviceType;
  const comment = feedbackData.feedbackText;

  const whatsappMessage =
    `*AVALIAÇÃO DE CLIENTE*\n\n` +
    `👤 Nome: ${customerName}\n` +
    `⭐ Avaliação: ${rating} (${feedbackData.rating}/5)\n` +
    `🔧 Serviço: ${service}\n` +
    `💬 Comentário: ${comment}\n` +
    `📅 Data: ${feedbackData.date}`;

  const phoneNumber = "5543999809090";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Mostrar mensagem de sucesso
  alert(
    "Obrigado pela sua avaliação! Você será redirecionado para o WhatsApp para enviar o feedback."
  );

  // Abrir WhatsApp
  window.open(whatsappURL, "_blank");

  // Resetar formulário
  resetFeedbackForm();

  // Opcionalmente, adicionar a avaliação à exibição local
  if (feedbackData.allowPublish) {
    addReviewToDisplay(feedbackData);
  }
}

function resetFeedbackForm() {
  currentRating = 0;
  selectStars(0);
  updateRatingText(0);
  document.getElementById("feedbackForm").reset();
}

function addReviewToDisplay(feedbackData) {
  const reviewsGrid = document.getElementById("reviewsGrid");
  if (!reviewsGrid) return;

  const reviewCard = document.createElement("div");
  reviewCard.className = "review-card";

  const stars =
    "⭐".repeat(feedbackData.rating) + "☆".repeat(5 - feedbackData.rating);
  const firstName = feedbackData.customerName.split(" ")[0];
  const lastInitial = feedbackData.customerName.split(" ")[1]
    ? feedbackData.customerName.split(" ")[1][0] + "."
    : "";
  const anonymizedName = `${firstName} ${lastInitial}`;

  reviewCard.innerHTML = `
    <div class="review-header">
      <div class="reviewer-info">
        <span class="reviewer-name">${anonymizedName}</span>
        <span class="service-tag">${getServiceDisplayName(
          feedbackData.serviceType
        )}</span>
      </div>
      <div class="review-stars">
        ${generateStarHTML(feedbackData.rating)}
      </div>
    </div>
    <p class="review-text">"${feedbackData.feedbackText}"</p>
    <span class="review-date">${feedbackData.date}</span>
  `;

  // Adicionar no início da lista
  reviewsGrid.insertBefore(reviewCard, reviewsGrid.firstChild);
}

function generateStarHTML(rating) {
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starsHTML += '<span class="star filled">&#9733;</span>';
    } else {
      starsHTML += '<span class="star">&#9733;</span>';
    }
  }
  return starsHTML;
}

function getServiceDisplayName(serviceType) {
  const serviceNames = {
    restauracao: "Restauração",
    montagem: "Montagem",
    casinha: "Casinha de Boneca",
    prateleiras: "Prateleiras",
    outros: "Outros",
  };
  return serviceNames[serviceType] || serviceType;
}
