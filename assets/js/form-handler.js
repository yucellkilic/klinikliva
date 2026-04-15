// Form Validation and Handling for KlinikLiva Contact Form

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const serviceSelect = document.getElementById('service');
    
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const serviceError = document.getElementById('serviceError');
    
    // Validation functions
    function validateName(value) {
        // Minimum 3 characters, Turkish characters allowed
        const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{3,50}$/;
        return nameRegex.test(value.trim());
    }
    
    function validatePhone(value) {
        // 10-11 digits, Turkish phone format
        const phoneRegex = /^[0-9]{10,11}$/;
        return phoneRegex.test(value.replace(/\s/g, ''));
    }
    
    function validateService(value) {
        return value !== '';
    }
    
    // Show error message
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
    
    // Clear error message
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('active');
    }
    
    // Real-time validation on blur
    nameInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this, nameError, 'Ad Soyad alanı zorunludur');
        } else if (!validateName(this.value)) {
            showError(this, nameError, 'Lütfen geçerli bir ad soyad giriniz (minimum 3 karakter)');
        } else {
            clearError(this, nameError);
        }
    });
    
    phoneInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this, phoneError, 'Telefon alanı zorunludur');
        } else if (!validatePhone(this.value)) {
            showError(this, phoneError, 'Lütfen geçerli bir telefon numarası giriniz (10-11 rakam)');
        } else {
            clearError(this, phoneError);
        }
    });
    
    serviceSelect.addEventListener('blur', function() {
        if (!validateService(this.value)) {
            showError(this, serviceError, 'Lütfen bir hizmet seçiniz');
        } else {
            clearError(this, serviceError);
        }
    });
    
    // Clear errors on input
    nameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this, nameError);
        }
    });
    
    phoneInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this, phoneError);
        }
    });
    
    serviceSelect.addEventListener('change', function() {
        if (this.classList.contains('error')) {
            clearError(this, serviceError);
        }
    });
    
    // Form submission validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Ad Soyad alanı zorunludur');
            isValid = false;
        } else if (!validateName(nameInput.value)) {
            showError(nameInput, nameError, 'Lütfen geçerli bir ad soyad giriniz (minimum 3 karakter)');
            isValid = false;
        }
        
        // Validate phone
        if (phoneInput.value.trim() === '') {
            showError(phoneInput, phoneError, 'Telefon alanı zorunludur');
            isValid = false;
        } else if (!validatePhone(phoneInput.value)) {
            showError(phoneInput, phoneError, 'Lütfen geçerli bir telefon numarası giriniz (10-11 rakam)');
            isValid = false;
        }
        
        // Validate service
        if (!validateService(serviceSelect.value)) {
            showError(serviceSelect, serviceError, 'Lütfen bir hizmet seçiniz');
            isValid = false;
        }
        
        // Prevent submission if validation fails
        if (!isValid) {
            e.preventDefault();
            
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});
