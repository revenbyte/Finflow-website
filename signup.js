/* ============================================================
   FINFLOW MW - REGISTRATION & AUTONOMOUS GATEWAY ENGINE
   ============================================================ */

const SUPABASE_URL = 'https://xphdrjxemdiuuebpttya.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaGRyanhlbWRpdXVlYnB0dHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDQwNjcsImV4cCI6MjA5NDY4MDA2N30.rBSJYJjMI5MsNK_J_eMoGr4RpuGr98EFiQW78rF5T84';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
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

async function handleUserSignUp(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('signup-name').value;
    const businessName = document.getElementById('signup-business').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const submitBtn = document.getElementById('signup-btn');

    if (password !== confirmPassword) {
        renderAlert("❌ Validation Fault: Passwords do not match.", "danger");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Spinning up node...`;

    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    business_name: businessName
                }
            }
        });

        if (error) throw error;

        if (data.user && data.session === null) {
            renderAlert("📩 Registration processing! Check email to confirm registration links.", "info");
            document.getElementById('signup-form').reset();
        } else if (data.session) {
            renderAlert("✅ Vault created successfully! Opening channels...", "success");
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }

    } catch (err) {
        renderAlert("❌ Registration Fault: " + err.message, "danger");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-user-plus"></i> Initialize Account Node`;
    }
}

function renderAlert(message, type) {
    const alertDiv = document.getElementById('auth-alert');
    if (!alertDiv) return;
    
    alertDiv.textContent = message;
    alertDiv.style.display = "block";
    
    if (type === "success") {
        alertDiv.style.background = "rgba(0, 230, 118, 0.1)";
        alertDiv.style.color = "var(--success)";
        alertDiv.style.border = "1px solid rgba(0, 230, 118, 0.2)";
    } else if (type === "danger") {
        alertDiv.style.background = "rgba(255, 59, 48, 0.1)";
        alertDiv.style.color = "var(--danger)";
        alertDiv.style.border = "1px solid rgba(255, 59, 48, 0.2)";
    } else {
        alertDiv.style.background = "rgba(0, 163, 255, 0.1)";
        alertDiv.style.color = "var(--primary)";
        alertDiv.style.border = "1px solid rgba(0, 163, 255, 0.2)";
    }
}