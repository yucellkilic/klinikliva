// KlinikLiva Navigation JavaScript
// Validates: Requirements 2.2, 2.5, 1.2

/**
 * Sticky Header Scroll Effect
 * Applies blur effect to header when scrolled beyond 50px threshold
 * Validates: Requirement 2.2
 */
function initStickyHeader() {
    const header = document.getElementById('mainHeader');
    
    if (!header) {
        console.warn('Main header element not found');
        return;
    }
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Hamburger Menu Toggle
 * Toggles mobile navigation menu visibility
 * Validates: Requirement 1.2
 */
function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburgerBtn || !navMenu) {
        console.warn('Hamburger button or nav menu not found');
        return;
    }
    
    hamburgerBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Toggle hamburger icon between bars and times
        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburgerBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

/**
 * Randevu Al Button Handler
 * Smooth scrolls to contact form if on same page, otherwise redirects to WhatsApp
 * Validates: Requirement 2.5
 */
function initRandevuButton() {
    const ctaButtons = document.querySelectorAll('.cta-button, .hero-cta-button');
    
    if (ctaButtons.length === 0) {
        console.warn('CTA buttons not found');
        return;
    }
    
    ctaButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const contactForm = document.getElementById('contactForm');
            
            // If contact form exists on current page, smooth scroll to it
            if (contactForm) {
                contactForm.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Otherwise, redirect to WhatsApp
                const whatsappNumber = '905395749277';
                const message = encodeURIComponent('Merhaba, randevu almak istiyorum.');
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            }
        });
    });
}

/**
 * Initialize all navigation functionality
 */
function initNavigation() {
    initStickyHeader();
    initHamburgerMenu();
    initRandevuButton();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    // DOM is already ready
    initNavigation();
}
