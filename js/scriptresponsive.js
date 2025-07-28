// Responsive-specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Handle window resize events
    function handleResize() {
        const header = document.querySelector('header');
        const mainNav = document.querySelector('.main-nav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        // If window is larger than 768px and mobile menu is open, close it
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        // Adjust header padding based on scroll and screen size
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Initial check
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Touch device detection for hover effects
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }
    
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.add('no-touch-device');
    }
    
    // Improved touch handling for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0 && isTouchDevice()) {
        serviceCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touched');
            }, {passive: true});
            
            card.addEventListener('touchend', function() {
                this.classList.remove('touched');
            }, {passive: true});
        });
    }
    
    // Prevent zoom on double-tap for mobile devices
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, {passive: false});
    
    // Smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        const smoothScrollPolyfill = document.createElement('script');
        smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
        document.head.appendChild(smoothScrollPolyfill);
    }
});