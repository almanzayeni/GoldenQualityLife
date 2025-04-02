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
//Map for services
let map;

async function findServices() {
    const zipCode = document.getElementById("zip-code").value;
    const serviceType = document.getElementById("service-select").value;
    const mapContainer = document.getElementById("map-container");

    if (!/^\d{5}$/.test(zipCode)) {
        alert("Please enter a valid 5-digit ZIP code.");
        return;
    }

    try {
        // Get coordinates from ZIP code using OpenStreetMap Nominatim API
        ///Add real API info later
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${zipCode},USA`);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            alert("Invalid ZIP code or location not found.");
            return;
        }

        const { lat, lon } = geoData[0];

        mapContainer.style.display = "block";

        if (!map) {
            map = L.map("map-container").setView([lat, lon], 12);
        } else {
            map.setView([lat, lon], 12);
        }
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors"
        }).addTo(map);
        L.marker([lat, lon]).addTo(map)
            .bindPopup(`Search area: ${zipCode}`)
            .openPopup();
        const services = [
            { name: "Health Clinic A", lat: parseFloat(lat) + 0.02, lon: parseFloat(lon) + 0.02 },
            { name: "Hospital B", lat: parseFloat(lat) - 0.02, lon: parseFloat(lon) - 0.02 },
            { name: "Pharmacy C", lat: parseFloat(lat) + 0.01, lon: parseFloat(lon) - 0.01 }
        ];
        services.forEach(service => {
            L.marker([service.lat, service.lon]).addTo(map)
                .bindPopup(`${service.name} (${serviceType === "hospital" ? "Hospital" : serviceType === "clinic" ? "Clinic" : serviceType === "pharmacy" ? "Pharmacy" : "Dentist"})`)
                .openPopup();
        });        

    } catch (error) {
        console.error("Error fetching services:", error);
        alert("Failed to load services. Try again later.");
    }
}
