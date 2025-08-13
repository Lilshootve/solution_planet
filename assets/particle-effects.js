// Solution Planet - Particle Effects System
// Efectos sutil para dar vida a la web - OPTIMIZADO PARA RENDIMIENTO

class ParticleEffects {
  constructor() {
    this.isInitialized = false;
    this.headerCanvas = null;
    this.headerCtx = null;
    this.headerState = { running: false, raf: null, w: 0, h: 0, dpr: 1 };
    this.ripples = [];
    this.lastRipple = 0;
    this.bpm = 140; // Más sutil que el original
    this.rippleInterval = (60_000 / this.bpm);
    
    // Optimización de rendimiento
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.performanceMode = false;
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    console.log('🚀 Inicializando ParticleEffects optimizado...');
    
    // Detectar modo de rendimiento
    this.detectPerformanceMode();
    
    // Optimización de scroll
    this.optimizeScrollPerformance();
    
    // Esperar un poco más para asegurar que el DOM esté completamente listo
    setTimeout(() => {
      try {
        // Inicializar efectos del header
        this.initHeaderEffects();
        
        // Configurar efectos para todos los botones de la página
        this.setupGlobalButtonEffects();
        
        // Agregar Bokeh CSS al body
        this.addBokehBackground();
        
        // Inicializar efectos de ondas sutil
        this.initWaveEffects();
        
        this.isInitialized = true;
        console.log('✅ ParticleEffects optimizado inicializado correctamente');
        
        // Verificar estado después de un tiempo
        setTimeout(() => {
          const status = this.getStatus();
          console.log('📊 Estado del sistema:', status);
          
          if (status.globalButtonsConfigured === 0) {
            console.warn('⚠️ No se configuraron botones globales, reintentando...');
            this.setupGlobalButtonEffects();
          }
        }, 1000);
        
      } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
        this.isInitialized = false;
      }
    }, 100);
  }

  initHeaderEffects() {
    const header = document.querySelector('header');
    if (!header) {
      console.warn('⚠️ No se encontró el header');
      return;
    }

    console.log('🎨 Inicializando efectos del header...');

    // Crear canvas para efectos del header
    this.headerCanvas = document.createElement('canvas');
    this.headerCanvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:10;opacity:0;transition:opacity 0.3s ease;width:100%;height:100%';
    this.headerCanvas.id = 'header-particles';
    
    // Asegurar que el header tenga position relative
    if (getComputedStyle(header).position === 'static') {
      header.style.position = 'relative';
    }
    
    header.appendChild(this.headerCanvas);
    
    this.headerCtx = this.headerCanvas.getContext('2d');
    this.resizeHeaderCanvas();
    
    // Event listeners para botones del header
    this.setupHeaderInteractions();
    
    // Inicializar loop de ripples
    this.startHeaderRipples();
    
    console.log('✅ Efectos del header inicializados');
  }

  resizeHeaderCanvas() {
    if (!this.headerCanvas) return;
    
    const header = this.headerCanvas.parentElement;
    const rect = header.getBoundingClientRect();
    
    this.headerState.w = Math.max(1, Math.floor(rect.width));
    this.headerState.h = Math.max(1, Math.floor(rect.height));
    
    // Configurar canvas con alta resolución
    this.headerState.dpr = window.devicePixelRatio || 1;
    
    this.headerCanvas.width = this.headerState.w * this.headerState.dpr;
    this.headerCanvas.height = this.headerState.h * this.headerState.dpr;
    this.headerCanvas.style.width = this.headerState.w + 'px';
    this.headerCanvas.style.height = this.headerState.h + 'px';
    
    this.headerCtx.scale(this.headerState.dpr, this.headerState.dpr);
    
    console.log(`📐 Canvas redimensionado: ${this.headerState.w}x${this.headerState.h}`);
  }

  setupHeaderInteractions() {
    const header = document.querySelector('header');
    if (!header) return;

    // Botones del header - buscar más específicamente
    const headerButtons = header.querySelectorAll('a, button, nav a, .hover\\:text-brand');
    
    console.log(`🎯 Encontrados ${headerButtons.length} botones en el header`);
    
    headerButtons.forEach((button, index) => {
      console.log(`🔘 Botón ${index + 1}:`, button.tagName, button.textContent?.trim());
      
      button.addEventListener('mouseenter', (e) => {
        console.log('🖱️ Mouse enter en botón del header:', button.textContent?.trim());
        this.triggerHeaderRipple(e);
        this.showHeaderEffects();
      });
      
      button.addEventListener('mouseleave', () => {
        console.log('🖱️ Mouse leave en botón del header:', button.textContent?.trim());
        this.hideHeaderEffects();
      });
    });

    // Resize observer para el header
    const headerResizeObserver = new ResizeObserver(() => {
      this.resizeHeaderCanvas();
    });
    headerResizeObserver.observe(header);
  }

  // Nuevo método para efectos en todos los botones de la página
  setupGlobalButtonEffects() {
    console.log('🌐 Configurando efectos para todos los botones de la página...');
    
    // Función para configurar efectos en un botón específico
    const setupButtonEffects = (button) => {
      // Evitar duplicar eventos en botones del header
      if (button.closest('header')) return;
      
      // Evitar botones que ya tienen efectos específicos
      if (button.id === 'whatsapp-button' || button.closest('#whatsapp-button')) return;
      
      // Evitar botones que ya tienen efectos configurados
      if (button.dataset.particleEffectsConfigured) return;
      
      console.log(`🔘 Configurando efectos para botón:`, button.tagName, button.textContent?.trim()?.substring(0, 30));
      
      button.addEventListener('mouseenter', (e) => {
        console.log('🖱️ Mouse enter en botón global:', button.textContent?.trim()?.substring(0, 30));
        this.triggerGlobalButtonRipple(e, button);
      });
      
      button.addEventListener('mouseleave', () => {
        console.log('🖱️ Mouse leave en botón global:', button.textContent?.trim()?.substring(0, 30));
        this.hideGlobalButtonEffects(button);
      });
      
      // Marcar como configurado
      button.dataset.particleEffectsConfigured = 'true';
    };
    
    // Buscar todos los botones y enlaces interactivos en toda la página
    const allButtons = document.querySelectorAll('button, a[href], .btn, .filter-btn, [onclick]');
    
    console.log(`🎯 Encontrados ${allButtons.length} botones/enlaces en toda la página`);
    
    allButtons.forEach(setupButtonEffects);
    
    // Configurar un observer para detectar nuevos botones que se agreguen dinámicamente
    const buttonObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Buscar botones en el nodo agregado
            const newButtons = node.querySelectorAll ? node.querySelectorAll('button, a[href], .btn, .filter-btn, [onclick]') : [];
            newButtons.forEach(setupButtonEffects);
            
            // Si el nodo agregado es un botón, configurarlo también
            if (node.matches && node.matches('button, a[href], .btn, .filter-btn, [onclick]')) {
              setupButtonEffects(node);
            }
          }
        });
      });
    });
    
    // Observar cambios en el body
    buttonObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // También configurar efectos después de un delay para asegurar que todos los botones estén listos
    setTimeout(() => {
      const delayedButtons = document.querySelectorAll('button, a[href], .btn, .filter-btn, [onclick]');
      console.log(`🎯 Configuración tardía para ${delayedButtons.length} botones`);
      delayedButtons.forEach(setupButtonEffects);
    }, 500);
  }

  triggerHeaderRipple(event) {
    if (!this.headerCanvas) return;
    
    const rect = this.headerCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    console.log(`💫 Ripple en posición: ${x}, ${y}`);
    
    // Crear ripple sutil
    this.ripples.push({
      x: x,
      y: y,
      r: 0,
      a: 0.25, // Opacidad aumentada para ser más visible
      w: 2.0,  // Línea más gruesa para ser más visible
      maxR: Math.max(this.headerState.w, this.headerState.h) * 0.8
    });
  }

  triggerGlobalButtonRipple(event, button) {
    console.log('🎯 Activando ripple para botón:', button.textContent?.trim());
    
    // Crear un canvas temporal para este botón si no existe
    let buttonCanvas = button.querySelector('.button-particles');
    
    if (!buttonCanvas) {
      buttonCanvas = document.createElement('canvas');
      buttonCanvas.className = 'button-particles';
      buttonCanvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:10;opacity:0;transition:opacity 0.3s ease;width:100%;height:100%';
      
      // Asegurar que el botón tenga position relative
      if (getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
      }
      
      button.appendChild(buttonCanvas);
      
      // Configurar el canvas
      const rect = button.getBoundingClientRect();
      buttonCanvas.width = rect.width;
      buttonCanvas.height = rect.height;
    }
    
    const rect = buttonCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    console.log(`💫 Ripple global en posición: ${x}, ${y} para botón de tamaño ${rect.width}x${rect.height}`);
    
    // Crear ripple más visible para botones globales
    const ripple = {
      x: x,
      y: y,
      r: 0,
      a: 0.35, // Opacidad aumentada para ser más visible
      w: 2.5,  // Línea más gruesa
      maxR: Math.max(rect.width, rect.height) * 0.8,
      canvas: buttonCanvas,
      ctx: buttonCanvas.getContext('2d')
    };
    
    // Mostrar canvas
    buttonCanvas.style.opacity = '1';
    
    // Animar ripple
    this.animateGlobalRipple(ripple);
  }

  showHeaderEffects() {
    if (this.headerCanvas) {
      this.headerCanvas.style.opacity = '1';
      console.log('👁️ Mostrando efectos del header');
    }
  }

  hideHeaderEffects() {
    if (this.headerCanvas) {
      this.headerCanvas.style.opacity = '0';
      console.log('👁️ Ocultando efectos del header');
    }
  }

  startHeaderRipples() {
    const animate = () => {
      if (!this.headerState.running) return;
      
      // Limpiar canvas
      this.headerCtx.clearRect(0, 0, this.headerState.w, this.headerState.h);
      
      // Ripples automáticos sutiles
      const now = performance.now();
      if (now - this.lastRipple > this.rippleInterval) {
        this.lastRipple = now;
        this.addSubtleRipple();
      }
      
      // Dibujar todos los ripples
      for (let i = this.ripples.length - 1; i >= 0; i--) {
        const ripple = this.ripples[i];
        
        this.headerCtx.strokeStyle = `rgba(0, 184, 217, ${ripple.a.toFixed(3)})`;
        this.headerCtx.lineWidth = ripple.w;
        this.headerCtx.beginPath();
        this.headerCtx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
        this.headerCtx.stroke();
        
        // Animar ripple
        ripple.r += 2.0; // Velocidad aumentada para ser más visible
        ripple.a *= 0.97; // Desvanecimiento más lento
        ripple.w = Math.max(0.5, ripple.w * 0.995);
        
        // Remover ripples viejos
        if (ripple.a < 0.01 || ripple.r > ripple.maxR) {
          this.ripples.splice(i, 1);
        }
      }
      
      this.headerState.raf = requestAnimationFrame(animate);
    };
    
    this.headerState.running = true;
    animate();
    console.log('🔄 Loop de ripples iniciado');
  }

  addSubtleRipple() {
    // Ripple automático sutil en el centro del header
    const centerX = this.headerState.w / 2;
    const centerY = this.headerState.h / 2;
    
    this.ripples.push({
      x: centerX + (Math.random() - 0.5) * 100,
      y: centerY + (Math.random() - 0.5) * 40,
      r: 0,
      a: 0.12, // Más visible
      w: 1.5,
      maxR: Math.max(this.headerState.w, this.headerState.h) * 0.6
    });
  }

  animateGlobalRipple(ripple) {
    const animate = () => {
      if (ripple.a < 0.01 || ripple.r > ripple.maxR) {
        ripple.canvas.style.opacity = '0';
        return;
      }
      
      const ctx = ripple.ctx;
      const rect = ripple.canvas.getBoundingClientRect();
      
      // Limpiar canvas
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Dibujar ripple con color más visible
      ctx.strokeStyle = `rgba(0, 184, 217, ${ripple.a.toFixed(3)})`;
      ctx.lineWidth = ripple.w;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
      ctx.stroke();
      
      // Agregar un segundo ripple interno para más efecto
      if (ripple.r > 5) {
        ctx.strokeStyle = `rgba(0, 184, 217, ${(ripple.a * 0.6).toFixed(3)})`;
        ctx.lineWidth = ripple.w * 0.7;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.r - 8, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Animar ripple con velocidad y desvanecimiento ajustados
      ripple.r += 2.0; // Velocidad aumentada
      ripple.a *= 0.94; // Desvanecimiento más lento
      ripple.w = Math.max(0.5, ripple.w * 0.98);
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }

  hideGlobalButtonEffects(button) {
    const buttonCanvas = button.querySelector('.button-particles');
    if (buttonCanvas) {
      buttonCanvas.style.opacity = '0';
    }
  }

  addBokehBackground() {
    console.log('🎨 Agregando fondo Bokeh...');
    
    // Agregar Bokeh CSS al body
    const bokehDiv = document.createElement('div');
    bokehDiv.className = 'bokeh-background';
    bokehDiv.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: -1;
      opacity: 0.8;
    `;
    
    document.body.appendChild(bokehDiv);
    
    // Agregar estilos CSS para Bokeh
    if (!document.querySelector('#bokeh-styles')) {
      const bokehStyles = document.createElement('style');
      bokehStyles.id = 'bokeh-styles';
      bokehStyles.textContent = `
        .bokeh-background {
          background: 
            radial-gradient(140px 140px at 12% 18%, rgba(0,184,217,.12), transparent 60%),
            radial-gradient(220px 220px at 88% 12%, rgba(255,255,255,.06), transparent 60%),
            radial-gradient(160px 160px at 18% 82%, rgba(0,184,217,.08), transparent 60%),
            radial-gradient(240px 240px at 90% 78%, rgba(255,255,255,.04), transparent 60%);
          filter: blur(3px);
          animation: bokeh-drift 25s linear infinite alternate;
        }
        
        @keyframes bokeh-drift {
          to {
            transform: translate3d(0, -20px, 0) scale(1.02);
          }
        }
        
        /* Efecto de ondas sutil en el fondo */
        .wave-background {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: -2;
          opacity: 0.4;
          background: 
            radial-gradient(300px 300px at 20% 30%, rgba(0,184,217,.05), transparent 70%),
            radial-gradient(400px 400px at 80% 70%, rgba(0,184,217,.03), transparent 70%);
          animation: wave-float 30s ease-in-out infinite;
        }
        
        @keyframes wave-float {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(10px, -15px, 0) scale(1.05); }
        }
      `;
      document.head.appendChild(bokehStyles);
    }
    
    console.log('✅ Fondo Bokeh agregado');
  }

  initWaveEffects() {
    console.log('🌊 Inicializando efectos de ondas...');
    
    // Agregar ondas flotantes sutil
    const waveDiv = document.createElement('div');
    waveDiv.className = 'wave-background';
    document.body.appendChild(waveDiv);
    
    console.log('✅ Efectos de ondas inicializados');
  }

  // Método para limpiar efectos
  destroy() {
    if (this.headerState.raf) {
      cancelAnimationFrame(this.headerState.raf);
    }
    this.headerState.running = false;
    
    // Remover elementos del DOM
    const headerCanvas = document.getElementById('header-particles');
    if (headerCanvas) headerCanvas.remove();
    
    const bokehBackground = document.querySelector('.bokeh-background');
    if (bokehBackground) bokehBackground.remove();
    
    const waveBackground = document.querySelector('.wave-background');
    if (waveBackground) waveBackground.remove();
    
    // Limpiar todos los canvas de botones
    const buttonCanvases = document.querySelectorAll('.button-particles');
    buttonCanvases.forEach(canvas => canvas.remove());
    
    this.isInitialized = false;
  }

  // Método público para reconfigurar efectos
  reconfigureEffects() {
    console.log('🔄 Reconfigurando efectos de partículas...');
    
    // Limpiar configuración anterior
    const allButtons = document.querySelectorAll('[data-particle-effects-configured]');
    allButtons.forEach(button => {
      delete button.dataset.particleEffectsConfigured;
      // Remover event listeners anteriores
      button.replaceWith(button.cloneNode(true));
    });
    
    // Reconfigurar
    this.setupGlobalButtonEffects();
  }

  // Método para verificar estado
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      headerCanvas: !!this.headerCanvas,
      globalButtonsConfigured: document.querySelectorAll('[data-particle-effects-configured]').length,
      totalButtons: document.querySelectorAll('button, a[href], .btn, .filter-btn, [onclick]').length
    };
  }
}

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM cargado, creando ParticleEffects...');
  window.particleEffects = new ParticleEffects();
});

// Exportar para uso manual si es necesario
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParticleEffects;
}
