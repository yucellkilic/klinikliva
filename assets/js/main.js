// KlinikLiva Main JavaScript

// Initialize AOS animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if AOS is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            offset: 100
        });
    } else {
        console.warn('AOS library not loaded. Animations will be disabled.');
    }
});

// Additional functionality will be added in subsequent tasks

// Floating Contact Button Functionality
function initFloatingContactButton() {
    const floatingBtn = document.getElementById('floatingBtn');
    const contactOptions = document.getElementById('contactOptions');
    
    if (!floatingBtn || !contactOptions) {
        return;
    }
    
    // Toggle contact options on button click
    floatingBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        contactOptions.classList.toggle('show');
    });
    
    // Close contact options when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.floating-contact')) {
            contactOptions.classList.remove('show');
        }
    });
    
    // Prevent closing when clicking inside contact options
    contactOptions.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Initialize floating contact button when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFloatingContactButton();
});
