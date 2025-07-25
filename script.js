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
  const phone = this.querySelector('input[type="tel"]').value;
  const message = this.querySelector("textarea").value;

  // Create WhatsApp message
  const whatsappMessage = `Olá! Meu nome é ${name}. ${message}. Meu telefone: ${phone}`;
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
      entry.target.style.transform = "translateY(0)";
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
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
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
  color: "rosa",
  window: "simples",
  door: "simples",
  extras: [],
};

let basePrices = {
  pequena: 299,
  media: 399,
  grande: 499,
};

function openMarketplace(product) {
  document.getElementById("marketplace").style.display = "block";
  document.getElementById("marketplace").scrollIntoView({ behavior: "smooth" });
  calculatePrice();
}

function closeMarketplace() {
  document.getElementById("marketplace").style.display = "none";
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
}

function openContact(service) {
  const contactSection = document.getElementById("contact");
  contactSection.scrollIntoView({ behavior: "smooth" });

  // Pre-fill the contact form with service info
  const textarea = document.querySelector("#contactForm textarea");
  let message = "";

  switch (service) {
    case "restauracao":
      message = "Gostaria de um orçamento para restauração premium de móveis.";
      break;
    case "montagem":
      message = "Preciso agendar um serviço de montagem express.";
      break;
    default:
      message = `Gostaria de mais informações sobre ${service}.`;
  }

  if (textarea) {
    textarea.value = message;
  }
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
  if (e.target.classList.contains("option-btn")) {
    const optionType = e.target.dataset.option;
    const optionValue = e.target.dataset.value;

    // Remove active class from siblings
    e.target.parentNode.querySelectorAll(".option-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to clicked button
    e.target.classList.add("active");

    // Update selection
    currentSelection[optionType] = optionValue;
    calculatePrice();
  }

  if (e.target.classList.contains("color-option")) {
    const colorValue = e.target.dataset.value;

    // Remove active class from siblings
    e.target.parentNode.querySelectorAll(".color-option").forEach((option) => {
      option.classList.remove("active");
    });

    // Add active class to clicked option
    e.target.classList.add("active");

    // Update selection
    currentSelection.color = colorValue;
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
});

function calculatePrice() {
  let total = basePrices[currentSelection.size] || 299;

  // Add extra prices
  currentSelection.extras.forEach((extra) => {
    const checkbox = document.querySelector(`input[data-value="${extra}"]`);
    if (checkbox) {
      const extraPrice = parseInt(checkbox.dataset.price) || 0;
      total += extraPrice;
    }
  });

  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    totalPriceElement.textContent = total;
  }
}

function finalizePurchase() {
  const customerName = prompt("Digite seu nome:");
  if (!customerName) return;

  const customerPhone = prompt("Digite seu telefone:");
  if (!customerPhone) return;

  // Format the order
  let orderMessage = `🏠 *PEDIDO CASINHA DE BONECA* 🏠\n\n`;
  orderMessage += `👤 *Cliente:* ${customerName}\n`;
  orderMessage += `📱 *Telefone:* ${customerPhone}\n\n`;
  orderMessage += `📋 *DETALHES DO PEDIDO:*\n`;
  orderMessage += `• Tamanho: ${
    currentSelection.size.charAt(0).toUpperCase() +
    currentSelection.size.slice(1)
  }\n`;
  orderMessage += `• Cor: ${
    currentSelection.color.charAt(0).toUpperCase() +
    currentSelection.color.slice(1)
  }\n`;
  orderMessage += `• Janela: ${
    currentSelection.window.charAt(0).toUpperCase() +
    currentSelection.window.slice(1)
  }\n`;
  orderMessage += `• Porta: ${
    currentSelection.door.charAt(0).toUpperCase() +
    currentSelection.door.slice(1)
  }\n`;

  if (currentSelection.extras.length > 0) {
    orderMessage += `• Extras: ${currentSelection.extras
      .map((extra) => extra.charAt(0).toUpperCase() + extra.slice(1))
      .join(", ")}\n`;
  }

  const totalPriceElement = document.getElementById("totalPrice");
  const totalPrice = totalPriceElement ? totalPriceElement.textContent : "299";
  orderMessage += `\n💰 *TOTAL: R$ ${totalPrice}*\n\n`;
  orderMessage += `📍 *Entrega:* Região de Londrina e cidades vizinhas\n`;
  orderMessage += `⏰ *Prazo:* A combinar\n\n`;
  orderMessage += `Aguardo confirmação! 😊`;

  // Send to WhatsApp
  const whatsappURL = `https://wa.me/5543999809090?text=${encodeURIComponent(
    orderMessage
  )}`;
  window.open(whatsappURL, "_blank");

  alert("Pedido enviado! Redirecionando para o WhatsApp...");
}
