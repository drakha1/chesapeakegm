document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    const contactForm = document.querySelector('.contact-form-card');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const ajaxAction = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

            try {
                const response = await fetch(ajaxAction, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (!response.ok) throw new Error('Submission failed');

                submitBtn.textContent = 'Message Sent!';
            } catch (err) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                alert('Something went wrong sending your message. Please try again or call us directly.');
            }
        });
    }
});
