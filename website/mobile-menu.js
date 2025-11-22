// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('mobileMenuButton');
    const menuOverlay = document.getElementById('mobileMenuOverlay');
    const menuLabel = menuButton.querySelector('.menu-label');
    const body = document.body;

    if (!menuButton || !menuOverlay) return;

    function openMenu() {
        menuButton.classList.add('active');
        menuOverlay.classList.add('active');
        menuLabel.textContent = 'Close';
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuButton.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuLabel.textContent = 'Menu';
        body.style.overflow = '';
    }

    function toggleMenu() {
        if (menuOverlay.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Toggle menu on button click
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking overlay (but not the menu content)
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) {
            closeMenu();
        }
    });

    // Close menu when clicking a menu item
    const menuItems = menuOverlay.querySelectorAll('.mobile-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
});

