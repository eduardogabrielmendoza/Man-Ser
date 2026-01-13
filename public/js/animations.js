/* ========================================================================
   ANIMATIONS.JS - Sistema de Animaciones Premium Man-Ser
   ======================================================================== */

(function() {
    'use strict';

    /* ========================================================================
       INTERSECTION OBSERVER - Scroll Reveal Bidireccional
       ======================================================================== */
    
    // Observer para animaciones que reaccionan al scroll up/down
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                entry.target.classList.remove('anim-hidden');
            } else {
                // Scroll bidireccional: quitar animación al salir del viewport
                if (entry.boundingClientRect.top > 0) {
                    // Elemento está por debajo del viewport (scroll up)
                    entry.target.classList.remove('anim-visible');
                    entry.target.classList.add('anim-hidden');
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    // Inicializar observador para elementos con clase anim-ready
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.anim-ready');
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }
    
    /* ========================================================================
       SCROLL REVEAL PREMIUM - Con estados parciales
       ======================================================================== */
    
    function initScrollRevealPremium() {
        const elements = document.querySelectorAll('.scroll-reveal');
        
        if (elements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const el = entry.target;
                
                if (entry.isIntersecting) {
                    // Elemento entrando al viewport
                    if (entry.intersectionRatio >= 0.3) {
                        el.classList.add('is-visible');
                        el.classList.remove('is-partial');
                    } else {
                        el.classList.add('is-partial');
                        el.classList.remove('is-visible');
                    }
                } else {
                    // Elemento saliendo del viewport
                    if (entry.boundingClientRect.top > 0) {
                        // Saliendo por arriba (scroll up) - resetear
                        el.classList.remove('is-visible', 'is-partial');
                    }
                }
            });
        }, {
            threshold: [0, 0.15, 0.3, 0.5, 1],
            rootMargin: '-50px 0px -50px 0px'
        });
        
        elements.forEach(el => observer.observe(el));
    }

    /* ========================================================================
       PARALLAX EFFECT
       ======================================================================== */
    
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const container = el.parentElement;
                const containerRect = container.getBoundingClientRect();
                const containerTop = containerRect.top + scrolled;
                const containerHeight = container.offsetHeight;
                
                // Solo aplicar parallax si el elemento está en viewport
                if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
                    const parallaxOffset = (scrolled - containerTop) * 0.3;
                    el.style.transform = `translateY(${parallaxOffset}px)`;
                }
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    /* ========================================================================
       TILT EFFECT - 3D Card Hover
       ======================================================================== */
    
    function initTiltEffect() {
        const tiltElements = document.querySelectorAll('.card-tilt');
        
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    /* ========================================================================
       COUNTER ANIMATION
       ======================================================================== */
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        const suffix = element.dataset.suffix || '';
        const prefix = element.dataset.prefix || '';
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            element.textContent = prefix + current.toLocaleString('es-AR') + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target.toLocaleString('es-AR') + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    function initCounters() {
        const counterElements = document.querySelectorAll('.counter-value');
        
        if (counterElements.length === 0) return;
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    const target = parseInt(entry.target.dataset.target, 10);
                    const duration = parseInt(entry.target.dataset.duration, 10) || 2000;
                    animateCounter(entry.target, target, duration);
                }
            });
        }, { threshold: 0.5 });
        
        counterElements.forEach(el => counterObserver.observe(el));
    }

    /* ========================================================================
       RIPPLE EFFECT
       ======================================================================== */
    
    function initRippleEffect() {
        const rippleButtons = document.querySelectorAll('.btn-ripple-click');
        
        rippleButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    /* ========================================================================
       TEXT REVEAL - Letra por letra
       ======================================================================== */
    
    function initTextReveal() {
        const textElements = document.querySelectorAll('.text-reveal');
        
        textElements.forEach(el => {
            const text = el.textContent;
            el.innerHTML = '';
            el.style.visibility = 'visible';
            
            [...text].forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.opacity = '0';
                span.style.display = 'inline-block';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `opacity 0.3s ease ${i * 0.03}s, transform 0.3s ease ${i * 0.03}s`;
                el.appendChild(span);
            });
        });
        
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    textObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        textElements.forEach(el => textObserver.observe(el));
    }

    /* ========================================================================
       MAGNETIC HOVER EFFECT
       ======================================================================== */
    
    function initMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    /* ========================================================================
       SCROLL PROGRESS INDICATOR
       ======================================================================== */
    
    function initScrollProgress() {
        const indicator = document.querySelector('.scroll-indicator');
        
        if (!indicator) return;
        
        function updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollTop / docHeight;
            indicator.style.transform = `scaleX(${progress})`;
        }
        
        window.addEventListener('scroll', updateProgress, { passive: true });
    }

    /* ========================================================================
       SMOOTH SCROLL ENHANCEMENTS
       ======================================================================== */
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /* ========================================================================
       HEADER SCROLL EFFECTS
       ======================================================================== */
    
    function initHeaderEffects() {
        const header = document.querySelector('.header');
        
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Añadir clase scrolled
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show on scroll (opcional)
            // if (currentScroll > lastScroll && currentScroll > 200) {
            //     header.classList.add('header-hidden');
            // } else {
            //     header.classList.remove('header-hidden');
            // }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    /* ========================================================================
       STAGGER ANIMATION HELPER
       ======================================================================== */
    
    function staggerChildren(container, delay = 0.1) {
        const children = container.querySelectorAll('.anim-ready');
        children.forEach((child, index) => {
            child.style.transitionDelay = `${index * delay}s`;
        });
    }

    /* ========================================================================
       IMAGE LAZY LOAD WITH ANIMATION
       ======================================================================== */
    
    function initLazyImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (lazyImages.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('img-loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    /* ========================================================================
       FORM ANIMATIONS
       ======================================================================== */
    
    function initFormAnimations() {
        // Input focus effects
        const inputs = document.querySelectorAll('.form-input, .form-textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('input-focused');
                if (this.value) {
                    this.parentElement.classList.add('input-filled');
                } else {
                    this.parentElement.classList.remove('input-filled');
                }
            });
        });
    }

    /* ========================================================================
       LIGHTBOX ANIMATIONS - Premium con Blur
       ======================================================================== */
    
    function initLightboxAnimations() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        
        if (!lightbox || !lightboxImg) return;
        
        // Función para abrir lightbox con animación blur
        function openLightboxWithAnimation() {
            lightbox.style.transition = 'none';
            lightbox.style.background = 'rgba(0, 0, 0, 0)';
            lightbox.style.backdropFilter = 'blur(0px)';
            lightboxImg.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.85)';
            lightboxImg.style.filter = 'blur(15px)';
            
            requestAnimationFrame(() => {
                lightbox.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
                lightbox.style.background = 'rgba(0, 0, 0, 0.92)';
                lightbox.style.backdropFilter = 'blur(20px)';
                
                lightboxImg.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                lightboxImg.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
                lightboxImg.style.filter = 'blur(0)';
            });
        }
        
        // Función para cambiar imagen con blur
        window.changeLightboxImage = function(newSrc) {
            // Fade out con blur
            lightboxImg.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
            lightboxImg.style.opacity = '0';
            lightboxImg.style.transform = 'scale(1.02)';
            lightboxImg.style.filter = 'blur(10px)';
            
            setTimeout(() => {
                lightboxImg.src = newSrc;
                
                // Esperar a que cargue la imagen
                lightboxImg.onload = function() {
                    // Fade in con blur
                    requestAnimationFrame(() => {
                        lightboxImg.style.opacity = '1';
                        lightboxImg.style.transform = 'scale(1)';
                        lightboxImg.style.filter = 'blur(0)';
                    });
                };
            }, 300);
        };
        
        // Observar cuando se abre el lightbox
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    if (lightbox.classList.contains('active')) {
                        openLightboxWithAnimation();
                    }
                }
            });
        });
        
        observer.observe(lightbox, { attributes: true });
    }

    /* ========================================================================
       CURSOR EFFECTS (Opcional - para desktop)
       ======================================================================== */
    
    function initCustomCursor() {
        if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch devices
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
        // document.body.appendChild(cursor); // Descomentar para activar
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animateCursor);
        }
        
        // animateCursor(); // Descomentar para activar
    }

    /* ========================================================================
       TABS ANIMATION
       ======================================================================== */
    
    function initTabsAnimation() {
        const tabButtons = document.querySelectorAll('.specs-tab-btn, .tab-btn');
        
        tabButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.dataset.tab;
                const targetContent = document.getElementById(targetId);
                
                if (targetContent) {
                    // Animar contenido entrante
                    targetContent.style.animation = 'fadeInUp 0.4s ease forwards';
                }
            });
        });
    }

    /* ========================================================================
       SLIDESHOW ANIMATIONS - Premium con Blur
       ======================================================================== */
    
    function initSlideshowAnimations() {
        // Para slideshows con clase data-slideshow
        const slideshowContainers = document.querySelectorAll('[data-slideshow]');
        
        slideshowContainers.forEach(container => {
            const images = container.querySelectorAll('img');
            const prevBtn = container.querySelector('.img-nav.prev');
            const nextBtn = container.querySelector('.img-nav.next');
            
            if (images.length <= 1) return;
            
            let currentIndex = 0;
            let isTransitioning = false;
            
            function transitionToImage(newIndex) {
                if (isTransitioning || newIndex === currentIndex) return;
                isTransitioning = true;
                
                const currentImg = images[currentIndex];
                const newImg = images[newIndex];
                
                // Fade out actual con blur
                currentImg.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
                currentImg.style.opacity = '0';
                currentImg.style.filter = 'blur(8px)';
                currentImg.style.transform = 'scale(1.02)';
                
                setTimeout(() => {
                    currentImg.classList.remove('active');
                    currentImg.classList.add('hidden');
                    currentImg.style.opacity = '';
                    currentImg.style.filter = '';
                    currentImg.style.transform = '';
                    
                    // Preparar nueva imagen
                    newImg.style.opacity = '0';
                    newImg.style.filter = 'blur(8px)';
                    newImg.style.transform = 'scale(0.98)';
                    newImg.classList.remove('hidden');
                    newImg.classList.add('active');
                    
                    // Fade in con blur
                    requestAnimationFrame(() => {
                        newImg.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
                        newImg.style.opacity = '1';
                        newImg.style.filter = 'blur(0)';
                        newImg.style.transform = 'scale(1)';
                    });
                    
                    currentIndex = newIndex;
                    
                    setTimeout(() => {
                        isTransitioning = false;
                    }, 400);
                }, 350);
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const newIndex = (currentIndex - 1 + images.length) % images.length;
                    transitionToImage(newIndex);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const newIndex = (currentIndex + 1) % images.length;
                    transitionToImage(newIndex);
                });
            }
        });
        
        // Para slideshows con clase slideshow-main-image
        const legacySlideshows = document.querySelectorAll('.slideshow-main-image');
        
        legacySlideshows.forEach(slideshow => {
            const img = slideshow.querySelector('img');
            if (!img) return;
            
            // Añadir transición suave al cambiar imagen
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.attributeName === 'src') {
                        img.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
                        img.style.opacity = '0';
                        img.style.filter = 'blur(8px)';
                        img.style.transform = 'scale(1.02)';
                        
                        setTimeout(() => {
                            img.style.opacity = '1';
                            img.style.filter = 'blur(0)';
                            img.style.transform = 'scale(1)';
                        }, 50);
                    }
                });
            });
            
            observer.observe(img, { attributes: true });
        });
    }

    /* ========================================================================
       HOVER SOUND EFFECTS (Opcional)
       ======================================================================== */
    
    function initSoundEffects() {
        // Descomentar para activar sonidos
        // const hoverSound = new Audio('/sounds/hover.mp3');
        // hoverSound.volume = 0.1;
        
        // document.querySelectorAll('.btn').forEach(btn => {
        //     btn.addEventListener('mouseenter', () => {
        //         hoverSound.currentTime = 0;
        //         hoverSound.play();
        //     });
        // });
    }

    /* ========================================================================
       INITIALIZATION
       ======================================================================== */
    
    function init() {
        // Core animations
        initScrollAnimations();
        initScrollRevealPremium();
        initParallax();
        initTiltEffect();
        initCounters();
        initRippleEffect();
        initHeaderEffects();
        
        // Text effects
        initTextReveal();
        
        // Interactive effects
        initMagneticEffect();
        initSmoothScroll();
        
        // UI enhancements
        initScrollProgress();
        initLazyImages();
        initFormAnimations();
        initLightboxAnimations();
        initTabsAnimation();
        initSlideshowAnimations();
        
        // Optional effects
        // initCustomCursor();
        // initSoundEffects();
        
        console.log('✨ Man-Ser Animations initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize on dynamic content (if needed)
    window.ManSerAnimations = {
        init,
        initScrollAnimations,
        initCounters,
        staggerChildren,
        animateCounter
    };

})();
