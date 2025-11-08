// ----------------------------
// Production-ready Smooth Scrolling & Form Handling
// ----------------------------
document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------
    // Smooth Scrolling for Anchor Links
    // ----------------------------
    const anchors = document.querySelectorAll('a[href^="#"]');
    const debounce = (func, delay = 50) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    anchors.forEach(anchor => {
        anchor.addEventListener('click', debounce((e) => {
            const targetID = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetID);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50));
    });

    // ----------------------------
    // Form Submission Handling
    // ----------------------------
    const contactForm = document.querySelector('form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            let isValid = true;

            // Simple validation: check required fields
            for (const [name, value] of formData.entries()) {
                const field = contactForm.querySelector(`[name="${name}"]`);
                if (field?.hasAttribute('required') && !value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field?.classList.remove('error');
                }
            }

            if (!isValid) {
                alert('Please fill out all required fields.');
                return;
            }

            try {
                // Replace the URL with your backend endpoint
                // Example: await fetch('/submit', { method: 'POST', body: formData });

                // Simulated delay for demo
                await new Promise(resolve => setTimeout(resolve, 500));

                alert('Thank you for your request! We will contact you shortly.');
                contactForm.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Oops! Something went wrong. Please try again later.');
            }
        });
    }
});

