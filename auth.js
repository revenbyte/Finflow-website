/* ============================================================
   FINFLOW MW - CORE DATA PLATFORM ARCHITECTURE & RUNTIME ENGINE
   ============================================================ */

// ===== SUPABASE REPOSITORY INITIALIZATION =====
const SUPABASE_URL = 'https://xphdrjxemdiuuebpttya.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaGRyanhlbWRpdXVlYnB0dHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDQwNjcsImV4cCI6MjA5NDY4MDA2N30.rBSJYJjMI5MsNK_J_eMoGr4RpuGr98EFiQW78rF5T84';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUserId = null;

// ===== INITIALIZATION ROUTINE AND AUTH GUARD =====
document.addEventListener("DOMContentLoaded", () => {
    supabaseClient.auth.getSession().then(({ data }) => {
        // If no active secure session exists, boot user back to security gateway
        if (!data.session) {
            window.location.href = 'login.html';
            return;
        }
        
        currentUserId = data.session.user.id;
        
        // Safety checkpoint check for initialization on ledger workspace components
        const loadingElement = document.getElementById('loading');
        const contentElement = document.getElementById('ledger-content');
        
        if (loadingElement && contentElement) {
            loadingElement.style.display = 'none';
            contentElement.style.display = 'block';
            
            // Execute automated database read operations pipeline
            renderLedgerHistory();
        }
    });

    // ===== BIND EVENT LISTENERS ONLY IF MATCHING ELEMENTS ARE AVAILABLE =====
    const transactionForm = document.getElementById('transaction-form');
    if (transactionForm) {
        transactionForm.addEventListener('submit', handleTransactionSubmit);
    }

    const desktopLogout = document.getElementById('logout-btn');
    if (desktopLogout) {
        desktopLogout.addEventListener('click', handleUserSignOut);
    }

    const mobileLogout = document.getElementById('mobile-logout-btn');
    if (mobileLogout) {
        mobileLogout.addEventListener('click', handleUserSignOut);
    }
});

// ===== ENGINE: RECORD WRITE OPERATIONS (INSERT) =====
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
            .insert([
                {
                    user_id: currentUserId,
                    type: type,
                    amount: amount,
                    category: category,
                    description: description
                }
            ]);

        if (error) throw error;

        // Render localized alert responses directly into token boxes
        alertDiv.style.background = "rgba(46, 125, 50, 0.15)";
        alertDiv.style.color = "#2ecc71";
        alertDiv.style.border = "1px solid rgba(46, 125, 50, 0.3)";
        alertDiv.textContent = "✅ Transaction successfully bound to ledger!";
        alertDiv.style.display = "block";
        
        document.getElementById('transaction-form').reset();
        
        // Trigger automated state reload
        await renderLedgerHistory();

    } catch (err) {
        alertDiv.style.background = "rgba(198, 40, 40, 0.15)";
        alertDiv.style.color = "#e74c3c";
        alertDiv.style.border = "1px solid rgba(198, 40, 40, 0.3)";
        alertDiv.textContent = "❌ Vault error: " + err.message;
        alertDiv.style.display = "block";
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save to Ledger';
    }
}

// ===== ENGINE: READ OPERATIONS AND DATA INJECTION =====
async function renderLedgerHistory() {
    const tbody = document.getElementById('history-table-body');
    if (!tbody) return; 
    
    tbody.innerHTML = ''; 

    try {
        const { data: records, error } = await supabaseClient
            .from('transactions')
            .select('*')
            .eq('user_id', currentUserId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Render empty state if user profiles haven't processed parameters
        if (!records || records.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 40px; color: var(--text-muted); font-size: 0.9rem;">No transactions recorded yet. Your book is completely empty!</td></tr>`;
            return;
        }

        records.forEach(row => {
            const tr = document.createElement('tr');
            // Stylize entire row box directly into dark mode specifications
            tr.style.background = "rgba(255, 255, 255, 0.02)";
            tr.style.transition = "var(--transition-fast)";
            
            const txDate = new Date(row.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short'
            });

            const prefix = row.type === 'income' ? '+' : '-';
            const colorStyle = row.type === 'income' ? 'color:#2ecc71; font-weight:700;' : 'color:#e74c3c; font-weight:700;';
            const displayDescription = row.description ? ` — ${row.description}` : '';

            tr.innerHTML = `
                <td style="padding: 15px; color: var(--text-secondary); font-size: 0.9rem; border-top-left-radius: var(--radius-small); border-bottom-left-radius: var(--radius-small);">${txDate}</td>
                <td style="padding: 15px;"><strong style="color: var(--text-primary); font-weight:600;">${row.category}</strong><span style="color: var(--text-muted); font-size:0.85rem;">${displayDescription}</span></td>
                <td style="padding: 15px; text-align: right; ${colorStyle} border-top-right-radius: var(--radius-small); border-bottom-right-radius: var(--radius-small);">${prefix} MWK ${parseFloat(row.amount).toLocaleString()}</td>
            `;
            tbody.appendChild(tr);
        });

    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: var(--danger); padding:20px;">Failed to parse ledger array: ${err.message}</td></tr>`;
    }
}

// ===== UTILITIES: ACCESS REVOCATION ENGINE =====
async function handleUserSignOut() {
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
}