// Solution Planet - Particle Effects System
// Efectos sutil para dar vida a la web

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
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    // Inicializar efectos del header
    this.initHeaderEffects();
    
    // Agregar Bokeh CSS al body
    this.addBokehBackground();
    
    // Inicializar efectos de ondas sutil
    this.initWaveEffects();
    
    this.isInitialized = true;
  }

  initHeaderEffects() {
    const header = document.querySelector('header');
    if (!header) return;

    // Crear canvas para efectos del header
    this.headerCanvas = document.createElement('canvas');
    this.headerCanvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0;transition:opacity 0.3s ease';
    this.headerCanvas.id = 'header-particles';
    
    header.style.position = 'relative';
    header.appendChild(this.headerCanvas);
    
    this.headerCtx = this.headerCanvas.getContext('2d');
    this.resizeHeaderCanvas();
    
    // Event listeners para botones del header
    this.setupHeaderInteractions();
    
    // Inicializar loop de ripples
    this.startHeaderRipples();
  }

  resizeHeaderCanvas() {
    if (!this.headerCanvas) return;
    
    const header = this.headerCanvas.parentElement;
    const rect = header.getBoundingClientRect();
    
    this.headerState.w = Math.max(1, Math.floor(rect.width));
    this.headerState.h = Math.max(1, Math.floor(rect.height));
    
    this.headerCanvas.width = this.headerState.w * this.headerState.dpr;
    this.headerCanvas.height = this.headerState.h * this.headerState.dpr;
    this.headerCanvas.style.width = this.headerState.w + 'px';
    this.headerCanvas.style.height = this.headerState.h + 'px';
    
    this.headerCtx.setTransform(this.headerState.dpr, 0, 0, this.headerState.dpr, 0, 0);
  }

  setupHeaderInteractions() {
    const header = document.querySelector('header');
    if (!header) return;

    // Botones del header
    const headerButtons = header.querySelectorAll('a, button, nav a');
    
    headerButtons.forEach(button => {
      button.addEventListener('mouseenter', (e) => {
        this.triggerHeaderRipple(e);
        this.showHeaderEffects();
      });
      
      button.addEventListener('mouseleave', () => {
        this.hideHeaderEffects();
      });
    });

    // Resize observer para el header
    const headerResizeObserver = new ResizeObserver(() => {
      this.resizeHeaderCanvas();
    });
    headerResizeObserver.observe(header);
  }

  triggerHeaderRipple(event) {
    const rect = this.headerCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Crear ripple sutil
    this.ripples.push({
      x: x,
      y: y,
      r: 0,
      a: 0.15, // Opacidad reducida para ser sutil
      w: 1.5,  // Línea más delgada
      maxR: Math.max(this.headerState.w, this.headerState.h) * 0.8
    });
  }

  showHeaderEffects() {
    if (this.headerCanvas) {
      this.headerCanvas.style.opacity = '1';
    }
  }

  hideHeaderEffects() {
    if (this.headerCanvas) {
      this.headerCanvas.style.opacity = '0';
    }
  }

  startHeaderRipples() {
    const animate = () => {
      if (!this.headerState.running) return;
      
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
        ripple.r += 1.8; // Velocidad reducida
        ripple.a *= 0.975; // Desvanecimiento más lento
        ripple.w = Math.max(0.4, ripple.w * 0.99);
        
        // Remover ripples viejos
        if (ripple.a < 0.01 || ripple.r > ripple.maxR) {
          this.ripples.splice(i, 1);
        }
      }
      
      this.headerState.raf = requestAnimationFrame(animate);
    };
    
    this.headerState.running = true;
    animate();
  }

  addSubtleRipple() {
    // Ripple automático sutil en el centro del header
    const centerX = this.headerState.w / 2;
    const centerY = this.headerState.h / 2;
    
    this.ripples.push({
      x: centerX + (Math.random() - 0.5) * 100,
      y: centerY + (Math.random() - 0.5) * 40,
      r: 0,
      a: 0.08, // Muy sutil
      w: 1.0,
      maxR: Math.max(this.headerState.w, this.headerState.h) * 0.6
    });
  }

  addBokehBackground() {
    // Agregar Bokeh CSS al body
    const bokehDiv = document.createElement('div');
    bokehDiv.className = 'bokeh-background';
    bokehDiv.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: -1;
      opacity: 0.6;
    `;
    
    document.body.appendChild(bokehDiv);
    
    // Agregar estilos CSS para Bokeh
    if (!document.querySelector('#bokeh-styles')) {
      const bokehStyles = document.createElement('style');
      bokehStyles.id = 'bokeh-styles';
      bokehStyles.textContent = `
        .bokeh-background {
          background: 
            radial-gradient(140px 140px at 12% 18%, rgba(0,184,217,.08), transparent 60%),
            radial-gradient(220px 220px at 88% 12%, rgba(255,255,255,.04), transparent 60%),
            radial-gradient(160px 160px at 18% 82%, rgba(0,184,217,.06), transparent 60%),
            radial-gradient(240px 240px at 90% 78%, rgba(255,255,255,.03), transparent 60%);
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
          opacity: 0.3;
          background: 
            radial-gradient(300px 300px at 20% 30%, rgba(0,184,217,.03), transparent 70%),
            radial-gradient(400px 400px at 80% 70%, rgba(0,184,217,.02), transparent 70%);
          animation: wave-float 30s ease-in-out infinite;
        }
        
        @keyframes wave-float {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(10px, -15px, 0) scale(1.05); }
        }
      `;
      document.head.appendChild(bokehStyles);
    }
  }

  initWaveEffects() {
    // Agregar ondas flotantes sutil
    const waveDiv = document.createElement('div');
    waveDiv.className = 'wave-background';
    document.body.appendChild(waveDiv);
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
    
    this.isInitialized = false;
  }
}

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.particleEffects = new ParticleEffects();
});

// Exportar para uso manual si es necesario
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParticleEffects;
}
