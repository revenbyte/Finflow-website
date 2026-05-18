// main.js - NO Supabase code, ONLY UI functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ main.js loaded - UI only');
    
// ===== MOBILE MENU TOGGLE (ULTIMATE MOBILE FIX) =====
    // We target the ID, the class, and even add a backup query selector
    const mobileToggle = document.getElementById('mobile-menu-toggle') || 
                         document.querySelector('.mobile-toggle') || 
                         document.querySelector('.mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileToggle && mainNav) {
        console.log('📱 Mobile toggle button found and ready');
        
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Stops the document click listener from instantly closing it
            
            // Toggle classes on both the navigation tray and the button itself
            mainNav.classList.toggle('mobile-open');
            this.classList.toggle('mobile-open');
            
            console.log('🍔 Menu toggled. Open state:', mainNav.classList.contains('mobile-open'));
        });
        
        // Fix for mobile touch lag - makes it snappy on iOS and Android browsers
        mobileToggle.addEventListener('touchstart', function(e) {
            // Only trigger if it's a clean tap
            if (e.touches.length === 1) {
                e.preventDefault();
                e.stopPropagation();
                mainNav.classList.toggle('mobile-open');
                this.classList.toggle('mobile-open');
            }
        }, { passive: false });
    } else {
        console.error('❌ Error: main.js couldn\'t find the mobile toggle elements in the HTML');
    }
    
    // Close mobile menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (mainNav && mobileToggle && 
            !mainNav.contains(event.target) && 
            !mobileToggle.contains(event.target) &&
            mainNav.classList.contains('mobile-open')) {
            mainNav.classList.remove('mobile-open');
            mobileToggle.classList.remove('mobile-open');
        }
    });
    
    // ===== MOBILE DROPDOWN INTERACTION =====
    // Allows mobile users to tap on dropdown items to expand nested lists
    document.querySelectorAll('.dropdown > a').forEach(dropdownLink => {
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Stop navigating immediately if it contains a sub-menu
                const menu = this.nextElementSibling;
                if (menu && menu.classList.contains('dropdown-menu')) {
                    if (menu.style.maxHeight) {
                        menu.style.maxHeight = null;
                    } else {
                        menu.style.maxHeight = menu.scrollHeight + "px";
                    }
                }
            }
        });
    });
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('main-header');
    if (header) {
        // Run once on load just in case the page is already refreshed halfway down
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
        
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
            
            // Close all other open sections first
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                if (h.nextElementSibling) {
                    h.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle the current active state
            if (!isActive) {
                this.classList.add('active');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }
        });
    });
    
    // ===== DESKTOP DROPDOWN MENUS =====
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
    const yearElement = document.getElementById('current-year') || document.querySelector('.copyright');
    if (yearElement) {
        // If it's the copyright wrapper text, let's keep it clean
        if(yearElement.id === 'current-year') {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.querySelector('.back-to-top-link');
    if (backToTop) {
        // Set initial state
        backToTop.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        
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