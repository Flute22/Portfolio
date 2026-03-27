// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// --- LENIS SMOOTH SCROLL ---
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    lerp: 0.08,
    smoothWheel: true
});

// Integrate Lenis with GSAP ScrollTrigger (single RAF via GSAP ticker)
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --- CUSTOM CURSOR ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

// Add tooltip span to cursor ring
const tooltipText = document.createElement('span');
tooltipText.className = 'tooltip-text';
cursorRing.appendChild(tooltipText);

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate dot position — zero lag
    gsap.set(cursorDot, { x: mouseX, y: mouseY });
});

// Lerp ring position — higher factor = faster follow
function updateCursor() {
    ringX += (mouseX - ringX) * 0.25;
    ringY += (mouseY - ringY) * 0.25;

    gsap.set(cursorRing, {
        x: ringX,
        y: ringY,
        xPercent: -50,
        yPercent: -50
    });
}
gsap.ticker.add(updateCursor);

// Cursor Hover States
const interactives = document.querySelectorAll('a, button, .work-card, .nav-pill, [data-tooltip]');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('active');
        cursorDot.classList.add('active');
        
        // Show tooltip if available
        const tooltip = el.getAttribute('data-tooltip');
        if (tooltip) {
            tooltipText.textContent = tooltip;
        } else {
            tooltipText.textContent = "";
        }

        if (el.classList.contains('work-card')) {
            cursorRing.classList.add('video');
        }
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('active');
        cursorDot.classList.remove('active');
        cursorRing.classList.remove('video');
        tooltipText.textContent = "";
    });
});

// --- PRELOADER LOGIC ---
const preloader = document.getElementById('preloader');
const countdownEl = document.getElementById('countdown');
const scratchesContainer = document.querySelector('.preloader-scratches');

function createScratch() {
    const scratch = document.createElement('div');
    scratch.className = 'scratch';
    scratch.style.top = Math.random() * 100 + '%';
    scratch.style.width = (80 + Math.random() * 20) + '%';
    scratch.style.left = (Math.random() * 20 - 10) + '%';
    scratchesContainer.appendChild(scratch);
    
    setTimeout(() => scratch.remove(), 100);
}

let countdown = 3;
const preloaderInterval = setInterval(() => {
    createScratch();
    if (Math.random() > 0.7) createScratch();
}, 80);

const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
        countdownEl.textContent = countdown;
    } else {
        clearInterval(countdownInterval);
        clearInterval(preloaderInterval);
        startApp();
    }
}, 900);

function startApp() {
    // Flash effect
    const flash = document.createElement('div');
    flash.className = 'flash';
    document.body.appendChild(flash);
    
    setTimeout(() => {
        gsap.to(flash, { opacity: 0, duration: 0.5, onComplete: () => flash.remove() });
        gsap.to(preloader, { 
            opacity: 0, 
            duration: 0.8, 
            ease: "power2.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.classList.remove('is-loading');
                initHeroAnimations();
            }
        });
    }, 80);
}

// --- HERO ANIMATIONS ---
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    tl.to('.nav', { y: 0, duration: 1, ease: "expo.out" })
      .to('.hero-top-label', { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .from('.hero-name .line-1', { y: 100, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.6")
      .from('.hero-name .line-2', { y: 100, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.8")
      .to('.underline-svg path', { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.4")
      .to('.stat-pill', { opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: "expo.out" }, "-=1")
      .add(() => {
          startTypewriter();
          animateStats();
      }, "-=0.5");
}

function startTypewriter() {
    const text = "I don't just shoot — I tell stories with light.";
    const typewriter = document.getElementById('typewriter');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            typewriter.textContent += text.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }
    type();
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const duration = 1500; // max 1.5s regardless of device speed
    const startTime = performance.now();

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.parentElement.classList.contains('left') ? "+" : "";

        const updateCount = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            stat.textContent = Math.ceil(target * progress) + suffix;
            if (progress < 1) requestAnimationFrame(updateCount);
        };
        requestAnimationFrame(updateCount);
    });
}

// --- SCROLL PROGRESS ---
const progressBar = document.querySelector(".progress-bar");
const navEl = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.height = scrolled + "%";

    // Nav Background on Scroll
    navEl.classList.toggle('scrolled', winScroll > 50);
}, { passive: true });

// --- ABOUT SECTION ANIMATIONS ---
gsap.from('.about-heading', {
    scrollTrigger: {
        trigger: '.about',
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "expo.out"
});

gsap.from('.about-bio p', {
    scrollTrigger: {
        trigger: '.about-bio',
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
});

// Skills Progress Bars
gsap.to('.progress-fill', {
    scrollTrigger: {
        trigger: '.skills-timeline',
        start: "top 80%",
    },
    width: (i, target) => target.style.getPropertyValue('--target'),
    duration: 1.5,
    stagger: 0.2,
    ease: "expo.out"
});

// Frame Counter in About — pauses when tab is hidden to save CPU
let frameCount = 247;
const frameCounterEl = document.getElementById('frame-counter');

function tickFrameCounter() {
    frameCount += Math.floor(Math.random() * 3);
    frameCounterEl.textContent = frameCount.toString().padStart(6, '0');
}

let frameInterval = setInterval(tickFrameCounter, 100);
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(frameInterval);
    } else {
        frameInterval = setInterval(tickFrameCounter, 100);
    }
});

// --- WORK SECTION ---
// Work Card Timecode Animation
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
    const timecode = card.querySelector('.card-timecode');
    let interval;
    
    card.addEventListener('mouseenter', () => {
        let frames = 0;
        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        
        // Duration is 3s (matching CSS transition)
        // At 24fps, 3s = 72 frames
        const totalFrames = 72;
        let currentFrame = 0;
        
        interval = setInterval(() => {
            currentFrame++;
            if (currentFrame > totalFrames) {
                clearInterval(interval);
                return;
            }
            
            frames++;
            if (frames >= 24) {
                frames = 0;
                seconds++;
            }
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
            
            const h = hours.toString().padStart(2, '0');
            const m = minutes.toString().padStart(2, '0');
            const s = seconds.toString().padStart(2, '0');
            const f = frames.toString().padStart(2, '0');
            
            timecode.textContent = `${h}:${m}:${s}:${f}`;
        }, 1000 / 24); // 24fps
    });
    
    card.addEventListener('mouseleave', () => {
        clearInterval(interval);
        timecode.textContent = "00:00:00:00";
    });
});

// Razor Slicing Animation
gsap.to('.razor-svg', {
    scrollTrigger: {
        trigger: '.work-header',
        start: "top 80%",
        end: "top 20%",
        scrub: 1
    },
    x: "100vw",
    ease: "none"
});

// Work Cards Stagger
gsap.from('.work-card', {
    scrollTrigger: {
        trigger: '.work-grid',
        start: "top 80%",
    },
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "expo.out",
    clearProps: "transform"
});

// VanillaTilt removed — subtle CSS lift handles hover instead

// --- EDIT ROOM HORIZONTAL SCROLL ---
const sections = gsap.utils.toArray(".panel");
if (window.innerWidth > 768) {
    const panelDots = document.querySelectorAll('.panel-dots .dot');

    // Store the tween to reuse as containerAnimation (avoids creating redundant timelines)
    const hScrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".edit-room",
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + document.querySelector(".panel-container").offsetWidth
        }
    });

    // Update dots and panel progress — reuse hScrollTween
    sections.forEach((panel, i) => {
        ScrollTrigger.create({
            trigger: panel,
            containerAnimation: hScrollTween,
            start: "left center",
            end: "right center",
            onToggle: self => {
                if (self.isActive) {
                    panelDots.forEach(d => d.classList.remove('active'));
                    panelDots[i].classList.add('active');
                }
            }
        });

        gsap.to(panel.querySelector('.panel-progress'), {
            width: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: panel,
                containerAnimation: hScrollTween,
                start: "left right",
                end: "right right",
                scrub: true
            }
        });
    });
}

// --- TESTIMONIALS ---
const testimonials = [
    {
        quote: "Pankaj has an extraordinary eye. Our wedding film made us cry every single time we watch it — he captured moments we didn't even know happened.",
        attr: "— RIYA & ARJUN MEHTA, WEDDING CLIENTS"
    },
    {
        quote: "The product photos he delivered were beyond anything we expected. Clean, cinematic, and completely on-brand. Our sales literally went up.",
        attr: "— SNEHA KAPOOR, FOUNDER AT LUMIÈRE BEAUTY"
    },
    {
        quote: "He understands both the camera and the edit. The travel video he made for our resort went viral on Instagram. Truly rare talent.",
        attr: "— RAHUL SHARMA, MARKETING HEAD AT AZURE RESORTS"
    }
];

let currentTestimonial = 0;
const quoteEl = document.querySelector('.testimonials .quote');
const attrEl = document.querySelector('.testimonials .attribution');
const testimonialDots = document.querySelectorAll('.testimonial-nav .nav-dot');

function updateTestimonial(index) {
    gsap.to('.testimonial-content', { 
        opacity: 0, 
        y: -10, 
        duration: 0.4, 
        onComplete: () => {
            quoteEl.textContent = `"${testimonials[index].quote}"`;
            attrEl.textContent = testimonials[index].attr;
            testimonialDots.forEach(d => d.classList.remove('active'));
            testimonialDots[index].classList.add('active');
            
            gsap.to('.testimonial-content', { opacity: 1, y: 0, duration: 0.6 });
        }
    });
}

setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
}, 5000);

testimonialDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentTestimonial = i;
        updateTestimonial(i);
    });
});

// --- CONTACT FORM ---
const contactForm = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.submit-btn');
const clapperArm = document.querySelector('.clapper-arm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clapper animation (The "Clap")
    gsap.to(clapperArm, { 
        rotate: -45, 
        duration: 0.08, 
        yoyo: true, 
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
            submitBtn.querySelector('.btn-text').textContent = "SENDING...";
            
            // Subtle shake on the button when it claps
            gsap.to(submitBtn, { x: 2, duration: 0.05, yoyo: true, repeat: 3 });
            
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = "SENT. ✓";
                contactForm.reset();
                
                // Success flash
                const flash = document.createElement('div');
                flash.style.position = 'absolute';
                flash.style.top = '0';
                flash.style.left = '0';
                flash.style.width = '100%';
                flash.style.height = '100%';
                flash.style.background = 'var(--color-paper)';
                flash.style.opacity = '0.5';
                submitBtn.appendChild(flash);
                gsap.to(flash, { opacity: 0, duration: 0.5, onComplete: () => flash.remove() });
            }, 1500);
        }
    });
});

// --- FOOTER ANIMATION ---
// Light leak sweep is handled by CSS animation
