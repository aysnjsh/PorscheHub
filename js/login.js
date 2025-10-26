// EISEN JOSH BANGIT
// WD 201

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-card');
    if (!form) return;

    const nameInput = form.querySelector('input[name="name"]');
    const addressInput = form.querySelector('input[name="address"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const confirmInput = form.querySelector('input[name="confirm"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    const validators = {
        name: (v) => v.trim().length >= 2 || 'Enter your name (min 2 chars).',
        address: (v) => v.trim().length >= 5 || 'Enter an address (min 5 chars).',
        password: (v) => v.length >= 8 || 'Password must be at least 8 characters.',
        confirm: (v) => v === (passwordInput ? passwordInput.value : '') || 'Passwords do not match.'
    };

    function setError(input, msg) {
        clearError(input);
        const el = document.createElement('div');
        el.className = 'error-msg';
        el.setAttribute('role', 'alert');
        el.textContent = msg;
        input.parentElement.appendChild(el);
        input.classList.add('input-error');
        input.setAttribute('aria-invalid', 'true');
    }

    function clearError(input) {
        if (!input || !input.parentElement) return;
        const existing = input.parentElement.querySelector('.error-msg');
        if (existing) existing.remove();
        input.classList.remove('input-error');
        input.removeAttribute('aria-invalid');
    }

    function validateField(input) {
        if (!input) return true;
        const name = input.getAttribute('name');
        const rule = validators[name];
        if (!rule) return true;
        const result = rule(input.value);
        if (result === true) {
            clearError(input);
            return true;
        } else {
            setError(input, result);
            return false;
        }
    }

    function validateAll() {
        const inputs = [nameInput, addressInput, passwordInput, confirmInput];
        let ok = true;
        inputs.forEach(i => {
            if (!validateField(i)) ok = false;
        });
        return ok;
    }

    function validateQuick() {
        try {
            if (!nameInput || !addressInput || !passwordInput || !confirmInput) return false;
            if (nameInput.value.trim().length < 2) return false;
            if (addressInput.value.trim().length < 5) return false;
            if (passwordInput.value.length < 8) return false;
            if (passwordInput.value !== confirmInput.value) return false;
            return true;
        } catch (e) { return false; }
    }

    function updateSubmitState() {
        const valid = validateQuick();
        if (!submitBtn) return;
        submitBtn.disabled = !valid;
        if (valid) {
            submitBtn.classList.remove('faded');
        } else {
            submitBtn.classList.add('faded');
        }
    }

    [nameInput, addressInput, passwordInput, confirmInput].forEach(inp => {
        if (!inp) return;
        inp.addEventListener('blur', () => validateField(inp));
        inp.addEventListener('input', () => {
            clearError(inp);
            updateSubmitState();
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateAll()) {
            const firstInvalid = form.querySelector('.input-error');
            if (firstInvalid) firstInvalid.focus();
            updateSubmitState();
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('faded');
            submitBtn.textContent = 'Processing...';
        }

        setTimeout(() => {
            try { sessionStorage.setItem('login_success', '1'); } catch(e) {}
            window.location.href = 'index.html';
        }, 700);
    });

    updateSubmitState();
});
