// main.js - FINFLOW MW (CLEANED RECONSTRUCTED PLATFORM RUNTIME)
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Finflow main.js loaded - Core utilities initialized');

    // ===== 1. FOOTER CURRENT YEAR AUTO-UPDATE =====
    // Ensures your platform copyright notices stay perfectly locked to the current year
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ===== 2. LANDING PAGE FAQ ACCORDION ENGINE =====
    // Handles collapsible drop-down elements if present on marketing pages
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                if (h.nextElementSibling) h.nextElementSibling.style.maxHeight = null;
            });
            
            if (!isActive) {
                this.classList.add('active');
                if (content) content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // ===== 3. BACK TO TOP SMOOTH SCROLL ACTIONS =====
    // Controls visibility of structural scroll-to-top layout nodes
    const backToTop = document.querySelector('.back-to-top-link');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
    }
});