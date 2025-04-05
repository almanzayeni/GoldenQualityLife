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

//Share pop up
document.addEventListener("DOMContentLoaded", () => {
    // Select all share buttons
    const shareButtons = document.querySelectorAll(".share-btn");

    shareButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Create the share modal
            const shareModal = document.createElement("div");
            shareModal.classList.add("share-modal");
            shareModal.innerHTML = `
                <div class="share-content">
                    <h4>Share this blog</h4>
                    <div class="share-options">
                        <a href="https://www.facebook.com/sharer/sharer.php" target="_blank">Facebook</a>
                        <a href="https://twitter.com/intent/tweet" target="_blank">Twitter</a>
                        <a href="sms:">Messages</a>
                        <a href="mailto:?subject=Check out this blog">Email</a>
                    </div>
                    <button class="close-modal">Close</button>
                </div>
            `;
            document.body.appendChild(shareModal);

            // Close modal when clicking the close button
            shareModal.querySelector(".close-modal").addEventListener("click", () => {
                shareModal.remove();
            });
        });
    });
});

//Blog reply and comment
document.addEventListener("DOMContentLoaded", function() {
    const postCommentButton = document.getElementById("post-comment");
    const commentInput = document.getElementById("comment-input");
    const blogSelect = document.getElementById("blog-select");
    const commentList = document.getElementById("comment-list");

    // Add a new comment
    postCommentButton.addEventListener("click", function() {
        const commentText = commentInput.value.trim();
        const selectedBlog = blogSelect.value;

        if (commentText) {
            // Create new comment element
            const newComment = document.createElement("div");
            newComment.classList.add("user-comment");
            newComment.innerHTML = `
                <h4>New User</h4>
                <p class="comment-blog-title">Blog: ${selectedBlog}</p>
                <p class="comment-p">${commentText}</p>
                <div class="comment-reaction">
                    <button class="reply">Reply</button>
                    <button class="thumbs-up">👍</button>
                </div>
                <hr>
            `;
            commentList.appendChild(newComment);

            // Clear input fields
            commentInput.value = "";
        } else {
            alert("Please enter a comment.");
        }
    });

    // Handle all button clicks for replies and thumbs-up
    document.addEventListener("click", function(event) {
        const target = event.target;

        // Handle reply button click
        if (target.classList.contains("reply")) {
            const comment = target.closest(".user-comment");
            if (!comment.querySelector(".reply-box")) {
                const replyBox = document.createElement("div");
                replyBox.classList.add("reply-box");
                replyBox.innerHTML = `
                    <textarea class="reply-field" placeholder="Write your reply..."></textarea>
                    <button class="reply-submit">Submit</button>
                `;
                comment.appendChild(replyBox);
            }
        }

        // Handle submit reply button click
        if (target.classList.contains("reply-submit")) {
            const replyBox = target.closest(".reply-box");
            const replyText = replyBox.querySelector(".reply-field").value.trim();

            if (replyText) {
                const comment = target.closest(".user-comment");
                const repliesContainer = comment.querySelector(".replies") || document.createElement("div");
                repliesContainer.classList.add("replies");

                const replyDiv = document.createElement("div");
                replyDiv.classList.add("user-reply");
                replyDiv.innerHTML = `
                    <h4>Your Reply</h4>
                    <p class="comment-p">${replyText}</p>
                `;

                repliesContainer.appendChild(replyDiv);
                comment.appendChild(repliesContainer);

                // Clear the reply field
                replyBox.querySelector(".reply-field").value = "";
            }
        }

        // Handle thumbs up button click
        if (target.classList.contains("thumbs-up")) {
            target.classList.toggle("thumbs-up-active");
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





