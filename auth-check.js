// Global Session Handler for Public Pages
const SUPABASE_URL = 'https://xphdrjxemdiuuebpttya.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaGRyanhlbWRpdXVlYnB0dHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDQwNjcsImV4cCI6MjA5NDY4MDA2N30.rBSJYJjMI5MsNK_J_eMoGr4RpuGr98EFiQW78rF5T84';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

supabaseClient.auth.getSession().then(({ data }) => {
    const authContainer = document.getElementById('nav-auth-container');
    if (data.session && authContainer) {
        authContainer.innerHTML = `
            <a href="dashboard.html" class="btn btn-signup">Dashboard →</a>
        `;
    }
});