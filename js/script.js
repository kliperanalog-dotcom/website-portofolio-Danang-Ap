/**
 * Main Controller Script
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Auto-Typing Effect di Hero Section
    const typeTarget = document.getElementById('typing-target');
    if (typeTarget) {
        const words = ['Content Creator', 'Video Editor Klaten', 'Social Media Manager'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typeTarget.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeTarget.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 150;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Jeda sebelum menghapus
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // 2. Sticky Navbar & Scroll Progress Effect
    const navbar = document.querySelector('.navbar');
    const scrollProgressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if(scrollProgressBar) scrollProgressBar.style.width = scrolled + '%';

        // Back To Top Button Visibility
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // 3. Native Observer Animation Trigger (AOS alternative)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Progress Bar animation trigger khusus skill card
                if(entry.target.classList.contains('skill-card')) {
                    const fill = entry.target.querySelector('.progress-bar-fill');
                    if(fill) fill.style.width = fill.getAttribute('data-progress') + '%';
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .skill-card').forEach(el => observer.observe(el));

    // 4. Back to top click event
    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
