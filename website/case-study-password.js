// Case Study Password Protection
// SECURITY NOTE: This is client-side password protection and provides NO REAL SECURITY.
// Anyone determined enough can bypass this protection.
// This is only a basic deterrent. For real security, use server-side authentication.
//
// The password is obfuscated and hashed to make it harder to find in the source code.

// Obfuscated password hash components (split and encoded to make it harder to find)
// The hash is split into parts and stored in a way that's not immediately obvious
const _0x1a2b = ['fcee', '9812', 'a56d', '7049', '08be', 'ece2', '3d2b', '9f1e', '1aa6', '78de', '03a9', '6ed5', '2f11', '9ffa', 'ca47', '8e92'];
const _0x3c4d = _0x1a2b.join('');

// Additional obfuscation layer
function _getHash() {
    return _0x3c4d;
}

const PORTFOLIO_PASSWORD_HASH = _getHash();

// Generate SHA-256 hash for password comparison
async function getPasswordHash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Check if user is already authenticated
function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem('caseStudyAuthenticated');
    if (isAuthenticated === 'true') {
        hidePasswordModal();
        return true;
    }
    showPasswordModal();
    return false;
}

// Show password modal
function showPasswordModal() {
    const modal = document.getElementById('caseStudyPasswordModal');
    const blurOverlay = document.getElementById('caseStudyBlurOverlay');
    
    if (modal && blurOverlay) {
        modal.classList.add('active');
        blurOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Focus on password input
        const passwordInput = document.getElementById('caseStudyPasswordInput');
        if (passwordInput) {
            setTimeout(() => passwordInput.focus(), 100);
        }
    }
}

// Hide password modal
function hidePasswordModal() {
    const modal = document.getElementById('caseStudyPasswordModal');
    const blurOverlay = document.getElementById('caseStudyBlurOverlay');
    
    if (modal && blurOverlay) {
        modal.classList.remove('active');
        blurOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle password form submission
async function handlePasswordSubmit(e) {
    e.preventDefault();
    
    const passwordInput = document.getElementById('caseStudyPasswordInput');
    const errorMessage = document.getElementById('caseStudyPasswordError');
    const enteredPassword = passwordInput.value.trim();
    
    // Clear previous error
    if (errorMessage) {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
    }
    
    // Hash the entered password and compare with stored hash
    const enteredHash = await getPasswordHash(enteredPassword);
    
    // Check password hash
    if (enteredHash === PORTFOLIO_PASSWORD_HASH) {
        // Store authentication in sessionStorage
        sessionStorage.setItem('caseStudyAuthenticated', 'true');
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
    hidePasswordModal();
    // Redirect to portfolio page (handle both local and production URLs)
    const isLocal = window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1' ||
                    window.location.hostname === '';
    
    if (isLocal) {
        window.location.href = '/portfolio.html';
    } else {
        window.location.href = '/portfolio';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Set up form submission
    const passwordForm = document.getElementById('caseStudyPasswordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordSubmit);
    }
    
    // Set up cancel button
    const cancelBtn = document.getElementById('cancelCaseStudyPasswordBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', handleCancel);
    }
    
    // Close modal when clicking outside (on overlay)
    const modalOverlay = document.getElementById('caseStudyPasswordModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            // Only close if clicking directly on overlay, not on modal content
            if (e.target === modalOverlay) {
                handleCancel();
            }
        });
    }
    
    // Allow Enter key to submit
    const passwordInput = document.getElementById('caseStudyPasswordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handlePasswordSubmit(e);
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('caseStudyPasswordModal');
            if (modal && modal.classList.contains('active')) {
                handleCancel();
            }
        }
    });
});

