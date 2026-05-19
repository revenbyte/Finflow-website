/* ============================================================
   FINFLOW MW - REGISTRATION & AUTONOMOUS GATEWAY ENGINE
   ============================================================ */

const SUPABASE_URL = 'https://xphdrjxemdiuuebpttya.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaGRyanhlbWRpdXVlYnB0dHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDQwNjcsImV4cCI6MjA5NDY4MDA2N30.rBSJYJjMI5MsNK_J_eMoGr4RpuGr98EFiQW78rF5T84';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
    // Session interceptor: If already logged in, skip auth screens entirely
    supabaseClient.auth.getSession().then(({ data }) => {
        if (data.session) {
            window.location.href = 'dashboard.html';
        }
    });

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleUserSignUp);
    }
});

// ===== REGISTRATION WORKER ENGINE =====
async function handleUserSignUp(e) {
    e.preventDefault();
    
    const alertDiv = document.getElementById('auth-alert');
    const submitBtn = document.getElementById('signup-btn');
    
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // UI Loading state deployment
    alertDiv.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Deploying vault profile...';

    // Front-end password check validation
    if (password !== confirmPassword) {
        renderAlert("❌ Access Denied: Passwords do not match.", "danger");
        resetSubmitButton(submitBtn);
        return;
    }

    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) throw error;

        // Check if confirmation email rules are active
        if (data.user && data.session === null) {
            renderAlert("📩 Registration processing! Check your email to verify your secure vault path.", "info");
            document.getElementById('signup-form').reset();
        } else if (data.session) {
            // Immediate sign-in configuration fallback
            renderAlert("✅ Vault created successfully! Opening channels...", "success");
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }

    } catch (err) {
        renderAlert("❌ Registration Fault: " + err.message, "danger");
    } finally {
        resetSubmitButton(submitBtn);
    }
}

// ===== AUTH UI HELPER UTILITIES =====
function renderAlert(message, type) {
    const alertDiv = document.getElementById('auth-alert');
    alertDiv.textContent = message;
    alertDiv.style.display = "block";
    
    if (type === "success") {
        alertDiv.style.background = "rgba(46, 125, 50, 0.15)";
        alertDiv.style.color = "#2ecc71";
        alertDiv.style.border = "1px solid rgba(46, 125, 50, 0.3)";
    } else if (type === "info") {
        alertDiv.style.background = "rgba(26, 188, 156, 0.15)";
        alertDiv.style.color = "#1abc9c";
        alertDiv.style.border = "1px solid rgba(26, 188, 156, 0.3)";
    } else {
        alertDiv.style.background = "rgba(198, 40, 40, 0.15)";
        alertDiv.style.color = "#e74c3c";
        alertDiv.style.border = "1px solid rgba(198, 40, 40, 0.3)";
    }
}

function resetSubmitButton(btn) {
    btn.disabled = false;
    btn.textContent = 'Initialize Registration';
}