/**
 * MAN-SER - JavaScript Principal
 * Funcionalidades: Navegación, Animaciones de Scroll, Interactividad
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavigation();
    initScrollAnimations();
    initHeaderScroll();
    initSmoothScroll();
});

/**
 * Navegación móvil
 */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    function openMenu() {
        menuToggle.classList.add('active');
        mobileNav.classList.add('active');
        body.classList.add('menu-open');
        menuToggle.setAttribute('aria-label', 'Cerrar menú');
        menuToggle.setAttribute('aria-expanded', 'true');
    }
    
    function closeMenu() {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (menuToggle && mobileNav) {
        // Abrir menú con hamburguesa
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Cerrar con botón X
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeMenu();
            });
        }

        // Cerrar menú al hacer clic en un enlace
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Cerrar menú con Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                closeMenu();
                menuToggle.focus();
            }
        });
    }
}

/**
 * Header con efecto scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Añadir clase cuando se hace scroll
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Ocultar/mostrar header en scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
}

/**
 * Animaciones al hacer scroll (Intersection Observer)
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    
    if (animatedElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar una vez que se anima
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Smooth scroll para enlaces internos
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Marcar enlace activo en navegación
 */
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (currentPath === href || 
            (currentPath === '/' && href === '/') ||
            (currentPath.includes(href) && href !== '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Ejecutar al cargar
setActiveNavLink();

/**
 * Lazy loading para imágenes
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Contador animado para estadísticas
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

/**
 * Inicializar contadores cuando son visibles
 */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.counter);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Prevenir scroll cuando el menú móvil está abierto
document.documentElement.style.setProperty('--scroll-behavior', 'smooth');

// Añadir clase CSS para prevenir scroll
const style = document.createElement('style');
style.textContent = `
    body.no-scroll {
        overflow: hidden;
        position: fixed;
        width: 100%;
    }
`;
document.head.appendChild(style);
