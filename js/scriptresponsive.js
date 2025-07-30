// Responsive-specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const mainNav = document.querySelector('.main-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    // Handle window resize events
    function handleResize() {
        // Se for maior que 768px, fecha o menu mobile
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }

        // Ajusta header ao rolar
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Inicial
    handleResize();

    // Redimensionamento
    window.addEventListener('resize', handleResize);

    // ========= MENU HAMBURGUER =========
    if (mobileMenuBtn && mobileMenu && overlay) {
        // Abrir/Fechar ao clicar no botão
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Fechar ao clicar em um link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Fechar ao clicar no overlay
        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });

        // Fechar ao rolar a tela
        window.addEventListener('scroll', () => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // ========= DETECTA TOUCH =========
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }

    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.add('no-touch-device');
    }

    // ========= TOUCH NOS CARDS =========
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

    // ========= EVITA ZOOM DUPLO =========
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, {passive: false});

    // ========= SMOOTH SCROLL POLYFILL =========
    if (!('scrollBehavior' in document.documentElement.style)) {
        const smoothScrollPolyfill = document.createElement('script');
        smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
        document.head.appendChild(smoothScrollPolyfill);
    }
});
