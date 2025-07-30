// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }
    
    if (testimonials.length > 0) {
        showTestimonial(0);
        
        nextBtn.addEventListener('click', function() {
            let nextIndex = currentTestimonial + 1;
            if (nextIndex >= testimonials.length) {
                nextIndex = 0;
            }
            showTestimonial(nextIndex);
        });
        
        prevBtn.addEventListener('click', function() {
            let prevIndex = currentTestimonial - 1;
            if (prevIndex < 0) {
                prevIndex = testimonials.length - 1;
            }
            showTestimonial(prevIndex);
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(function() {
            let nextIndex = currentTestimonial + 1;
            if (nextIndex >= testimonials.length) {
                nextIndex = 0;
            }
            showTestimonial(nextIndex);
        }, 5000);
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            // For this front-end only example, we'll just show an alert
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
            
            // Reset form
            contactForm.reset();
        });
    }
});