//Coutdown timer
document.addEventListener("DOMContentLoaded", function () {
    function startCountdown(eventDate) {
        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = eventDate - now;

            if (timeLeft <= 0) {
                document.getElementById("countdown-timer").innerText = "The event is happening now!";
                clearInterval(interval);
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById("countdown-timer").innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
    }

    // Set event date (YYYY, MM-1, DD, HH, MM)
    const eventDate = new Date(2025, 5, 5, 20, 09).getTime();
    startCountdown(eventDate);
});
//Calendar for events
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const events = ["2025-04-06", "2025-04-13", "2025-04-20"];

function updateCalendar() {
    const monthYear = document.getElementById("month-year");
    const calendarDates = document.getElementById("calendar-dates");
    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    calendarDates.innerHTML = "";
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendarDates.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let dateDiv = document.createElement("div");
        dateDiv.textContent = day;

        let fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        if (fullDate === today.toISOString().split("T")[0]) {
            dateDiv.classList.add("current-date");
        }

        if (events.includes(fullDate)) {
            dateDiv.classList.add("event-highlight");
        }

        calendarDates.appendChild(dateDiv);
    }
}

function changeMonth(offset) {
    currentMonth += offset;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

function changeYear(offset) {
    currentYear += offset;
    updateCalendar();
}

document.addEventListener("DOMContentLoaded", updateCalendar);
//Class slider
// Function to move the slider, now accepting a specific slider ID
let currentSlide = { 'slider1': 0, 'slider2': 0, 'slider3': 0, 'slider4': 0}; // Separate slide counters for each slider

function moveSlide(direction, sliderId) {
    const slider = document.getElementById(sliderId);
    const totalSlides = slider.querySelectorAll('.card').length;
    const slidesToShow = 4;
    
    currentSlide[sliderId] += direction;

    if (currentSlide[sliderId] < 0) {
        currentSlide[sliderId] = totalSlides - slidesToShow;
    } else if (currentSlide[sliderId] >= totalSlides - slidesToShow + 1) {
        currentSlide[sliderId] = 0;
    }

    const offset = -currentSlide[sliderId] * (100 / slidesToShow);
    slider.style.transform = `translateX(${offset}%)`;
}

//Register for class button message
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("registrationModal");
    const closeModalButton = document.querySelector(".close-btn");

    // Function to open the modal
    function openModal() {
        modal.style.display = "block";
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = "none";
    }

    // Get all register buttons
    const registerButtons = document.querySelectorAll(".register-btn");

    // Add event listener to each register button
    registerButtons.forEach(button => {
        button.addEventListener("click", openModal);
    });

    // Add event listener for the close button
    closeModalButton.addEventListener("click", closeModal);

    // Close the modal if the user clicks outside of it
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });
});

//Search input
document.getElementById("searchButton").addEventListener("click", function () {
    const query = document.getElementById("searchInput").value.toLowerCase();

    if (!query.trim()) {
        alert("Please enter a search term.");
        return;
    }

    const keywordMap = {
        "tips.html": ["tip", "tips", "advice", "games", "activities", "video"],
        "classes.html": ["class", "classes", "event", "events", "date", "calendar", "register"],
        "resources.html": ["service", "remedy", "remedies", "recipe", "lookup", "services near me"],
        "help.html": ["help", "how", "when", "where", "question", "what", "assistance"],
        "discussions.html": ["discussion", "discussions", "blog", "comment", "comments", "read blog", "share"],
        "contact.html": ["more help", "contact", "phone", "address", "hours"],
        "signin.html": ["sign up", "sign in", "password", "log in"]
    };

    for (const [page, keywords] of Object.entries(keywordMap)) {
        for (const keyword of keywords) {
            if (query.includes(keyword)) {
                window.location.href = page;
                return;
            }
        }
    }

    alert("Sorry, no relevant page found for your search.");
});






