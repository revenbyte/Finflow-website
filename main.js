// main.js - FINFLOW MW (CLEANED RECONSTRUCTED PLATFORM RUNTIME)
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Finflow elite runtime system active — Design matrix synchronized.');

    // ===== 1. FOOTER CURRENT YEAR AUTO-UPDATE =====
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ===== 2. LANDING PAGE FAQ ACCORDION ENGINE =====
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
});