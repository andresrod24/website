// Footer Parallax Scroll Effect
// Creates a smooth parallax effect where footer content moves at different speed than scroll
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.getElementById('footerParallax');
    if (!footer) return;

    const footerContent = footer.querySelector('.footer-parallax-content');
    if (!footerContent) return;

    let ticking = false;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    function updateParallax() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const windowHeight = window.innerHeight;
                
                // Get footer position relative to viewport
                const footerRect = footer.getBoundingClientRect();
                const footerTop = footerRect.top;
                const footerHeight = footer.offsetHeight;
                
                // Calculate parallax effect when footer is visible or approaching
                // Only apply parallax when footer is entering viewport, not when fully scrolled
                if (footerTop < windowHeight && footerTop > -footerHeight) {
                    // Calculate how much of the footer is visible (0 to 1)
                    const visibleRatio = Math.max(0, Math.min(1, 
                        (windowHeight - footerTop) / (windowHeight * 0.5) // Parallax active in first half of viewport
                    ));
                    
                    // Parallax effect: content moves slower than scroll
                    // Creates depth effect similar to Framer website
                    const parallaxSpeed = 0.3; // Speed multiplier (lower = more parallax)
                    const scrollDelta = scrollTop - lastScrollTop;
                    const parallaxOffset = scrollDelta * parallaxSpeed * visibleRatio;
                    
                    // Get current transform value
                    const currentTransform = parseFloat(
                        footerContent.style.transform?.replace('translateY(', '').replace('px)', '') || '0'
                    );
                    const newTransform = currentTransform + parallaxOffset;
                    
                    // Apply transform with limits to prevent excessive movement
                    // Reset to 0 when scrolled to bottom
                    if (scrollTop + windowHeight >= document.documentElement.scrollHeight - 10) {
                        footerContent.style.transform = 'translateY(0px)';
                    } else {
                        footerContent.style.transform = `translateY(${Math.max(-100, Math.min(100, newTransform))}px)`;
                    }
                } else if (scrollTop + windowHeight >= document.documentElement.scrollHeight - 10) {
                    // Ensure footer is fully visible when scrolled to bottom
                    footerContent.style.transform = 'translateY(0px)';
                }
                
                lastScrollTop = scrollTop;
                ticking = false;
            });
            
            ticking = true;
        }
    }

    // Use passive scroll listener for better performance
    window.addEventListener('scroll', updateParallax, { passive: true });

    // Initial call
    updateParallax();
    
    // Reset on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            footerContent.style.transform = 'translateY(0px)';
            lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            updateParallax();
        }, 100);
    }, { passive: true });
});

