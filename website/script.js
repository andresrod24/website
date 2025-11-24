// Fix navigation links for local development vs Vercel
// Vercel uses cleanUrls (no .html), but local servers need .html extension
(function() {
    // Check if we're running locally (localhost or 127.0.0.1)
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' ||
                    window.location.hostname === '';
    
    if (isLocal) {
        // Intercept navigation clicks and fix URLs
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href="/"], a[href="/portfolio"], a[href="/references"]');
            if (link) {
                const href = link.getAttribute('href');
                if (href === '/') {
                    e.preventDefault();
                    window.location.href = '/index.html';
                } else if (href === '/portfolio') {
                    e.preventDefault();
                    window.location.href = '/portfolio.html';
                } else if (href === '/references') {
                    e.preventDefault();
                    window.location.href = '/references.html';
                }
            }
        });
        
        // Also update href attributes for better UX (shows correct URL on hover)
        function updateNavLinks() {
            const navLinks = document.querySelectorAll('a[href="/"], a[href="/portfolio"], a[href="/references"]');
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === '/') {
                    link.setAttribute('href', '/index.html');
                } else if (href === '/portfolio') {
                    link.setAttribute('href', '/portfolio.html');
                } else if (href === '/references') {
                    link.setAttribute('href', '/references.html');
                }
            });
        }
        
        // Update links when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateNavLinks);
        } else {
            updateNavLinks();
        }
    }
})();

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setInterval(() => {
            scrollIndicator.style.opacity = scrollIndicator.style.opacity === '0.5' ? '1' : '0.5';
        }, 1000);
    }

    // Add intersection observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all project sections
    document.querySelectorAll('.project-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

