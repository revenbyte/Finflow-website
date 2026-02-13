// main.js - NO Supabase code, ONLY UI functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ main.js loaded - UI only');
    
    // ===== MOBILE MENU TOGGLE =====
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
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ===== FAQ ACCORDION =====
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all others
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                if (h.nextElementSibling) {
                    h.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Open this one
            if (!isActive) {
                this.classList.add('active');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }
        });
    });
    
    // ===== DROPDOWN MENUS =====
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                const menu = this.querySelector('.dropdown-menu');
                if (menu) menu.style.display = 'block';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                const menu = this.querySelector('.dropdown-menu');
                if (menu) menu.style.display = 'none';
            }
        });
    });
    
    // ===== CURRENT YEAR IN FOOTER =====
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== BACK TO TOP BUTTON =====
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
    
    console.log('✅ main.js initialized');
});