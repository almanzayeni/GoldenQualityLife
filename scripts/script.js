//Form requirements
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.question-form form');

    form.addEventListener('submit', function(event) {
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const questionField = document.getElementById('question');

        let errorMessage = "";
        let isValid = true;

        if (nameField.value === '') {
            errorMessage += 'Please enter your name.\n';
            isValid = false;
        }

        if (emailField.value === '') {
            errorMessage += 'Please enter your email address.\n';
            isValid = false;
        }

        if (questionField.value === '') {
            errorMessage += 'Please provide a question.\n';
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();  
            alert(errorMessage);  
        }
    });
});
//Game slider
let currentIndex = 0;

function moveSlide(direction) {
    const slider = document.querySelector(".games-slider");
    const slideWidth = document.querySelector(".games-set").offsetWidth;
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = 1; 
    } else if (currentIndex > 1) {
        currentIndex = 0; 
    }

    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}
//Advice flip card
document.querySelectorAll('.advice-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('clicked');
    });
});
//Tips: Dropdown
document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', function() {
        const dropdown = this.parentElement;
        dropdown.classList.toggle('active');
    });
});
// Tips: Share link
document.querySelectorAll('.share-btn').forEach(button => {
    button.addEventListener('click', function() {
        const videoTitle = this.closest('.video-box').querySelector('h4').textContent;
        const videoUrl = this.closest('.video-box').querySelector('video').src;
        alert(`Share this video: ${videoTitle} - ${videoUrl}`);
    });
});
//Playlist collapse
document.querySelectorAll('.playlist-collection').forEach(item => {
    item.addEventListener('click', () => {
        const playlistInfo = item.querySelector('.playlist-info');
        playlistInfo.classList.toggle('expanded');
    });
});