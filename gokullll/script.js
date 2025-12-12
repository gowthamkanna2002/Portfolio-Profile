// ===== Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// ===== Skill Progress Animation =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.getAttribute('data-width');
            progressBar.style.width = width;
            skillObserver.unobserve(progressBar);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contactForm');

// Validation Functions
const validators = {
    name: (value) => {
        if (!value.trim()) {
            return 'Name is required';
        }
        if (value.trim().length < 2) {
            return 'Name must be at least 2 characters';
        }
        if (value.trim().length > 50) {
            return 'Name must be less than 50 characters';
        }
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
            return 'Name can only contain letters and spaces';
        }
        return '';
    },

    email: (value) => {
        if (!value.trim()) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
            return 'Please enter a valid email address';
        }
        if (value.trim().length > 100) {
            return 'Email must be less than 100 characters';
        }
        return '';
    },

    phone: (value) => {
        if (!value.trim()) {
            return 'Phone number is required';
        }
        // Remove spaces, dashes, and parentheses for validation
        const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
        // Check if it's a valid phone number (10 digits minimum, can have country code)
        if (!/^\+?[1-9]\d{9,14}$/.test(cleanPhone)) {
            return 'Please enter a valid phone number (10-15 digits)';
        }
        return '';
    },

    subject: (value) => {
        if (!value.trim()) {
            return 'Subject is required';
        }
        if (value.trim().length < 5) {
            return 'Subject must be at least 5 characters';
        }
        if (value.trim().length > 100) {
            return 'Subject must be less than 100 characters';
        }
        return '';
    },

    message: (value) => {
        if (!value.trim()) {
            return 'Message is required';
        }
        if (value.trim().length < 10) {
            return 'Message must be at least 10 characters';
        }
        if (value.trim().length > 1000) {
            return 'Message must be less than 1000 characters';
        }
        return '';
    }
};

// Real-time validation on input
const formFields = ['name', 'email', 'subject', 'message'];

formFields.forEach(fieldName => {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');

    if (field && errorElement) {
        // Validate on blur (when user leaves the field)
        field.addEventListener('blur', () => {
            validateField(fieldName, field.value, errorElement, field);
        });

        // Clear error on input (optional - for better UX)
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                const error = validators[fieldName](field.value);
                if (!error) {
                    field.classList.remove('error');
                    errorElement.textContent = '';
                }
            }
        });
    }
});

// Validate individual field
function validateField(fieldName, value, errorElement, fieldElement) {
    const error = validators[fieldName](value);
    
    if (error) {
        fieldElement.classList.add('error');
        errorElement.textContent = error;
        return false;
    } else {
        fieldElement.classList.remove('error');
        errorElement.textContent = '';
        return true;
    }
}

// Validate entire form
function validateForm() {
    let isValid = true;
    
    formFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (field && errorElement) {
            const fieldValid = validateField(fieldName, field.value, errorElement, field);
            if (!fieldValid) {
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Form submission handler
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hide previous success message
        const successMessage = document.getElementById('formSuccess');
        successMessage.classList.remove('show');
        
        // Validate form
        if (validateForm()) {
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Simulate form submission (replace with actual API call)
            console.log('Form Data:', formData);
            
            // Show success message
            successMessage.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
            successMessage.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Remove error classes
            formFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                const errorElement = document.getElementById(fieldName + 'Error');
                if (field) field.classList.remove('error');
                if (errorElement) errorElement.textContent = '';
            });
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-group input.error, .form-group textarea.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
}

// ===== Active Navigation Link Highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Projects Slider =====
const slider = document.querySelector('.projects-slider');
if (slider) {
    const track = slider.querySelector('.slider-track');
    const cards = Array.from(slider.querySelectorAll('.project-card'));
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    let currentIndex = 0;

    const getGap = () => {
        const styles = window.getComputedStyle(track);
        return parseFloat(styles.columnGap || styles.gap || 0);
    };

    const getVisibleCount = () => {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

    const updateButtons = (maxIndex) => {
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
    };

    const updateSlider = () => {
        if (!cards.length) return;
        const gap = getGap();
        const cardWidth = cards[0].getBoundingClientRect().width + gap;
        const visibleCount = getVisibleCount();
        const maxIndex = Math.max(cards.length - visibleCount, 0);
        currentIndex = Math.min(currentIndex, maxIndex);
        const offset = -(cardWidth * currentIndex);
        track.style.transform = `translateX(${offset}px)`;
        updateButtons(maxIndex);
    };

    prevBtn?.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSlider();
    });

    nextBtn?.addEventListener('click', () => {
        const visibleCount = getVisibleCount();
        const maxIndex = Math.max(cards.length - visibleCount, 0);
        currentIndex = Math.min(currentIndex + 1, maxIndex);
        updateSlider();
    });

    window.addEventListener('resize', () => {
        updateSlider();
    });

    updateSlider();
}

