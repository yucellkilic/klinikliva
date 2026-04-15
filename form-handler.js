// Form Validation and WhatsApp Integration for KlinikLiva Contact Form

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const serviceSelect = document.getElementById('service');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const serviceError = document.getElementById('serviceError');
    
    // WhatsApp phone number (format: country code + number without + or spaces)
    const WHATSAPP_NUMBER = '905395749277'; // +90 539 574 92 77
    
    // Validation functions
    function validateName(value) {
        // Minimum 3 characters, Turkish characters allowed
        const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{3,50}$/;
        return nameRegex.test(value.trim());
    }
    
    function validateEmail(value) {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value.trim());
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
    
    emailInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this, emailError, 'Email alanı zorunludur');
        } else if (!validateEmail(this.value)) {
            showError(this, emailError, 'Lütfen geçerli bir email adresi giriniz');
        } else {
            clearError(this, emailError);
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
    
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this, emailError);
        }
    });
    
    serviceSelect.addEventListener('change', function() {
        if (this.classList.contains('error')) {
            clearError(this, serviceError);
        }
    });
    
    // Get service name from value
    function getServiceName(value) {
        const serviceNames = {
            'pelvik-taban': 'Pelvik Taban Sağlığı',
            'fasya-terapi': 'Fasya Terapi',
            'ortopedi': 'Ortopedik Rehabilitasyon',
            'norolojik': 'Nörolojik Hastalıklar',
            'pediatri': 'Pediatrik Fizyoterapi',
            'sporcu': 'Sporcu Sağlığı',
            'pilates': 'Klinik Pilates',
            'dry-needling': 'Dry Needling (Kuru İğneleme)'
        };
        return serviceNames[value] || value;
    }
    
    // Create WhatsApp message
    function createWhatsAppMessage(name, email, service, message) {
        const serviceName = getServiceName(service);
        let whatsappText = `Merhaba KlinikLiva,\n\n`;
        whatsappText += `Ben *${name}*,\n\n`;
        whatsappText += `*${serviceName}* hakkında bilgi almak istiyorum.\n\n`;
        
        if (message && message.trim() !== '') {
            whatsappText += `*Mesajım:*\n${message}\n\n`;
        }
        
        whatsappText += `*Email:* ${email}\n\n`;
        whatsappText += `Randevu için benimle iletişime geçebilir misiniz?\n\n`;
        whatsappText += `Teşekkürler.`;
        
        return encodeURIComponent(whatsappText);
    }
    
    // Form submission with WhatsApp redirect
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Ad Soyad alanı zorunludur');
            isValid = false;
        } else if (!validateName(nameInput.value)) {
            showError(nameInput, nameError, 'Lütfen geçerli bir ad soyad giriniz (minimum 3 karakter)');
            isValid = false;
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Email alanı zorunludur');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Lütfen geçerli bir email adresi giriniz');
            isValid = false;
        }
        
        // Validate service
        if (!validateService(serviceSelect.value)) {
            showError(serviceSelect, serviceError, 'Lütfen bir hizmet seçiniz');
            isValid = false;
        }
        
        // If validation fails, scroll to first error
        if (!isValid) {
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // If validation passes, create WhatsApp message and redirect
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const service = serviceSelect.value;
        const message = messageInput.value.trim();
        
        const whatsappMessage = createWhatsAppMessage(name, email, service, message);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
        
        // Open WhatsApp in new window
        window.open(whatsappURL, '_blank');
        
        // Optional: Reset form after submission
        setTimeout(function() {
            form.reset();
            // Clear any remaining error states
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            document.querySelectorAll('.error-message.active').forEach(el => el.classList.remove('active'));
        }, 500);
    });
});
