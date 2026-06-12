/* ============================================================
   CONFIGURACIÓN DEL WEBHOOK N8N
   
   ⚠️ IMPORTANTE: Reemplaza esta URL con la URL de tu webhook
   de n8n. Para obtenerla:
   1. Crea un nuevo workflow en n8n
   2. Agrega un nodo "Webhook" 
   3. Copia la URL que te proporciona
   4. Reemplaza N8N_WEBHOOK_URL abajo
   ============================================================ */
const N8N_WEBHOOK_URL = "https://backyou-n8n.pf0hps.easypanel.host/webhook/887ed059-0fe6-4efd-a43b-2a8ccafe70d6";
// Ejemplo: "https://mi-n8n.app.n8n.cloud/webhook/abc123-contacto-form"

/* ============================================================
   NAVBAR – Efecto scroll
   ============================================================ */
const navbar = document.getElementById('navbar');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

hamburgerBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburgerBtn.setAttribute('aria-expanded', isOpen);
});

// Cerrar menú al hacer clic en enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================================
   RESALTAR SECCIÓN ACTIVA EN NAVBAR
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -50% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${entry.target.id}`) {
          item.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(sec => sectionObserver.observe(sec));

/* ============================================================
   ANIMACIONES AL HACER SCROLL (AOS manual)
   ============================================================ */
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

aosElements.forEach(el => aosObserver.observe(el));

/* ============================================================
   TESTIMONIOS – Carrusel
   ============================================================ */
let currentTestimonial = 1;
let autoSlideInterval;

function showTestimonial(num) {
  document.querySelectorAll('.testimonial-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.dot').forEach(d => {
    d.classList.remove('active');
    d.setAttribute('aria-selected', 'false');
  });
  const card = document.getElementById(`testimonial-${num}`);
  const dot = document.getElementById(`dot-${num}`);
  if (card) card.classList.add('active');
  if (dot) {
    dot.classList.add('active');
    dot.setAttribute('aria-selected', 'true');
  }
  currentTestimonial = num;
}

function nextTestimonial() {
  const next = currentTestimonial >= 4 ? 1 : currentTestimonial + 1;
  showTestimonial(next);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextTestimonial, 5000);
}
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

startAutoSlide();
document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('mouseenter', stopAutoSlide);
  dot.addEventListener('mouseleave', startAutoSlide);
  dot.addEventListener('click', () => {
    stopAutoSlide();
    showTestimonial(i + 1);
    startAutoSlide();
  });
});

// Swipe en testimonios (móvil)
let touchStartX = 0;
const testimoniosSection = document.getElementById('testimonios');
testimoniosSection.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
testimoniosSection.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    stopAutoSlide();
    if (dx < 0) nextTestimonial();
    else showTestimonial(currentTestimonial <= 1 ? 4 : currentTestimonial - 1);
    startAutoSlide();
  }
});

/* ============================================================
   GALERÍA – Lightbox
   ============================================================ */
const galleryImages = [
  { src: 'https://fundacioncreandopasosdeamor.org/imgs/gallery_1_hand_horse_1780679677032.png', alt: 'Mano de niño acariciando el hocico' },
  { src: 'https://fundacioncreandopasosdeamor.org/imgs/gallery_2_boy_horse_1780679688714.png',  alt: 'Niño y caballo juntos, nariz con nariz' },
  { src: 'https://fundacioncreandopasosdeamor.org/imgs/gallery_3_grooming_1780679699921.png',   alt: 'Niño cuidando y cepillando' },
  { src: 'https://fundacioncreandopasosdeamor.org/imgs/gallery_4_riding_1780679718298.png',     alt: 'Ejercicios de equilibrio terapéutico' },
  { src: 'https://fundacioncreandopasosdeamor.org/imgs/gallery_5_field_1780679729164.png',      alt: 'Fotografía en el campo' },
  { src: 'https://fundacioncreandopasosdeamor.org/imgs/gallery_6_connection_1780679739896.png', alt: 'Un momento de conexión y descanso' },
];

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentGalleryIndex = 0;

function openLightbox(index) {
  currentGalleryIndex = index;
  const item = galleryImages[index];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.alt;
  lightboxCaption.textContent = `${index + 1}. ${item.alt}`;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  currentGalleryIndex = (currentGalleryIndex + dir + galleryImages.length) % galleryImages.length;
  openLightbox(currentGalleryIndex);
}

document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  }
});

/* ============================================================
   FORMULARIO DE CONTACTO – Validación + Webhook n8n
   ============================================================ */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMsg = document.getElementById('formMsg');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');

function validateField(input) {
  const errorEl = document.getElementById(`${input.id}-error`);
  let isValid = true;
  let errorMsg = '';

  if (input.required && !input.value.trim()) {
    isValid = false;
    errorMsg = 'Este campo es obligatorio.';
  } else if (input.type === 'email' && input.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      isValid = false;
      errorMsg = 'Por favor, ingresa un correo electrónico válido.';
    }
  }

  if (errorEl) {
    errorEl.textContent = errorMsg;
  }
  input.classList.toggle('invalid', !isValid);
  return isValid;
}

// Validar en tiempo real al salir del campo
['nombre', 'email', 'mensaje'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('blur', () => validateField(el));
    el.addEventListener('input', () => {
      if (el.classList.contains('invalid')) validateField(el);
    });
  }
});

function setLoading(loading) {
  submitBtn.disabled = loading;
  btnText.style.display = loading ? 'none' : 'inline';
  btnLoader.style.display = loading ? 'inline-flex' : 'none';
}

function showFormMessage(type, message) {
  formMsg.className = `form-message ${type}`;
  const icon = type === 'success' ? '✅' : '❌';
  formMsg.innerHTML = `<span>${icon}</span> ${message}`;
  formMsg.style.display = 'flex';
  formMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validar todos los campos requeridos
  const fieldsToValidate = ['nombre', 'email', 'mensaje'].map(id => document.getElementById(id));
  const allValid = fieldsToValidate.every(field => validateField(field));
  if (!allValid) {
    showFormMessage('error', 'Por favor, corrige los errores en el formulario antes de enviar.');
    return;
  }

  setLoading(true);
  formMsg.style.display = 'none';

  // Recopilar datos del formulario
  const formData = {
    nombre: document.getElementById('nombre').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    asunto: document.getElementById('asunto').value,
    mensaje: document.getElementById('mensaje').value.trim(),
    origen: 'Sitio Web – Fundación Creando Pasos de Amor A.C.',
    fecha: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
    timestamp: new Date().toISOString(),
  };

  try {
    // ── ENVÍO AL WEBHOOK DE N8N ──────────────────────────────
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // n8n devuelve 200 en éxito (puede variar según configuración)
    if (response.ok) {
      showFormMessage(
        'success',
        '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad. 🐴'
      );
      form.reset();
      // Limpiar validaciones visuales
      fieldsToValidate.forEach(f => f.classList.remove('invalid'));
    } else {
      const errorText = await response.text();
      console.error('Error del servidor:', response.status, errorText);
      throw new Error(`Error del servidor: ${response.status}`);
    }
  } catch (err) {
    console.error('Error al enviar formulario:', err);

    // Mensaje diferenciado si el webhook no está configurado
    if (N8N_WEBHOOK_URL.includes('TU-INSTANCIA-N8N')) {
      showFormMessage(
        'error',
        '⚙️ El webhook de n8n aún no está configurado. Edita <code>script.js</code> y reemplaza <strong>N8N_WEBHOOK_URL</strong> con tu URL.'
      );
    } else {
      showFormMessage(
        'error',
        'Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente o contáctanos directamente por Facebook.'
      );
    }
  } finally {
    setLoading(false);
  }
});

/* ============================================================
   NÚMEROS ANIMADOS – Sección Nosotros
   ============================================================ */
function animateCounter(el, target, suffix = '') {
  const start = 0;
  const duration = 1800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (target - start) * eased);
    el.textContent = `${value}${suffix}`;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const match = text.match(/(\d+)(.*)$/);
      if (match) {
        animateCounter(el, parseInt(match[1]), match[2]);
      }
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Aplicar clase scrolled si la página carga ya con scroll
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  console.log('%c🐴 Fundación Creando Pasos de Amor A.C.', 'color: #2a7abf; font-size: 1.2rem; font-weight: bold;');
  console.log('%cCentro Terapéutico La Joya | https://web.facebook.com/CentroTerapeuticoLaJoya', 'color: #64748b;');
});
