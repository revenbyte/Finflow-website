// FinFlow MW v1 - Core Finance Functions

document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = document.getElementById('currentDate');
    if (currentDate) {
        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        currentDate.textContent = now.toLocaleDateString('en-MW', options);
    }

    // Modal functionality
    const modal = document.getElementById('addSaleModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
    }
    
    // Add click listeners to close buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Sale form submission
    const saleForm = document.getElementById('saleForm');
    if (saleForm) {
        saleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const product = document.getElementById('productSelect').value;
            const quantity = document.getElementById('quantity').value;
            const paymentMethod = document.getElementById('paymentMethod').value;
            
            // In a real app, you would send this to your backend
            console.log('Sale added:', { product, quantity, paymentMethod });
            
            // Show success message
            alert(`Sale added: ${quantity} units via ${paymentMethod}`);
            
            // Close modal and reset form
            closeModal();
            saleForm.reset();
            
            // Update dashboard stats (in real app, this would be dynamic)
            updateDashboardStats();
        });
    }
    
    // Business selector change
    const businessSelect = document.getElementById('businessSelect');
    if (businessSelect) {
        businessSelect.addEventListener('change', function() {
            if (this.value === 'Add New Business +') {
                const name = prompt('Enter new business name:');
                if (name) {
                    const option = document.createElement('option');
                    option.value = name.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = name;
                    businessSelect.insertBefore(option, businessSelect.lastElementChild);
                    businessSelect.value = option.value;
                } else {
                    businessSelect.value = 'mama-janes-shop';
                }
            }
        });
    }
    
    // Mock function to update dashboard stats
    function updateDashboardStats() {
        // In a real app, this would fetch from your backend
        const salesAmount = document.querySelector('.stat-card.sales .stat-amount');
        const profitAmount = document.querySelector('.stat-card.profit .stat-amount');
        const cashAmount = document.querySelector('.stat-card.cash .stat-amount');
        
        if (salesAmount) {
            const current = parseInt(salesAmount.textContent.replace(/[^0-9]/g, ''));
            salesAmount.textContent = `MK ${(current + 12500).toLocaleString()}`;
        }
        
        if (profitAmount) {
            const current = parseInt(profitAmount.textContent.replace(/[^0-9]/g, ''));
            profitAmount.textContent = `MK ${(current + 8164).toLocaleString()}`;
        }
        
        if (cashAmount) {
            const current = parseInt(cashAmount.textContent.replace(/[^0-9]/g, ''));
            cashAmount.textContent = `MK ${(current + 8164).toLocaleString()}`;
        }
    }
    
    // Alert action buttons
    document.querySelectorAll('.alert-action').forEach(button => {
        button.addEventListener('click', function() {
            const alertCard = this.closest('.alert-card');
            const alertType = alertCard.classList.contains('stock-alert') ? 'stock' : 
                             alertCard.classList.contains('expense-alert') ? 'expense' : 'sales';
            
            switch(alertType) {
                case 'stock':
                    alert('Opening restock form...');
                    // In real app, open stock management
                    break;
                case 'expense':
                    alert('Opening payment form...');
                    // In real app, open expense payment
                    break;
                case 'sales':
                    alert('Showing sales details...');
                    // In real app, show detailed sales report
                    break;
            }
        });
    });
    
    // Logout functionality
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                // In real app, clear auth tokens and redirect
                alert('Logged out successfully');
                window.location.href = 'login.html';
            }
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + N to add new sale
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            modal.classList.add('active');
        }
        
        // Escape to close modal
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});