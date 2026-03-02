// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== Tax Banner Dismiss =====
const taxBanner = document.getElementById('taxBanner');
const closeBanner = document.getElementById('closeBanner');
if (closeBanner && taxBanner) {
    closeBanner.addEventListener('click', () => {
        taxBanner.classList.add('hidden');
        // Update CSS custom property so everything repositions
        document.documentElement.style.setProperty('--banner-height', '0px');
        document.getElementById('navbar').style.top = '0';
    });
}

// ===== Close mobile menu on outside click =====
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !navToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===== Lock body scroll when mobile menu is open =====
function toggleBodyScroll() {
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Watch for nav changes
const navObserver = new MutationObserver(toggleBodyScroll);
navObserver.observe(navLinks, { attributes: true, attributeFilter: ['class'] });

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
    }
});

// ===== Back to Top Button =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Scroll Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.trust-card, .service-card, .why-card, .contact-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
            navLink.style.color = '#0ea5e9';
        }
    });
});

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            btn.textContent = '✓ Message Sent!';
            btn.style.backgroundColor = '#10b981';
            contactForm.reset();
        } else {
            // Fallback to mailto if Formspree fails
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone') || 'Not provided';
            const service = formData.get('service');
            const message = formData.get('message');
            const subject = encodeURIComponent(`New Inquiry from ${name} - ${service}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`);
            window.location.href = `mailto:tax.annanguyen@gmail.com?subject=${subject}&body=${body}`;
            btn.textContent = 'Opening Email Client...';
            btn.style.backgroundColor = '#f59e0b';
        }
    } catch (err) {
        // Fallback to mailto on network error
        const formData = new FormData(contactForm);
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const phone = formData.get('phone') || 'Not provided';
        const service = formData.get('service') || '';
        const message = formData.get('message') || '';
        const subject = encodeURIComponent(`New Inquiry from ${name} - ${service}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`);
        window.location.href = `mailto:tax.annanguyen@gmail.com?subject=${subject}&body=${body}`;
        btn.textContent = 'Opening Email Client...';
        btn.style.backgroundColor = '#f59e0b';
    }
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.disabled = false;
    }, 3000);
});

// ===== Smooth scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
