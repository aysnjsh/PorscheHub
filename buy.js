// EISEN JOSH BANGIT
// WD 201

document.addEventListener('DOMContentLoaded', () => {
    const products = Array.from(document.querySelectorAll('.product'));
    if (!products.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const idx = products.indexOf(el);
                el.style.willChange = 'transform, opacity';
                el.animate(
                    [
                        { transform: 'translateY(18px)', opacity: 0 },
                        { transform: 'translateY(0)', opacity: 1 }
                    ],
                    { duration: 460, easing: 'cubic-bezier(.2,.9,.2,1)', delay: idx * 80, fill: 'forwards' }
                );
                o.unobserve(el);
            });
        }, { threshold: 0.12 });

        products.forEach(p => {
            p.style.opacity = '0';
            obs.observe(p);
        });
    } else {
        products.forEach(p => p.style.opacity = '1');
    }

    // hover / focus scale animation
    products.forEach(p => {
        let hoverAnim;
        function animateScale(to) {
            if (prefersReduced) return;
            if (hoverAnim) hoverAnim.cancel();
            hoverAnim = p.animate(
                [{ transform: `scale(${to === 1 ? 1.03 : 1})` }],
                { duration: 180, easing: 'cubic-bezier(.2,.9,.2,1)', fill: 'forwards' }
            );
        }
        p.addEventListener('mouseenter', () => animateScale(1));
        p.addEventListener('mouseleave', () => animateScale(0));
        p.addEventListener('focusin', () => animateScale(1));
        p.addEventListener('focusout', () => animateScale(0));
    });

    const cartIcon = document.querySelector('.cart-icon');

    function flyToCart(imgEl) {
        const rect = imgEl.getBoundingClientRect();
        const clone = imgEl.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.left = rect.left + 'px';
        clone.style.top = rect.top + 'px';
        clone.style.width = rect.width + 'px';
        clone.style.height = rect.height + 'px';
        clone.style.zIndex = 99999;
        clone.style.pointerEvents = 'none';
        clone.style.borderRadius = getComputedStyle(imgEl).borderRadius || '6px';
        document.body.appendChild(clone);

        const targetRect = cartIcon ? cartIcon.getBoundingClientRect() : { left: window.innerWidth - 48, top: 24, width: 32, height: 32 };
        const endX = targetRect.left + targetRect.width / 2 - rect.width / 2;
        const endY = targetRect.top + targetRect.height / 2 - rect.height / 2;

        const anim = clone.animate(
            [
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${endX - rect.left}px, ${endY - rect.top}px) scale(0.18)`, opacity: 0.9 }
            ],
            { duration: 700, easing: 'cubic-bezier(.2,.9,.2,1)', fill: 'forwards' }
        );

        anim.onfinish = () => clone.remove();
    }

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.cta, .add-to-cart, button.add-to-cart');
        if (!btn) return;
        const product = btn.closest('.product');
        if (!product) return;
        const img = product.querySelector('img');
        if (img) flyToCart(img);

        product.animate(
            [{ boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }, { boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }],
            { duration: 420, easing: 'ease-out' }
        );
    }, { passive: true });
});