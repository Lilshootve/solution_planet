// Solution Planet - Particle Effects System ULTRA OPTIMIZADO
// Versión minimalista para máximo rendimiento

class ParticleEffects {
  constructor() {
    this.isInitialized = false;
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    console.log('🚀 Inicializando ParticleEffects ultra-optimizado...');
    
    // Solo efectos mínimos y esenciales
    this.setupMinimalEffects();
    
    this.isInitialized = true;
    console.log('✅ ParticleEffects ultra-optimizado inicializado');
  }

  setupMinimalEffects() {
    // Solo agregar estilos CSS mínimos
    this.addMinimalStyles();
    
    // Efecto sutil solo en el botón de WhatsApp
    this.setupWhatsAppEffect();
  }

  addMinimalStyles() {
    if (!document.querySelector('#minimal-effects-styles')) {
      const styles = document.createElement('style');
      styles.id = 'minimal-effects-styles';
      styles.textContent = `
        /* Solo efectos mínimos y esenciales */
        .glass {
          backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
        }
        
        .glass:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-1px);
        }
        
        /* Efecto sutil para botones */
        button, a[href] {
          transition: all 0.2s ease;
        }
        
        button:hover, a[href]:hover {
          transform: translateY(-1px);
        }
        
        /* Solo el botón de WhatsApp tiene efectos especiales */
        #whatsapp-button a {
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(0, 184, 217, 0.2);
        }
        
        #whatsapp-button a:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 25px rgba(0, 184, 217, 0.3);
        }
        
        /* Indicador de estado online simple */
        #whatsapp-button .bg-green-500 {
          animation: simple-pulse 2s infinite;
        }
        
        @keyframes simple-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `;
      document.head.appendChild(styles);
    }
  }

  setupWhatsAppEffect() {
    const button = document.getElementById('whatsapp-button');
    if (button) {
      // Solo efecto de entrada sutil
      button.style.opacity = '0';
      button.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        button.style.transition = 'all 0.5s ease';
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
      }, 500);
    }
  }

  // Método para limpiar efectos
  destroy() {
    this.isInitialized = false;
    console.log('🧹 ParticleEffects limpiado');
  }

  // Método para verificar estado
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      version: 'ultra-optimized',
      performance: 'minimal'
    };
  }
}

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM cargado, creando ParticleEffects ultra-optimizado...');
  window.particleEffects = new ParticleEffects();
});

// Exportar para uso manual si es necesario
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParticleEffects;
}
