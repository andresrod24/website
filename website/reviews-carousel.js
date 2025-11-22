// Reviews Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('reviewsCarousel');
    if (!carousel) {
        console.error('Reviews carousel not found');
        return;
    }
    
    const slides = carousel.querySelectorAll('.review-slide');
    const paginationContainer = document.getElementById('reviewsPagination');
    if (!paginationContainer) {
        console.error('Pagination container not found');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Create pagination dots
    function createPaginationDots() {
        if (!paginationContainer) {
            console.error('Pagination container not found');
            return;
        }
        
        paginationContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('owl-dot');
            if (i === 0) {
                dot.classList.add('active');
            }
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.setAttribute('type', 'button');
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                goToSlide(i);
            });
            paginationContainer.appendChild(dot);
        }
        console.log(`Created ${totalSlides} pagination dots`);
    }

    // Function to update pagination
    function updatePagination(activeIndex) {
        const dots = paginationContainer.querySelectorAll('.owl-dot');
        dots.forEach((dot, i) => {
            if (i === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Function to show a specific slide
    function showSlide(index) {
        // Ensure index is within bounds
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        
        // Get the target slide
        const targetSlide = slides[index];
        if (!targetSlide) return;
        
        // First, make the target slide active and visible immediately
        targetSlide.classList.remove('prev', 'next');
        targetSlide.classList.add('active');
        
        // Then update all other slides
        slides.forEach((slide, i) => {
            if (i !== index) {
                slide.classList.remove('active');
                if (i < index) {
                    slide.classList.remove('next');
                    slide.classList.add('prev');
                } else {
                    slide.classList.remove('prev');
                    slide.classList.add('next');
                }
            }
        });
        
        // Update pagination
        updatePagination(index);
        currentSlide = index;
    }
    
    // Set carousel height based on tallest slide
    function setCarouselHeight() {
        let maxHeight = 0;
        slides.forEach((slide, index) => {
            // Temporarily show slide to measure
            const originalClasses = slide.className;
            const originalPosition = slide.style.position;
            const originalVisibility = slide.style.visibility;
            const originalOpacity = slide.style.opacity;
            const originalTransform = slide.style.transform;
            
            // Make slide visible for measurement
            slide.style.position = 'relative';
            slide.style.visibility = 'visible';
            slide.style.opacity = '1';
            slide.style.transform = 'translateX(0)';
            slide.classList.add('active');
            slide.classList.remove('prev', 'next');
            
            // Force reflow
            void slide.offsetHeight;
            
            const height = slide.offsetHeight;
            
            // Restore original state
            slide.className = originalClasses;
            slide.style.position = originalPosition;
            slide.style.visibility = originalVisibility;
            slide.style.opacity = originalOpacity;
            slide.style.transform = originalTransform;
            
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        if (maxHeight > 0) {
            carousel.style.minHeight = `${maxHeight}px`;
        }
    }

    // Function to go to a specific slide
    function goToSlide(index) {
        // Ensure index is within bounds
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        
        // Prevent rapid clicking from causing issues
        if (index === currentSlide) {
            return;
        }
        
        showSlide(index);
        stopAutoSlide();
        startAutoSlide();
    }

    // Function to go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        goToSlide(nextIndex);
    }

    // Function to start auto-sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    // Function to stop auto-sliding
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Initialize: create pagination and show first slide
    if (slides.length > 0) {
        createPaginationDots();
        // Wait for images/fonts to load before calculating height
        window.addEventListener('load', () => {
            setCarouselHeight();
        });
        // Also set height immediately in case page is already loaded
        setTimeout(() => {
            setCarouselHeight();
        }, 100);
        showSlide(0);
        startAutoSlide();
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
});

