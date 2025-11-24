// Portfolio Password Protection
// Change this password to your desired password
const PORTFOLIO_PASSWORD = 'portfolioAndrew2025';

// Check if user is already authenticated
function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem('portfolioAuthenticated');
    if (isAuthenticated === 'true') {
        hidePasswordModal();
        return true;
    }
    showPasswordModal();
    return false;
}

// Show password modal
function showPasswordModal() {
    const modal = document.getElementById('passwordModalOverlay');
    const blurOverlay = document.getElementById('portfolioBlurOverlay');
    
    if (modal && blurOverlay) {
        modal.classList.add('active');
        blurOverlay.classList.add('active');
        // Focus on password input
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) {
            setTimeout(() => passwordInput.focus(), 100);
        }
    }
}

// Hide password modal
function hidePasswordModal() {
    const modal = document.getElementById('passwordModalOverlay');
    const blurOverlay = document.getElementById('portfolioBlurOverlay');
    
    if (modal && blurOverlay) {
        modal.classList.remove('active');
        blurOverlay.classList.remove('active');
    }
}

// Handle password form submission
function handlePasswordSubmit(e) {
    e.preventDefault();
    
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('passwordError');
    const enteredPassword = passwordInput.value.trim();
    
    // Clear previous error
    if (errorMessage) {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
    }
    
    // Check password
    if (enteredPassword === PORTFOLIO_PASSWORD) {
        // Store authentication in sessionStorage
        sessionStorage.setItem('portfolioAuthenticated', 'true');
        hidePasswordModal();
    } else {
        // Show error message
        if (errorMessage) {
            errorMessage.textContent = 'Incorrect password. Please try again.';
            errorMessage.style.display = 'block';
        }
        // Clear input and refocus
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Handle cancel button
function handleCancel() {
    // Redirect to home page
    window.location.href = '/';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Set up form submission
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordSubmit);
    }
    
    // Set up cancel button
    const cancelBtn = document.getElementById('cancelPasswordBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', handleCancel);
    }
    
    // Close modal when clicking outside (on overlay)
    const modalOverlay = document.getElementById('passwordModalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            // Only close if clicking directly on overlay, not on modal content
            if (e.target === modalOverlay) {
                handleCancel();
            }
        });
    }
    
    // Allow Enter key to submit
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handlePasswordSubmit(e);
            }
        });
    }
});

