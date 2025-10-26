// EISEN JOSH BANGIT
// WD 201
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (sessionStorage.getItem('login_success') === '1') {
            sessionStorage.removeItem('login_success');

            const toast = document.createElement('div');
            toast.id = 'login-toast';
            toast.textContent = 'LOG IN SUCCESFUL!';
            Object.assign(toast.style, {
                position: 'fixed',
                left: '50%',
                top: '18%',
                transform: 'translateX(-50%)',
                background: 'rgba(98, 98, 98, 0.8)',
                color: '#fff',
                padding: '14px 22px',
                borderRadius: '8px',
                boxShadow: '0 12px 36px rgba(0,0,0,0.45)',
                zIndex: 99999,
                opacity: '0',
                transition: 'opacity 260ms ease, transform 260ms ease',
                fontFamily: '"League Spartan", sans-serif',
                fontWeight: '700',
                letterSpacing: '1px'
            });

            document.body.appendChild(toast);

            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateX(-50%) translateY(0)';
            });

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-50%) translateY(-6px)';
                setTimeout(() => toast.remove(), 300);
            }, 2600);
        }
    } catch (e) {
        console.warn(e);
    }
});