// ----------------------------
// Smooth Scrolling for Anchor Links
// ----------------------------
document.addEventListener('DOMContentLoaded', () => {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetID = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetID);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ----------------------------
    // Form Submission Handling
    // ----------------------------
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Example: send form data to server here
            // const formData = new FormData(contactForm);
            // fetch('/submit', { method: 'POST', body: formData });

            alert('Thank you for your request! We will contact you shortly.');
            contactForm.reset();
        });
    }
});

