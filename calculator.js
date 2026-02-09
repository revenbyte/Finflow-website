‎// calculator.js - Malawi Profit Calculator
‎
‎console.log("Malawi Profit Calculator loaded! 🇲🇼");
‎
‎// DOM Elements
‎const salesInput = document.getElementById('sales');
‎const otherIncomeInput = document.getElementById('otherIncome');
‎const rentInput = document.getElementById('rent');
‎const salariesInput = document.getElementById('salaries');
‎const inventoryInput = document.getElementById('inventory');
‎const otherExpensesInput = document.getElementById('otherExpenses');
‎const includeTaxCheckbox = document.getElementById('includeTax');
‎const taxRateInput = document.getElementById('taxRate');
‎const customTaxGroup = document.getElementById('customTaxGroup');
‎const calculateBtn = document.getElementById('calculateBtn');
‎const resetBtn = document.getElementById('resetBtn');
‎
‎// Result Elements
‎const totalIncomeEl = document.getElementById('totalIncome');
‎const totalExpensesEl = document.getElementById('totalExpenses');
‎const grossProfitEl = document.getElementById('grossProfit');
‎const taxAmountEl = document.getElementById('taxAmount');
‎const netProfitEl = document.getElementById('netProfit');
‎const profitStatusEl = document.getElementById('profitStatus');
‎
‎// Format number as MWK with commas
‎function formatMWK(amount) {
‎    return amount.toLocaleString('en-US') + ' MWK';
‎}
‎
‎// Calculate total income
‎function calculateTotalIncome() {
‎    const sales = parseFloat(salesInput.value) || 0;
‎    const otherIncome = parseFloat(otherIncomeInput.value) || 0;
‎    return sales + otherIncome;
‎}
‎
‎// Calculate total expenses
‎function calculateTotalExpenses() {
‎    const rent = parseFloat(rentInput.value) || 0;
‎    const salaries = parseFloat(salariesInput.value) || 0;
‎    const inventory = parseFloat(inventoryInput.value) || 0;
‎    const otherExpenses = parseFloat(otherExpensesInput.value) || 0;
‎    return rent + salaries + inventory + otherExpenses;
‎}
‎
‎// Calculate tax amount
‎function calculateTax(grossProfit) {
‎    if (!includeTaxCheckbox.checked) return 0;
‎    
‎    const taxRate = parseFloat(taxRateInput.value) || 30;
‎    return grossProfit * (taxRate / 100);
‎}
‎
‎// Update results display
‎function updateResults() {
‎    const totalIncome = calculateTotalIncome();
‎    const totalExpenses = calculateTotalExpenses();
‎    const grossProfit = totalIncome - totalExpenses;
‎    const taxAmount = calculateTax(grossProfit);
‎    const netProfit = grossProfit - taxAmount;
‎    
‎    // Update DOM
‎    totalIncomeEl.textContent = formatMWK(totalIncome);
‎    totalExpensesEl.textContent = formatMWK(totalExpenses);
‎    grossProfitEl.textContent = formatMWK(grossProfit);
‎    taxAmountEl.textContent = formatMWK(taxAmount);
‎    netProfitEl.textContent = formatMWK(netProfit);
‎    
‎    // Update profit status
‎    updateProfitStatus(netProfit);
‎}
‎
‎// Update profit status with emoji
‎function updateProfitStatus(netProfit) {
‎    if (netProfit > 0) {
‎        profitStatusEl.innerHTML = '<i class="fas fa-laugh-beam"></i> Great! Your business is making profit!';
‎        profitStatusEl.style.background = '#d4edda';
‎        profitStatusEl.style.color = '#155724';
‎    } else if (netProfit < 0) {
‎        profitStatusEl.innerHTML = '<i class="fas fa-frown"></i> Your business is at a loss. Review expenses.';
‎        profitStatusEl.style.background = '#f8d7da';
‎        profitStatusEl.style.color = '#721c24';
‎    } else {
‎        profitStatusEl.innerHTML = '<i class="fas fa-meh"></i> Break even. Time to increase sales!';
‎        profitStatusEl.style.background = '#fff3cd';
‎        profitStatusEl.style.color = '#856404';
‎    }
‎}
‎
‎// Reset calculator
‎function resetCalculator() {
‎    // Clear all inputs
‎    salesInput.value = '';
‎    otherIncomeInput.value = '';
‎    rentInput.value = '';
‎    salariesInput.value = '';
‎    inventoryInput.value = '';
‎    otherExpensesInput.value = '';
‎    includeTaxCheckbox.checked = false;
‎    taxRateInput.value = '30';
‎    customTaxGroup.style.display = 'none';
‎    
‎    // Reset results
‎    totalIncomeEl.textContent = '0 MWK';
‎    totalExpensesEl.textContent = '0 MWK';
‎    grossProfitEl.textContent = '0 MWK';
‎    taxAmountEl.textContent = '0 MWK';
‎    netProfitEl.textContent = '0 MWK';
‎    profitStatusEl.innerHTML = '<i class="fas fa-meh"></i> Enter your numbers above';
‎    profitStatusEl.style.background = '#f8f9fa';
‎    profitStatusEl.style.color = '#2c3e50';
‎    
‎    // Focus on first input
‎    salesInput.focus();
‎}
‎
‎// Save calculation (placeholder for now)
‎function saveCalculation() {
‎    const totalIncome = calculateTotalIncome();
‎    const totalExpenses = calculateTotalExpenses();
‎    const grossProfit = totalIncome - totalExpenses;
‎    const taxAmount = calculateTax(grossProfit);
‎    const netProfit = grossProfit - taxAmount;
‎    
‎    const calculation = {
‎        date: new Date().toLocaleDateString(),
‎        totalIncome,
‎        totalExpenses,
‎        grossProfit,
‎        taxAmount,
‎        netProfit,
‎        taxIncluded: includeTaxCheckbox.checked,
‎        taxRate: includeTaxCheckbox.checked ? (parseFloat(taxRateInput.value) || 30) : 0
‎    };
‎    
‎    // Save to localStorage (we'll enhance this tomorrow)
‎    const savedCalculations = JSON.parse(localStorage.getItem('finflowCalculations') || '[]');
‎    savedCalculations.push(calculation);
‎    localStorage.setItem('finflowCalculations', JSON.stringify(savedCalculations));
‎    
‎    alert('Calculation saved! We\'ll build a history feature tomorrow. 📊');
‎}
‎
‎// Event Listeners
‎calculateBtn.addEventListener('click', updateResults);
‎
‎resetBtn.addEventListener('click', resetCalculator);
‎
‎includeTaxCheckbox.addEventListener('change', function() {
‎    customTaxGroup.style.display = this.checked ? 'block' : 'none';
‎});
‎
‎// Add income/expense buttons (placeholder for now)
‎document.getElementById('addIncomeBtn').addEventListener('click', function() {
‎    alert('We\'ll add dynamic income/expense fields tomorrow! 🚀');
‎});
‎
‎document.getElementById('addExpenseBtn').addEventListener('click', function() {
‎    alert('We\'ll add dynamic income/expense fields tomorrow! 🚀');
‎});
‎
‎// Save button
‎document.querySelector('.save-btn').addEventListener('click', saveCalculation);
‎
‎// Auto-calculate when inputs change
‎const allInputs = [salesInput, otherIncomeInput, rentInput, salariesInput, inventoryInput, otherExpensesInput, taxRateInput];
‎allInputs.forEach(input => {
‎    input.addEventListener('input', updateResults);
‎});
‎
‎// Initialize
‎document.addEventListener('DOMContentLoaded', function() {
‎    console.log('Malawi Profit Calculator ready!');
‎    
‎    // Set current year in footer
‎    document.getElementById('currentYear').textContent = new Date().getFullYear();
‎    
‎    // Auto-calculate if any inputs have values
‎    const hasValues = Array.from(allInputs).some(input => input.value && input.value !== '0');
‎    if (hasValues) {
‎        updateResults();
‎    }
‎});
‎