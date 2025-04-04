function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleButton = document.getElementById("toggle-password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.textContent = "🙈";
    } else {
        passwordField.type = "password";
        toggleButton.textContent = "👁️";
    }
}

function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const passwordHint = document.getElementById("password-hint").value;
    const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill out all required fields.");
        return false;
    }

    if (!pattern.test(password)) {
        alert("Password must be at least 8 characters long, including at least one number and one symbol.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    window.location.href = "confirmation.html";
}

function openModal() {
    document.getElementById("forgot-password-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("forgot-password-modal").style.display = "none";
}

function sendConfirmationEmail(event) {
    event.preventDefault();
    const email = document.getElementById("reset-email").value;
    if (email) {
        window.location.href = "confirmation.html";
    }
}
