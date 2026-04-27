// app.js

document.addEventListener("DOMContentLoaded", (event) => {
    // 1. Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initial Hero Load Animation (The Entrance)
    const tl = gsap.timeline();
    
    tl.from(".hero-title", { 
        y: 100, 
        opacity: 0, 
        duration: 1.5, 
        ease: "power4.out" 
    })
    .from(".hero-subtitle", { 
        y: 50, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out" 
    }, "-=1")
    .from(".hero-scroll", {
        opacity: 0,
        duration: 1
    }, "-=0.5");

    // 3. The $50k Scroll-Stopper: Horizontal Gallery Logic
    const galleryContainer = document.querySelector('.gallery-container');
    const panels = gsap.utils.toArray('.gallery-panel');

    // Pin the wrapper and move the container horizontally
    let scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".gallery-wrapper",
            pin: true,
            scrub: 1, // Smooth scrubbing (adds inertia to the scroll)
            snap: 1 / (panels.length - 1), // Snaps to the nearest image panel
            end: () => "+=" + galleryContainer.offsetWidth
        }
    });

    // 4. Subtle Image Parallax within the Horizontal Scroll
    // This makes the images move slightly slower than the scroll, creating depth.
    panels.forEach((panel, i) => {
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

    // 5. Social Proof Reveal (Fade Up on Scroll)
    gsap.from(".social-text", {
        scrollTrigger: {
            trigger: ".star-container",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });
});
