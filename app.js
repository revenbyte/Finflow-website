console.log("FinFlow JavaScript loaded! 🚀");
// ========== 1. UPDATE FOOTER YEAR ==========
function updateFooterYear() {
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `Made with pure passion by ELIJAH • © ${currentYear}`;
    }
}
// ========== 2. MAKE "GET STARTED" BUTTON WORK ==========
function setupGetStartedButton() {
    const getStartedBtn = document.getElementById('getStartedBtn');
   
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            alert('🎉 Welcome to FinFlow! Let\'s calculate some profits!');
           
            // Scroll to features section
            document.querySelector('.features').scrollIntoView({
                behavior: 'smooth'
            });
           
            // Optional: Change button text temporarily
            getStartedBtn.textContent = 'Let\'s Go!';
            setTimeout(() => {
                getStartedBtn.textContent = 'Start Free Today';
            }, 2000);
        });
    }
}
// ========== 3. FEATURE CARD ANIMATIONS ==========
function setupFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
   
    featureCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
       
        // Add keyboard navigation hint
        card.setAttribute('tabindex', '0');
       
        // Press Enter to "click" the card
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.querySelector('.feature-link').click();
            }
        });
    });
}
// ========== 4. SIMPLE VISITOR COUNTER ==========
function setupVisitorCounter() {
    // Check if counter exists in localStorage
    let count = localStorage.getItem('finflowVisitorCount');
   
    if (!count) {
        count = 0;
    }
   
    // Increment count
    count = parseInt(count) + 1;
    localStorage.setItem('finflowVisitorCount', count);
   
    // Display it (optional - we'll add element if needed)
    console.log(`Welcome! Visitor #${count} to FinFlow`);
}
// ========== 5. INITIALIZE EVERYTHING ==========
function initFinFlow() {
    console.log('Initializing FinFlow...');
   
    updateFooterYear();
    setupGetStartedButton();
    setupFeatureCards();
    setupVisitorCounter();
    setupMobileMenu();
   
    console.log('FinFlow initialized successfully!');
}
// ========== RUN WHEN PAGE LOADS ==========
// Wait for page to fully load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFinFlow);
} else {
    initFinFlow();
}
// ========== MOBILE MENU FUNCTIONALITY ==========
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
   
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
       
        // Close menu when clicking X
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
       
        // Close menu when clicking links
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
       
        // Close menu when clicking outside
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}