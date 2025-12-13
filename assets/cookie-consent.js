// Cookie Consent Banner
// Simple, GDPR/CCPA compliant cookie consent implementation

(function() {
  'use strict';

  const COOKIE_CONSENT_KEY = 'cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  // Check if consent has been given
  function hasConsent() {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
  }

  // Save consent
  function saveConsent(accepted) {
    localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? 'accepted' : 'rejected');
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000));
    document.cookie = `${COOKIE_CONSENT_KEY}=${accepted ? 'accepted' : 'rejected'}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  }

  // Create cookie banner
  function createCookieBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 text-white p-4 shadow-2xl border-t border-neutral-700';
    banner.style.display = 'none';
    
    banner.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex-1">
            <p class="text-sm sm:text-base">
              We use cookies and similar technologies to improve your experience, analyze site usage, and assist with marketing. 
              By clicking "Accept", you consent to our use of cookies. 
              <a href="privacy.html#cookies" class="text-brand hover:underline font-semibold">Learn more</a>
            </p>
          </div>
          <div class="flex gap-3 flex-shrink-0">
            <button id="cookie-accept" class="px-6 py-2 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-colors duration-200">
              Accept
            </button>
            <button id="cookie-decline" class="px-6 py-2 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-lg transition-colors duration-200">
              Decline
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Event listeners
    document.getElementById('cookie-accept').addEventListener('click', function() {
      saveConsent(true);
      banner.style.display = 'none';
      // Here you can initialize analytics or other tracking scripts
      initializeTracking();
    });

    document.getElementById('cookie-decline').addEventListener('click', function() {
      saveConsent(false);
      banner.style.display = 'none';
    });

    return banner;
  }

  // Initialize tracking scripts (only if consent given)
  function initializeTracking() {
    // Add your analytics/tracking scripts here
    // Example: Google Analytics, Facebook Pixel, etc.
    // Only initialize if consent is given
    
    // Example:
    // if (typeof gtag !== 'undefined') {
    //   gtag('consent', 'update', { 'analytics_storage': 'granted' });
    // }
  }

  // Initialize on page load
  function init() {
    if (!hasConsent()) {
      const banner = createCookieBanner();
      // Show banner after a short delay for better UX
      setTimeout(function() {
        banner.style.display = 'block';
        // Smooth slide-up animation
        banner.style.transform = 'translateY(0)';
        banner.style.transition = 'transform 0.3s ease-out';
      }, 500);
    } else {
      // Consent already given, initialize tracking
      initializeTracking();
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

