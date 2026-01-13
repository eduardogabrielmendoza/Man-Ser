/**
 * MAN-SER - JavaScript PREMIUM
 * Efectos Avanzados: Cursor, Parallax, Counters, Preloader, etc.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los efectos premium
    initPreloader();
    initCustomCursor();
    initScrollProgress();
    initParallax();
    initAdvancedScrollAnimations();
    initMagneticButtons();
    initTiltCards();
    initCounterAnimation();
    initTextReveal();
    initImageReveal();
    initRippleEffect();
    initSmoothScrollPremium();
    initSpotlightEffect();
});

/**
 * PRELOADER
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        // Mínimo tiempo de preloader para efecto visual
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            
            // Iniciar animaciones del hero después del preloader
            triggerHeroAnimations();
        }, 1500);
    } else {
        triggerHeroAnimations();
    }
}

function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero .fade-in, .hero .reveal-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });
}

/**
 * CURSOR PERSONALIZADO
 */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    // Solo en desktop
    if (window.innerWidth < 1024) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animación suave del cursor
    function animateCursor() {
        // Cursor exterior con lag
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Punto interior más rápido
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Efectos hover
    const hoverElements = document.querySelectorAll('a, button, .card, .product-card, .service-card, .btn');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Efecto click
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
}

/**
 * SCROLL PROGRESS INDICATOR
 */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

/**
 * PARALLAX EFFECT
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/**
 * ANIMACIONES DE SCROLL AVANZADAS
 */
function initAdvancedScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, ' +
        '.fade-in, .fade-in-left, .fade-in-right, .scale-in, .line-animated, .image-reveal'
    );
    
    if (animatedElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Si es un contador, iniciarlo
                if (entry.target.hasAttribute('data-counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * BOTONES MAGNÉTICOS
 */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn-magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * TILT EFFECT PARA CARDS
 */
function initTiltCards() {
    const tiltElements = document.querySelectorAll('.card-3d, [data-tilt]');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/**
 * CONTADOR ANIMADO
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = parseInt(element.dataset.duration) || 2000;
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    
    let start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        element.textContent = prefix + current.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + target.toLocaleString() + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * TEXT REVEAL ANIMATION
 */
function initTextReveal() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    textElements.forEach(el => {
        const text = el.textContent;
        const words = text.split(' ');
        el.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.transitionDelay = `${index * 0.05}s`;
            el.appendChild(span);
        });
    });
}

/**
 * IMAGE REVEAL ANIMATION
 */
function initImageReveal() {
    const imageContainers = document.querySelectorAll('.image-reveal');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    imageContainers.forEach(container => {
        imageObserver.observe(container);
    });
}

/**
 * RIPPLE EFFECT EN BOTONES
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-ripple, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Añadir estilos del ripple dinámicamente
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * SMOOTH SCROLL PREMIUM
 */
function initSmoothScrollPremium() {
    // Smooth scroll con easing personalizado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            smoothScrollTo(offsetPosition, 1000);
        });
    });
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing: easeInOutCubic
        const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

/**
 * SPOTLIGHT EFFECT
 */
function initSpotlightEffect() {
    const spotlightElements = document.querySelectorAll('.spotlight');
    
    spotlightElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            el.style.setProperty('--spotlight-x', x + 'px');
            el.style.setProperty('--spotlight-y', y + 'px');
        });
    });
}

/**
 * HEADER HIDE/SHOW CON SMOOTH
 */
function initSmoothHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    header.classList.add('scrolled');
                    
                    if (currentScroll > lastScroll && currentScroll > 300) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                } else {
                    header.classList.remove('scrolled');
                    header.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * LAZY LOADING DE IMÁGENES CON EFECTO
 */
function initLazyLoadingPremium() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                
                img.onload = () => {
                    img.classList.add('visible');
                };
                
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * PARTICLES GENERATOR
 */
function generateParticles(container, count = 10) {
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Generar partículas en el hero
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        generateParticles(particlesContainer, 15);
    }
});

/**
 * TYPING EFFECT
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * SCROLL TO TOP BUTTON
 */
function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        smoothScrollTo(0, 1000);
    });
}

// Inicializar scroll to top
document.addEventListener('DOMContentLoaded', initScrollToTop);

/**
 * DETECTAR SI EL ELEMENTO ESTÁ EN VIEWPORT
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * THROTTLE FUNCTION PARA OPTIMIZACIÓN
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * DEBOUNCE FUNCTION PARA OPTIMIZACIÓN
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
