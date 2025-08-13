// SISTEMA DE ANIMACIONES DE SCROLL Y ENTRADA

class ScrollAnimations {
  constructor() {
    this.animatedElements = [];
    this.observer = null;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.addScrollEffects();
    this.addHoverEffects();
    this.addEntranceAnimations();
    this.addParallaxEffects();
  }

  // Configurar el observador de intersección para animaciones de scroll
  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Agregar delay escalonado para elementos en grid
          if (entry.target.classList.contains('grid-item')) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, delay * 100);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observar elementos con clase scroll-reveal
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      this.observer.observe(el);
    });
  }

  // Agregar efectos de scroll
  addScrollEffects() {
    // Efecto parallax para el hero
    const heroSection = document.querySelector('#top');
    if (heroSection) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
      });
    }

    // Efecto de scroll para el header
    const header = document.querySelector('header');
    if (header) {
      let lastScroll = 0;
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
        
        if (currentScroll > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
      });
    }
  }

  // Agregar efectos de hover
  addHoverEffects() {
    // Efectos para botones
    document.querySelectorAll('button, .btn, a[href]').forEach(btn => {
      if (!btn.closest('header')) {
        btn.classList.add('btn-animated', 'hover-lift');
      }
    });

    // Efectos para enlaces de navegación
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.add('nav-link-animated');
    });

    // Efectos para tarjetas de servicios
    document.querySelectorAll('.service-card, .product-card').forEach(card => {
      card.classList.add('hover-lift', 'particle-hover');
    });

    // Efectos para botones de filtro
    document.querySelectorAll('.filter-btn').forEach(filterBtn => {
      filterBtn.classList.add('hover-scale');
    });
  }

  // Agregar animaciones de entrada
  addEntranceAnimations() {
    // Hero section
    const heroTitle = document.querySelector('#top h1');
    const heroSubtitle = document.querySelector('#top p');
    const heroButtons = document.querySelector('#top .flex.flex-wrap');
    const heroFeatures = document.querySelector('#top .grid.grid-cols-2');
    const heroImage = document.querySelector('#top img');

    if (heroTitle) heroTitle.classList.add('hero-title');
    if (heroSubtitle) heroSubtitle.classList.add('hero-subtitle');
    if (heroButtons) heroButtons.classList.add('hero-buttons');
    if (heroFeatures) heroFeatures.classList.add('hero-features');
    if (heroImage) heroImage.classList.add('hero-image');

    // Secciones principales
    document.querySelectorAll('section').forEach((section, index) => {
      section.classList.add('scroll-reveal');
      section.style.animationDelay = `${index * 0.2}s`;
    });

    // Footer
    const footerLogo = document.querySelector('footer img');
    const footerColumns = document.querySelectorAll('footer .col-span-1');

    if (footerLogo) footerLogo.classList.add('footer-logo');
    footerColumns.forEach((col, index) => {
      col.classList.add('footer-column');
      col.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Agregar efectos parallax
  addParallaxEffects() {
    // Efecto parallax para elementos decorativos
    const decorativeElements = document.querySelectorAll('.absolute');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      decorativeElements.forEach((el, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // Animar elementos del grid de servicios
  animateServicesGrid() {
    const gridItems = document.querySelectorAll('#servicesGrid > div');
    
    gridItems.forEach((item, index) => {
      item.classList.add('scroll-reveal', 'grid-item');
      item.dataset.delay = index * 0.1;
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'all 0.6s ease';
    });
  }

  // Animar productos destacados
  animateProducts() {
    const productCards = document.querySelectorAll('#products .rounded-2xl');
    
    productCards.forEach((card, index) => {
      card.classList.add('product-card', 'scroll-reveal');
      card.style.animationDelay = `${index * 0.2}s`;
    });
  }

  // Efectos de texto
  addTextEffects() {
    // Efecto de revelación de texto
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
      heading.classList.add('text-reveal');
    });

    // Efecto de escritura para el título principal
    const mainTitle = document.querySelector('#top h1');
    if (mainTitle) {
      this.typewriterEffect(mainTitle, mainTitle.textContent);
    }
  }

  // Efecto de máquina de escribir
  typewriterEffect(element, text) {
    element.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }

  // Efectos de partículas en hover
  addParticleHoverEffects() {
    document.querySelectorAll('button, .btn, a[href]').forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.createParticleBurst(e.target, e.clientX, e.clientY);
      });
    });
  }

  // Crear explosión de partículas
  createParticleBurst(element, x, y) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 4px;
        height: 4px;
        background: #00B8D9;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: particle-burst 0.8s ease-out forwards;
      `;
      
      const angle = (i / 8) * Math.PI * 2;
      const velocity = 50 + Math.random() * 50;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      particle.style.setProperty('--vx', vx);
      particle.style.setProperty('--vy', vy);
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 800);
    }
  }

  // Reinicializar animaciones
  reinitialize() {
    this.observer.disconnect();
    this.init();
  }
}

// CSS para las partículas
const particleStyles = `
  @keyframes particle-burst {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(calc(var(--vx) * 1px), calc(var(--vy) * 1px)) scale(0);
      opacity: 0;
    }
  }
`;

// Agregar estilos de partículas al head
const styleSheet = document.createElement('style');
styleSheet.textContent = particleStyles;
document.head.appendChild(styleSheet);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Agregar clase js-enabled al body para activar animaciones
  document.body.classList.add('js-enabled');
  
  const scrollAnimations = new ScrollAnimations();
  
  // Reinicializar después de que se carguen los servicios
  setTimeout(() => {
    scrollAnimations.animateServicesGrid();
    scrollAnimations.animateProducts();
    scrollAnimations.addTextEffects();
    scrollAnimations.addParticleHoverEffects();
  }, 1000);
  
  // Hacer disponible globalmente para debugging
  window.scrollAnimations = scrollAnimations;
});

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollAnimations;
}
