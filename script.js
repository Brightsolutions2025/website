// ============================================
// BRIGHT SOLUTIONS - Main JavaScript
// Cleaned & Optimized Version
// ============================================

// ============================================
// 1. PARTICLE SYSTEM
// ============================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 1700;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        const delay = Math.random() * 15;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

// ============================================
// 2. SCROLL ANIMATIONS
// ============================================
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in, .fade-in-card, .animate-on-scroll');
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// ============================================
// 3. INTERSECTION OBSERVER (More Efficient)
// ============================================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.blog-container, .blog-header, .blog-card, ' +
        '.header-section, .feature-box, .benefit-card-wrapper, ' +
        '.job-card-wrapper, .scroll-reveal'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// 4. COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-item');
    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('h2');
                if (!counter) return;
                
                const target = parseInt(counter.innerText);
                if (isNaN(target)) return;
                
                counter.innerText = '0';
                let current = 0;
                const increment = target / 180;

                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================
// 5. CAROUSEL INITIALIZATION
// ============================================
function initCarousel() {
    const carousel = document.querySelector('.carousel-wrapper');
    if (!carousel) return;

    const items = document.querySelectorAll('.carousel-item-wrapper');
    if (!items.length) return;

    // Clone items for infinite scroll
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });

    // Pause on tab inactive
    document.addEventListener('visibilitychange', () => {
        carousel.style.animationPlayState = document.hidden ? 'paused' : 'running';
    });

    // Update animation based on screen size
    function updateCarouselAnimation() {
        const width = window.innerWidth;
        let duration = '40s';
        
        if (width <= 576) duration = '30s';
        else if (width <= 992) duration = '35s';
        
        carousel.style.animation = `scroll ${duration} linear infinite`;
    }

    updateCarouselAnimation();
    window.addEventListener('resize', updateCarouselAnimation);
}

// ============================================
// 6. SHOW ELEMENTS ON SCROLL
// ============================================
function showElementsOnScroll() {
    setTimeout(() => {
        const elements = document.querySelectorAll(
            '.header-section, .header-image, .header-content, .feature-box'
        );
        elements.forEach(element => {
            element.classList.add('show-on-scroll');
        });
    }, 100);
}

// ============================================
// 7. MAIN INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    createParticles();
    handleScrollAnimation();
    initIntersectionObserver();
    initCounterAnimation();
    initCarousel();
    showElementsOnScroll();

    // Scroll event with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            handleScrollAnimation();
        });
    }, { passive: true });
});

// ============================================
// 8. LOAD EVENT HANDLERS
// ============================================
window.addEventListener('load', () => {
    handleScrollAnimation();
});

window.addEventListener('resize', () => {
    handleScrollAnimation();
}, { passive: true });

// Detect when image enters viewport
const images = document.querySelectorAll('.image-container1 img');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of image is visible

images.forEach(img => observer.observe(img));
