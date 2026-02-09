// app.js - FinFlow Main Application
// Updated for new design - January 2026
console.log("🚀 FinFlow JavaScript loaded! Powered by Malawi 🇲🇼");
// ========== 1. UPDATE FOOTER YEAR (All Pages) ==========
function updateFooterYear() {
    // Update all footer year elements across the site
    const yearElements = document.querySelectorAll('#currentYear');
   
    yearElements.forEach(element => {
        if (element) {
            const currentYear = new Date().getFullYear();
            element.textContent = currentYear;
        }
    });
}
// ========== 2. MOBILE MENU FUNCTIONALITY ==========
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
   
    if (mobileMenuBtn && mobileNav) {
        // Open menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Mobile menu opened');
        });
       
        // Close menu with X button
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Mobile menu closed');
            });
        }
       
        // Close menu when clicking links
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Mobile menu closed (link clicked)');
            });
        });
       
        // Close menu when clicking outside
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Mobile menu closed (outside click)');
            }
        });
       
        // Close menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Mobile menu closed (Escape key)');
            }
        });
    }
}
// ========== 3. VISITOR COUNTER ==========
function setupVisitorCounter() {
    // Check if counter exists in localStorage
    let count = localStorage.getItem('finflowVisitorCount');
   
    // Initialize if not exists
    if (!count) {
        count = 0;
    }
   
    // Increment count
    count = parseInt(count) + 1;
    localStorage.setItem('finflowVisitorCount', count);
   
    // Display in console (optional)
    console.log(`👋 Welcome! Visitor #${count} to FinFlow`);
   
    // Optional: Display on page (uncomment if you want to show it)
    /*
    const counterElement = document.getElementById('visitorCounter');
    if (counterElement) {
        counterElement.textContent = `Visitor #${count}`;
    }
    */
}
// ========== 4. ACTIVE NAVIGATION HIGHLIGHT ==========
function setupActiveNav() {
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
   
    // Find all navigation links
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
   
    // Highlight active link
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
       
        // Check if this link matches current page
        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref.includes(currentPage.replace('.html', '')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
// ========== 5. FORM VALIDATION HELPERS ==========
function setupFormHelpers() {
    // Add focus effects to all inputs
    const inputs = document.querySelectorAll('input, select, textarea');
   
    inputs.forEach(input => {
        // Add focus class
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
       
        // Remove focus class
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}
// ========== 6. SMOOTH SCROLLING ==========
function setupSmoothScrolling() {
    // Find all internal links that start with #
    const internalLinks = document.querySelectorAll('a[href^="#"]');
   
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
           
            if (targetId === '#') return;
           
            const targetElement = document.querySelector(targetId);
           
            if (targetElement) {
                e.preventDefault();
               
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
               
                console.log(`Smooth scrolling to: ${targetId}`);
            }
        });
    });
}
// ========== 7. NOTIFICATION SYSTEM (Placeholder) ==========
function showNotification(message, type = 'info') {
    console.log(`📢 Notification [${type}]: ${message}`);
   
    // This is a placeholder - we can build a proper notification system later
    if (type === 'error') {
        console.error(message);
    } else if (type === 'success') {
        console.log(`✅ ${message}`);
    }
}
// ========== 8. THEME PREFERENCES ==========
function setupTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('finflowTheme') || 'light';
   
    // Apply theme
    document.documentElement.setAttribute('data-theme', savedTheme);
   
    // Optional: Add theme toggle later
    console.log(`Theme set to: ${savedTheme}`);
}
// ========== 9. PERFORMANCE MONITORING ==========
function setupPerformance() {
    // Log page load time
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.domContentLoadedEventEnd -
                        window.performance.timing.navigationStart;
        console.log(`📊 Page loaded in ${loadTime}ms`);
    });
}
// ========== 10. INITIALIZE EVERYTHING ==========
function initFinFlow() {
    console.log('🚀 Initializing FinFlow...');
   
    // Set current year
    updateFooterYear();
   
    // Setup mobile navigation
    setupMobileMenu();
   
    // Track visitors
    setupVisitorCounter();
   
    // Highlight active navigation
    setupActiveNav();
   
    // Form helpers
    setupFormHelpers();
   
    // Smooth scrolling
    setupSmoothScrolling();
   
    // Theme
    setupTheme();
   
    // Performance monitoring
    setupPerformance();

    // ========== PREVENT EMPTY HASH LINKS FROM JUMPING ==========
function preventHashJump() {
    // Find all links with href="#"
    const hashLinks = document.querySelectorAll('a[href="#"]');
   
    hashLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the jump
            console.log('Prevented hash link jump:', this.textContent);
           
            // Optional: Show message for links that don't work yet
            if (this.textContent.includes('Sign In') ||
                this.textContent.includes('Sign Up')) {
                showNotification('This feature is coming soon!', 'info');
            }
        });
    });
}
// Then call it in initFinFlow:
function initFinFlow() {
    console.log('🚀 Initializing FinFlow...');
   
    updateFooterYear();
    setupMobileMenu();
    setupVisitorCounter();
    setupActiveNav();
    setupFormHelpers();
    setupSmoothScrolling();
    setupTheme();
    setupPerformance();
    preventHashJump(); // ADD THIS LINE
   
    console.log('✅ FinFlow initialized successfully!');
    showNotification('FinFlow is ready!', 'success');
}
   
    console.log('✅ FinFlow initialized successfully!');
    showNotification('FinFlow is ready!', 'success');
}
// ========== RUN WHEN PAGE LOADS ==========
// Check if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFinFlow);
} else {
    // DOM already loaded
    initFinFlow();
}
// ========== GLOBAL HELPER FUNCTIONS ==========
// These can be used by other scripts (calculator.js, cashflow.js)
// Format MWK currency
window.formatMWK = function(amount) {
    return amount.toLocaleString('en-US') + ' MWK';
};
// Save data to localStorage
window.saveToStorage = function(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
};
// Load data from localStorage
window.loadFromStorage = function(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
};
// Show loading spinner
window.showLoading = function() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(spinner);
};
// Hide loading spinner
window.hideLoading = function() {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
};
// Export date in Malawi format
window.formatMalawiDate = function(date = new Date()) {
    return date.toLocaleDateString('en-MW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
// ========== ERROR HANDLING ==========
// Global error handler
window.addEventListener('error', function(e) {
    console.error('❌ Global error caught:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});
// Handle offline/online status
window.addEventListener('offline', function() {
    showNotification('You are offline. Some features may not work.', 'warning');
    console.log('🌐 Offline mode activated');
});
window.addEventListener('online', function() {
    showNotification('You are back online!', 'success');
    console.log('🌐 Online mode activated');
});
// ========== DEBUG MODE ==========
// Enable debug mode in console: window.debugMode = true
window.debugMode = false;
if (window.debugMode) {
    console.log('🔧 Debug mode enabled');
    // Expose internal functions for testing
    window.finFlow = {
        updateFooterYear,
        setupMobileMenu,
        setupVisitorCounter,
        showNotification,
        formatMWK: window.formatMWK
    };
}
// ========== PREVENT ALL HASH LINK JUMPS ==========
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
        console.log('Prevented hash jump on:', e.target.textContent);
       
        // Optional feedback
        if (e.target.textContent.includes('Sign In') ||
            e.target.textContent.includes('Sign Up')) {
            alert('🚧 Feature coming soon!\n\nSign In / Sign Up functionality will be added in future updates.');
        }
    }
});