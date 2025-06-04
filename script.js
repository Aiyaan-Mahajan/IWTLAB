
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Basic form validation (client-side)
const contactForm = document.querySelector('#contact form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        let name = this.querySelector('input[type="text"]').value;
        let email = this.querySelector('input[type="email"]').value;
        let message = this.querySelector('textarea').value;

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            e.preventDefault(); // Prevent form submission
        } else if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            e.preventDefault();
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simple image hover effect ko add kiya 
const portfolioItems = document.querySelectorAll('.portfolio-item img');

portfolioItems.forEach(item => {
    item.addEventListener('mouseover', function () {
        this.style.opacity = '0.8';
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'opacity 0.3s, transform 0.3s';
    });

    item.addEventListener('mouseout', function () {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    });
});


const contactButton = document.querySelector('#contact .btn');

if (contactButton) {
    contactButton.addEventListener('mouseover', function() {
        this.classList.add('animate__animated', 'animate__headShake');
        this.addEventListener('animationend', () => {
            this.classList.remove('animate__animated', 'animate__headShake');
        });
    });
}
let ele = document.getElementById('services');
ele.style="color:red";
