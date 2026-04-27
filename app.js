// app.js - Enterprise Interaction Logic

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize GSAP & ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const magneticElements = document.querySelectorAll('.magnetic-el');

    if (window.innerWidth > 1024 && cursor) {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        // Magnetic Hover Effect & Cursor Expansion
        magneticElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Pull element slightly towards cursor
                gsap.to(el, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // 3. Hero Sequence & Parallax
    const heroTl = gsap.timeline();
    
    heroTl.from(".hero-title", { 
        y: 150, opacity: 0, duration: 1.5, ease: "power4.out" 
    })
    .from(".hero-title-2", { 
        y: 150, opacity: 0, duration: 1.5, ease: "power4.out" 
    }, "-=1.2")
    .from(".hero-fade", {
        y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power2.out"
    }, "-=1");

    // Subtle parallax on hero image scroll
    gsap.to(".hero-parallax", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 4. Philosophy & Services Reveal
    // Staggered text reveal for philosophical copy
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.from(text, {
            scrollTrigger: { trigger: text, start: "top 85%" },
            y: 40, opacity: 0, duration: 1, ease: "power3.out"
        });
    });

    // Image reveal for the photographer portrait
    gsap.from(".reveal-img", {
        scrollTrigger: { trigger: ".reveal-img", start: "top 80%" },
        scale: 1.1, filter: "blur(10px)", opacity: 0, duration: 1.5, ease: "power3.out"
    });

    // Service cards staggered drop-in
    gsap.from(".service-card", {
        scrollTrigger: { trigger: ".service-grid", start: "top 75%" },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out"
    });

    // Investment cards staggered pop
    gsap.from(".reveal-card", {
        scrollTrigger: { trigger: "#investment", start: "top 75%" },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)"
    });

    // 5. The $50k Scroll-Stopper: Horizontal Gallery
    const galleryContainer = document.querySelector('.gallery-container');
    const panels = gsap.utils.toArray('.gallery-panel');

    if (galleryContainer && panels.length > 0) {
        let scrollTween = gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".gallery-wrapper",
                pin: true,
                scrub: 1, 
                snap: 1 / (panels.length - 1), 
                end: () => "+=" + galleryContainer.offsetWidth
            }
        });

        // Image Parallax within the Horizontal Scroll
        panels.forEach((panel) => {
            const img = panel.querySelector('.image-reveal');
            gsap.fromTo(img, 
                { x: 100 }, 
                {
                    x: -100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: scrollTween, 
                        start: "left right",
                        end: "right left",
                        scrub: true
                    }
                }
            );
        });
    }

    // 6. Social Proof (Stars) Reveal
    gsap.from(".social-text", {
        scrollTrigger: { trigger: ".star-container", start: "top 85%" },
        y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power2.out"
    });
});
