// ===================================
// REVOLUTIONARY LOADING SCREEN
// ===================================

// Particle System Canvas
const particleCanvas = document.getElementById('particleCanvas');
if (particleCanvas) {
    const pCtx = particleCanvas.getContext('2d');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;
        }

        draw() {
            const gradient = pCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, `rgba(79, 172, 254, ${this.opacity})`);
            gradient.addColorStop(1, 'rgba(79, 172, 254, 0)');

            pCtx.beginPath();
            pCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            pCtx.fillStyle = gradient;
            pCtx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const opacity = (1 - distance / 100) * 0.2;
                    pCtx.strokeStyle = `rgba(79, 172, 254, ${opacity})`;
                    pCtx.lineWidth = 1;
                    pCtx.beginPath();
                    pCtx.moveTo(particles[i].x, particles[i].y);
                    pCtx.lineTo(particles[j].x, particles[j].y);
                    pCtx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// Matrix Rain Effect
const matrixCanvas = document.getElementById('matrixCanvas');
if (matrixCanvas) {
    const mCtx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        mCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        mCtx.fillStyle = '#00f2fe';
        mCtx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            mCtx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);
}

// Loading Progress and Stats Simulation
let loadingProgress = 0;
let cpuUsage = 0;
let memoryUsage = 0;

const progressPercentage = document.querySelector('.progress-percentage');
const cpuStat = document.getElementById('cpuStat');
const memStat = document.getElementById('memStat');

function updateLoadingStats() {
    if (loadingProgress < 100) {
        loadingProgress += Math.random() * 3 + 1;
        if (loadingProgress > 100) loadingProgress = 100;

        cpuUsage = Math.min(cpuUsage + Math.random() * 10, 95);
        memoryUsage = Math.min(memoryUsage + Math.random() * 50, 1024);

        if (progressPercentage) progressPercentage.textContent = `${Math.floor(loadingProgress)}%`;
        if (cpuStat) cpuStat.textContent = `${Math.floor(cpuUsage)}%`;
        if (memStat) memStat.textContent = `${Math.floor(memoryUsage)}MB`;

        requestAnimationFrame(updateLoadingStats);
    } else {
        if (cpuStat) cpuStat.textContent = '100%';
        if (memStat) memStat.textContent = '1024MB';
    }
}

updateLoadingStats();

// Hide Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000); // Show for 2 seconds - optimal user experience
});

// ===================================
// Navigation Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Mobile Menu Toggle
// ===================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-up');

            // Animate expertise bars
            if (entry.target.classList.contains('expertise-card')) {
                const fills = entry.target.querySelectorAll('.expertise-fill');
                fills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
            }

            // Animate service cards with stagger effect
            if (entry.target.classList.contains('services-grid')) {
                const cards = entry.target.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, index * 100);
                });
            }

            // Animate stat boxes
            if (entry.target.classList.contains('stats-grid')) {
                const statBoxes = entry.target.querySelectorAll('.stat-box');
                statBoxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.classList.add('fade-in');
                    }, index * 100);
                });
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const animatedElements = document.querySelectorAll(
    '.service-card, .about-content, .stats-grid, .expertise-card, .tech-category, .contact-wrapper, .services-grid'
);

animatedElements.forEach(element => {
    observer.observe(element);
});

// ===================================
// Form Handling with Node.js Backend
// ===================================
const contactForm = document.getElementById('contactForm');
const formResult = document.getElementById('formResult');

// API endpoint (change if deployed)
const API_URL = window.location.origin.includes('localhost')
    ? 'http://localhost:3000/api/contact'
    : '/api/contact'; // For production deployment

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="animation: spin 1s linear infinite;">
            <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="50" opacity="0.3"/>
            <path d="M10 2a8 8 0 018 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Sending...
    `;

    formResult.style.display = 'block';
    formResult.innerHTML = "Sending your message...";
    formResult.style.background = '#e0e7ff';
    formResult.style.color = '#4338ca';
    formResult.style.border = '2px solid #818cf8';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const result = await response.json();

        if (response.status === 200) {
            // Success
            formResult.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                        <strong>Message sent successfully!</strong><br>
                        <span style="font-size: 13px; opacity: 0.9;">We'll get back to you within 24 hours.</span>
                    </div>
                </div>
            `;
            formResult.style.background = '#d1fae5';
            formResult.style.color = '#065f46';
            formResult.style.border = '2px solid #10b981';

            // Reset form
            contactForm.reset();

            // Reset button
            submitButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Sent Successfully!
            `;
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            // Reset button after 5 seconds
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                submitButton.style.background = '';
                formResult.style.display = 'none';
            }, 5000);

        } else {
            // Error from server
            formResult.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#dc2626" stroke-width="2"/>
                        <path d="M12 8v4m0 4h.01" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <div>
                        <strong>Error:</strong> ${result.message || 'Something went wrong!'}<br>
                        <span style="font-size: 13px; opacity: 0.9;">Please try again or email us at hello@mocell.tech</span>
                    </div>
                </div>
            `;
            formResult.style.background = '#fee2e2';
            formResult.style.color = '#991b1b';
            formResult.style.border = '2px solid #ef4444';

            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }

    } catch (error) {
        // Network or other error
        console.error('Form submission error:', error);
        formResult.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#dc2626" stroke-width="2"/>
                    <path d="M12 8v4m0 4h.01" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <div>
                    <strong>Connection error!</strong><br>
                    <span style="font-size: 13px; opacity: 0.9;">Please check your internet connection or email us directly at hello@mocell.tech</span>
                </div>
            </div>
        `;
        formResult.style.background = '#fee2e2';
        formResult.style.color = '#991b1b';
        formResult.style.border = '2px solid #ef4444';

        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});

// ===================================
// Add Spinning Animation for Loading State
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===================================
// Parallax Effect for Hero Background
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Active Navigation Link Highlighting
// ===================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = navbar.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===================================
// Tech Tags Hover Effect Enhancement
// ===================================
const techTags = document.querySelectorAll('.tech-tag');
techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===================================
// Service Cards Click to Expand (Optional)
// ===================================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class from all cards
        serviceCards.forEach(c => c.classList.remove('active-card'));
        // Add active class to clicked card
        this.classList.add('active-card');
    });
});

// ===================================
// Initialize on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease-out';
            heroContent.style.opacity = '1';
        }, 100);
    }

    // Add subtle entrance animation to navbar
    navbar.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        navbar.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        navbar.style.transform = 'translateY(0)';
    }, 100);
});

// ===================================
// Counter Animation for Stats
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Observe hero stats for counter animation
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number) {
                        stat.dataset.suffix = text.replace(/\d+/g, '');
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(heroStats);
}

// ===================================
// Cursor Trail Effect (Optional - Elegant Touch)
// ===================================
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.gradient-blob');

circles.forEach((circle) => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
        circle.style.left = x - 12 + 'px';
        circle.style.top = y - 12 + 'px';

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

// Uncomment to enable cursor trail effect
// animateCircles();

// ===================================
// Lazy Loading for Images (if you add images later)
// ===================================
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===================================
// Coming Soon Links Handler
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const comingSoonLinks = document.querySelectorAll('.coming-soon-link');

    comingSoonLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showComingSoonModal(link.textContent.trim());
        });
    });
});

function showComingSoonModal(featureName) {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    `;

    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 50px 40px;
        border-radius: 20px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    modal.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px;">🚀</div>
        <h2 style="margin: 0 0 15px 0; font-size: 28px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            Coming Soon!
        </h2>
        <p style="margin: 0 0 10px 0; color: #4a5568; font-size: 18px; font-weight: 600;">
            ${featureName}
        </p>
        <p style="margin: 0 0 30px 0; color: #718096; font-size: 14px; line-height: 1.6;">
            We're working hard to bring you this feature.<br>
            Stay tuned for updates!
        </p>
        <button id="closeModal" style="
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 14px 32px;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        ">
            Got it!
        </button>
    `;

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    // Add animations CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Close modal handlers
    const closeModal = () => {
        backdrop.style.animation = 'fadeOut 0.3s ease-out';
        modal.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => backdrop.remove(), 300);
    };

    document.getElementById('closeModal').addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
    });

    // Add fadeOut and slideDown animations
    style.textContent += `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes slideDown {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
        }
    `;

    // Add hover effect to button
    const button = document.getElementById('closeModal');
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
}

// ===================================
// Console Message (Easter Egg)
// ===================================
console.log('%c🚀 MoCell - Built with passion', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cLooking for talented developers? We\'re hiring!', 'color: #764ba2; font-size: 14px;');
console.log('%cEmail us at: hello@mocell.tech', 'color: #4facfe; font-size: 12px;');

// ===================================
// Tech Network Graph Visualization
// ===================================
const techGraphCanvas = document.getElementById('techGraph');
if (techGraphCanvas) {
    const ctx = techGraphCanvas.getContext('2d');
    let animationId;
    
    // Resize canvas to container
    function resizeCanvas() {
        const container = techGraphCanvas.parentElement;
        techGraphCanvas.width = container.offsetWidth;
        techGraphCanvas.height = container.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create nodes representing technologies
    const nodes = [];
    const numNodes = 30;
    
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * techGraphCanvas.width,
            y: Math.random() * techGraphCanvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 2,
            connections: []
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, techGraphCanvas.width, techGraphCanvas.height);
        
        // Update and draw nodes
        nodes.forEach((node, i) => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > techGraphCanvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > techGraphCanvas.height) node.vy *= -1;
            
            // Keep within bounds
            node.x = Math.max(0, Math.min(techGraphCanvas.width, node.x));
            node.y = Math.max(0, Math.min(techGraphCanvas.height, node.y));
            
            // Draw connections to nearby nodes
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        const opacity = (1 - distance / 150) * 0.3;
                        ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.stroke();
                    }
                }
            });
            
            // Draw node
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius);
            gradient.addColorStop(0, 'rgba(102, 126, 234, 0.8)');
            gradient.addColorStop(1, 'rgba(118, 75, 162, 0.4)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// ===================================
// Animated Counter for Tech Stats
// ===================================
const techStats = document.querySelectorAll('.tech-stat-value');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    
    techStats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
    
    statsAnimated = true;
}

// Trigger stats animation when graph comes into view
const techGraphContainer = document.querySelector('.tech-graph-container');
if (techGraphContainer) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(techGraphContainer);
}

// ===================================
// REVOLUTIONARY HERO CIRCUIT BOARD
// ===================================
const circuitCanvas = document.getElementById('circuitCanvas');
if (circuitCanvas) {
    const cCtx = circuitCanvas.getContext('2d');
    const container = circuitCanvas.parentElement;
    circuitCanvas.width = container.offsetWidth;
    circuitCanvas.height = container.offsetHeight;

    // Circuit nodes
    const circuitNodes = [];
    const nodeCount = 30;

    class CircuitNode {
        constructor() {
            this.x = Math.random() * circuitCanvas.width;
            this.y = Math.random() * circuitCanvas.height;
            this.radius = Math.random() * 3 + 2;
            this.connections = [];
            this.pulsePhase = Math.random() * Math.PI * 2;
        }

        draw() {
            // Node glow
            const gradient = cCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
            gradient.addColorStop(0, 'rgba(0, 242, 254, 0.8)');
            gradient.addColorStop(1, 'rgba(0, 242, 254, 0)');
            cCtx.fillStyle = gradient;
            cCtx.beginPath();
            cCtx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
            cCtx.fill();

            // Node core
            cCtx.fillStyle = '#00f2fe';
            cCtx.beginPath();
            cCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            cCtx.fill();

            // Pulse ring
            const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
            cCtx.strokeStyle = `rgba(0, 242, 254, ${pulse * 0.5})`;
            cCtx.lineWidth = 2;
            cCtx.beginPath();
            cCtx.arc(this.x, this.y, this.radius + pulse * 10, 0, Math.PI * 2);
            cCtx.stroke();
        }
    }

    // Create circuit nodes
    for (let i = 0; i < nodeCount; i++) {
        circuitNodes.push(new CircuitNode());
    }

    // Create circuit paths between nearby nodes
    circuitNodes.forEach((node, i) => {
        circuitNodes.forEach((otherNode, j) => {
            if (i !== j) {
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200 && node.connections.length < 3) {
                    node.connections.push(otherNode);
                }
            }
        });
    });

    // Animated data packets
    const dataPackets = [];

    class DataPacket {
        constructor(start, end) {
            this.start = start;
            this.end = end;
            this.progress = 0;
            this.speed = 0.005 + Math.random() * 0.01;
            this.color = ['#00f2fe', '#4facfe', '#667eea'][Math.floor(Math.random() * 3)];
        }

        update() {
            this.progress += this.speed;
            if (this.progress >= 1) {
                this.progress = 0;
                // Find new random connection
                const newStart = circuitNodes[Math.floor(Math.random() * circuitNodes.length)];
                if (newStart.connections.length > 0) {
                    this.start = newStart;
                    this.end = newStart.connections[Math.floor(Math.random() * newStart.connections.length)];
                }
            }
        }

        draw() {
            const x = this.start.x + (this.end.x - this.start.x) * this.progress;
            const y = this.start.y + (this.end.y - this.start.y) * this.progress;

            // Packet glow
            const gradient = cCtx.createRadialGradient(x, y, 0, x, y, 8);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            cCtx.fillStyle = gradient;
            cCtx.beginPath();
            cCtx.arc(x, y, 8, 0, Math.PI * 2);
            cCtx.fill();

            // Packet core
            cCtx.fillStyle = this.color;
            cCtx.beginPath();
            cCtx.arc(x, y, 3, 0, Math.PI * 2);
            cCtx.fill();
        }
    }

    // Create initial data packets
    circuitNodes.forEach(node => {
        if (node.connections.length > 0) {
            const end = node.connections[Math.floor(Math.random() * node.connections.length)];
            dataPackets.push(new DataPacket(node, end));
        }
    });

    // Animation loop
    let time = 0;
    function animateCircuit() {
        time += 0.02;
        cCtx.clearRect(0, 0, circuitCanvas.width, circuitCanvas.height);

        // Draw circuit paths
        circuitNodes.forEach(node => {
            node.connections.forEach(connection => {
                const gradient = cCtx.createLinearGradient(node.x, node.y, connection.x, connection.y);
                gradient.addColorStop(0, 'rgba(0, 242, 254, 0.2)');
                gradient.addColorStop(0.5, 'rgba(102, 126, 234, 0.2)');
                gradient.addColorStop(1, 'rgba(0, 242, 254, 0.2)');

                cCtx.strokeStyle = gradient;
                cCtx.lineWidth = 1.5;
                cCtx.beginPath();
                cCtx.moveTo(node.x, node.y);
                cCtx.lineTo(connection.x, connection.y);
                cCtx.stroke();

                // Animated dash effect
                const midX = (node.x + connection.x) / 2;
                const midY = (node.y + connection.y) / 2;
                const offset = Math.sin(time) * 5;

                cCtx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
                cCtx.lineWidth = 2;
                cCtx.setLineDash([5, 10]);
                cCtx.lineDashOffset = offset;
                cCtx.beginPath();
                cCtx.moveTo(node.x, node.y);
                cCtx.lineTo(connection.x, connection.y);
                cCtx.stroke();
                cCtx.setLineDash([]);
            });
        });

        // Update and draw data packets
        dataPackets.forEach(packet => {
            packet.update();
            packet.draw();
        });

        // Draw nodes with pulsing
        circuitNodes.forEach(node => {
            node.pulsePhase += 0.03;
            node.draw();
        });

        requestAnimationFrame(animateCircuit);
    }

    animateCircuit();

    // Handle resize
    window.addEventListener('resize', () => {
        circuitCanvas.width = container.offsetWidth;
        circuitCanvas.height = container.offsetHeight;

        // Reposition nodes proportionally
        circuitNodes.forEach(node => {
            node.x = Math.random() * circuitCanvas.width;
            node.y = Math.random() * circuitCanvas.height;
        });
    });
}
