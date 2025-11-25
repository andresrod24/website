// Portfolio Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        // Skip disabled accordions
        if (header.classList.contains('accordion-disabled') || header.hasAttribute('disabled')) {
            return;
        }
        
        header.addEventListener('click', () => {
            const accordionId = header.getAttribute('data-accordion');
            const content = document.querySelector(`[data-accordion-content="${accordionId}"]`);
            
            if (!content) return;
            
            const isOpen = header.classList.contains('accordion-open');
            
            if (isOpen) {
                // Close accordion
                header.classList.remove('accordion-open');
                content.classList.remove('accordion-open');
            } else {
                // Open accordion
                header.classList.add('accordion-open');
                content.classList.add('accordion-open');
            }
        });
    });
});

