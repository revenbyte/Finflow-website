/* ============================================================
   FINFLOW MW - CORE DATA PLATFORM ARCHITECTURE & RUNTIME ENGINE
   ============================================================ */

const SUPABASE_URL = 'https://xphdrjxemdiuuebpttya.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaGRyanhlbWRpdXVlYnB0dHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDQwNjcsImV4cCI6MjA5NDY4MDA2N30.rBSJYJjMI5MsNK_J_eMoGr4RpuGr98EFiQW78rF5T84';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUserId = null;
let historicalCachedDataset = [];

document.addEventListener("DOMContentLoaded", () => {
    supabaseClient.auth.getSession().then(({ data }) => {
        if (!data.session) {
            if (!window.location.pathname.includes('index.html') && !window.location.pathname.includes('login.html')) {
                window.location.href = 'index.html';
            }
            return;
        }
        
        currentUserId = data.session.user.id;
        
        const loadingElement = document.getElementById('loading');
        const contentElement = document.getElementById('ledger-content');
        
        if (loadingElement && contentElement) {
            loadingElement.style.display = 'none';
            contentElement.style.display = 'block';
            renderLedgerHistory();
        }
    });

    // Wire up event systems safely
    const transactionForm = document.getElementById('transaction-form');
    if (transactionForm) transactionForm.addEventListener('submit', handleTransactionSubmit);

    const filterMenu = document.getElementById('month-filter');
    if (filterMenu) filterMenu.addEventListener('change', parseActiveFilterEntries);

    const exportBtn = document.getElementById('export-csv-btn');
    if (exportBtn) exportBtn.addEventListener('click', triggerCSVLedgerDownload);

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', handleUserSignOut);

    const mobileLogout = document.getElementById('mobile-logout-btn');
    if (mobileLogout) mobileLogout.addEventListener('click', handleUserSignOut);
});

async function handleTransactionSubmit(e) {
    e.preventDefault();
    const alertDiv = document.getElementById('form-alert');
    const saveBtn = document.getElementById('save-btn');
    
    saveBtn.disabled = true;
    saveBtn.textContent = 'Recording entry...';
    alertDiv.style.display = 'none';

    const type = document.getElementById('tx-type').value;
    const amount = parseFloat(document.getElementById('tx-amount').value);
    const category = document.getElementById('tx-category').value;
    const description = document.getElementById('tx-desc').value;

    try {
        const { error } = await supabaseClient
            .from('transactions')
            .insert([{ user_id: currentUserId, type, amount, category, description }]);

        if (error) throw error;

        alertDiv.style.background = "rgba(0, 230, 118, 0.1)";
        alertDiv.style.color = "#00e676";
        alertDiv.style.border = "1px solid rgba(0, 230, 118, 0.2)";
        alertDiv.textContent = "✅ Transaction successfully bound to ledger!";
        alertDiv.style.display = "block";
        
        document.getElementById('transaction-form').reset();
        await renderLedgerHistory();
    } catch (err) {
        alertDiv.style.background = "rgba(255, 59, 48, 0.1)";
        alertDiv.style.color = "#ff3b30";
        alertDiv.style.border = "1px solid rgba(255, 59, 48, 0.2)";
        alertDiv.textContent = "❌ Vault error: " + err.message;
        alertDiv.style.display = "block";
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Commit to Vault';
    }
}

async function renderLedgerHistory() {
    const tbody = document.getElementById('history-table-body');
    if (!tbody) return;

    try {
        const { data, error } = await supabaseClient
            .from('transactions')
            .select('*')
            .eq('user_id', currentUserId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        historicalCachedDataset = data || [];
        parseActiveFilterEntries();
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: #ff3b30; padding:20px;">❌ Read Vault Fault: ${err.message}</td></tr>`;
    }
}

function parseActiveFilterEntries() {
    const tbody = document.getElementById('history-table-body');
    const filterValue = document.getElementById('month-filter')?.value || 'all';
    
    if (!tbody) return;
    tbody.innerHTML = '';

    const filtered = historicalCachedDataset.filter(tx => {
        if (filterValue === 'all') return true;
        const dateObj = new Date(tx.created_at);
        return dateObj.getMonth().toString() === filterValue;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: var(--text-muted); padding:30px; font-size:0.9rem;">No transactions found for this query range.</td></tr>`;
        return;
    }

    filtered.forEach(row => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid var(--border-color)';
        
        const txDate = new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const prefix = row.type === 'income' ? '+' : '-';
        const colorStyle = row.type === 'income' ? 'color:#00e676; font-weight:700;' : 'color:#ff3b30; font-weight:700;';
        const displayDescription = row.description ? ` — ${row.description}` : '';

        tr.innerHTML = `
            <td style="padding: 15px; color: var(--text-dim); font-size: 0.9rem;">${txDate}</td>
            <td style="padding: 15px;"><strong style="color: var(--text-main); font-weight:600;">${row.category}</strong><span style="color: var(--text-muted); font-size:0.85rem;">${displayDescription}</span></td>
            <td style="padding: 15px; text-align: right; ${colorStyle}">${prefix} MWK ${parseFloat(row.amount).toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
    });
}

function triggerCSVLedgerDownload() {
    if (!historicalCachedDataset || historicalCachedDataset.length === 0) {
        alert("The cash data ledger is empty. Register entries before generating exports.");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,ID,Date,Type,Category,Description,Amount (MWK)\n";
    historicalCachedDataset.forEach(t => {
        const d = new Date(t.created_at).toISOString().split('T')[0];
        const cleanDesc = (t.description || '').replace(/,/g, ' ');
        csvContent += `${t.id},${d},${t.type},${t.category},${cleanDesc},${t.amount}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `FinFlow_MW_Statement_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function handleUserSignOut() {
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
}