const API_URL = "https://c-ruby-ten.vercel.app/api/auth/login";

const form = document.getElementById('loginForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const msg = document.getElementById('msg');

        msg.textContent = "جاري تسجيل الدخول...";
        msg.className = "mt-4 text-center text-sm text-blue-600 font-semibold";

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('name', data.user.name);
                window.location.href = 'dashboard.html';
            } else {
                msg.textContent = data.error || "بيانات الدخول غير صحيحة";
                msg.className = "mt-4 text-center text-sm text-red-600 font-bold";
            }
        } catch (err) {
            msg.textContent = "خطأ في الاتصال بالخادم";
            msg.className = "mt-4 text-center text-sm text-red-600 font-bold";
        }
    });
}
