window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY; // Use scrollY instead of pageYOffset
    const backgroundSection = document.querySelector('.content-wrapper');
    
    // Move the background at a slower rate to create the parallax effect
    backgroundSection.style.backgroundPositionY = '${scrollPosition * 0.5}px';
});


window.addEventListener('DOMContentLoaded', () => {
    const neonBorder = document.querySelector(' .neon-border');
    const parentContainer = neonBorder.parentElement;

    const width = parentContainer.offsetWidth * 0.9;
    neonBorder.style.width = `${width}px`;

});

document.querySelectorAll('.neon-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('contest-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('contest-email').value;
    
    // Check if an email is entered
    if (emailInput) {
        // Get existing emails from localStorage
        let emailList = JSON.parse(localStorage.getItem('contestEmails')) || [];
        
        // Add new email to the list
        emailList.push(emailInput);
        
        // Save back to localStorage
        localStorage.setItem('contestEmails', JSON.stringify(emailList));

        alert('Email entered successfully!');
    } else {
        // If no email is provided, show an optional message
        alert('No email entered, but you can still proceed!');
    }
    
    // Clear the input field after submission
    document.getElementById('contest-email').value = '';
});