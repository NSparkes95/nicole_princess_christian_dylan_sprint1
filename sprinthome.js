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

let slideIndex = 0;

function createSlides() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const images = [
        './Images/diner.jpg',
        './Images/grill.jpg',
        './Images/breakfast.jpg',
        './Images/pancakes.jpg',
        './Images/grilledcheese.jpg',
        './Images/bakedgoods.jpg',
        './Images/poutinewindow.jpg',
        './Images/burger.jpg',
        './Images/burgerfries.jpg',
        './Images/fries.jpg',
        './Images/burgers.jpg',
        './Images/donuts.jpg',
        './Images/dessert.jpg'
    ]; // Add your image sources here

    images.forEach((src, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.classList.add('slide');
        
        if (index === 0) {
            imgElement.classList.add('active'); // Make the first slide visible
        }

        slideshowContainer.appendChild(imgElement);
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide) => {
        slide.classList.remove('active'); // Hide all slides
    });

    if (index >= slides.length) {
        slideIndex = 0; // Loop back to the first slide
    } else if (index < 0) {
        slideIndex = slides.length - 1; // Loop to the last slide
    }

    slides[slideIndex].classList.add('active'); // Show the active slide
}

function moveSlides(n) {
    slideIndex += n;
    showSlide(slideIndex);
}

function autoSlide() {
    moveSlides(1);
    setTimeout(autoSlide, 5000); // Change every 5 seconds
}

// Initialize the slideshow
createSlides();
autoSlide();