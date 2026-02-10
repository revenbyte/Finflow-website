// main.js - JavaScript for ALL pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-open');
            this.classList.toggle('mobile-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mobileToggle && 
            !mainNav.contains(event.target) && 
            !mobileToggle.contains(event.target) &&
            mainNav.classList.contains('mobile-open')) {
            mainNav.classList.remove('mobile-open');
            mobileToggle.classList.remove('mobile-open');
        }
    });
    
    // Header scroll effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Dropdown menus
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.querySelector('.dropdown-menu').style.display = 'block';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.querySelector('.dropdown-menu').style.display = 'none';
            }
        });
        
        // Mobile dropdown toggle
        if (window.innerWidth <= 768) {
            const toggle = dropdown.querySelector('.nav-link');
            if (toggle) {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    const menu = dropdown.querySelector('.dropdown-menu');
                    const isOpen = menu.style.display === 'block';
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(m => {
                        m.style.display = 'none';
                    });
                    
                    // Toggle this dropdown
                    menu.style.display = isOpen ? 'none' : 'block';
                });
            }
        }
    });
    
    // FAQ accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other accordions
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });
            
            // If this wasn't active, open it
            if (!isActive) {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--danger)';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // In a real app, this would submit to a server
                alert('Thank you! Form submitted successfully.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('mobile-open')) {
                    mainNav.classList.remove('mobile-open');
                    if (mobileToggle) mobileToggle.classList.remove('mobile-open');
                }
                
                const target = document.querySelector(href);
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top-link');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
    }
    
    // Initialize animations
    const animateElements = document.querySelectorAll('.animate-fade-up, .animate-slide-left, .animate-slide-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    // Tab functionality
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.tabs-container');
            
            if (tabContainer && tabId) {
                // Update active tab button
                tabContainer.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Show active tab content
                tabContainer.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                tabContainer.querySelector(`#${tabId}`).classList.add('active');
            }
        });
    });
    
    // Current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Toast notifications (for future enhancements)
    window.showToast = function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            background: var(--bg-card);
            color: var(--text-primary);
            border-radius: var(--radius-medium);
            border-left: 4px solid ${type === 'success' ? 'var(--accent)' : 'var(--danger)'};
            box-shadow: var(--shadow-heavy);
            z-index: 9999;
            transform: translateX(120%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    };
});