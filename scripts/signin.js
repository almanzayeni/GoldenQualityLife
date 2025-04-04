// Show/Hide password toggle
function togglePassword() {
    var passwordField = document.getElementById("password");
    var passwordButton = document.getElementById("toggle-password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        passwordButton.textContent = "🙈"; // Change icon to hide
    } else {
        passwordField.type = "password";
        passwordButton.textContent = "👁️"; // Change icon to show
    }
}

// Modal functionality
function openModal(event) {
    event.preventDefault(); // Prevent the default behavior of the link (e.g., page navigation)
    document.getElementById("forgot-password-modal").style.display = "flex"; // Show modal
}

function closeModal() {
    document.getElementById("forgot-password-modal").style.display = "none"; // Hide modal
}

// Listen for the "Forgot Password?" link click event
document.getElementById("forgot-password-link").addEventListener("click", openModal);

// Function to handle form submission and confirmation
function sendConfirmationEmail(event) {
    event.preventDefault(); // Prevent form submission

    var email = document.getElementById("reset-email").value;
    var confirmationMessage = document.getElementById("confirmation-message");

    if (email) {
        confirmationMessage.textContent = `A confirmation email has been sent to ${email}.`;
        // Close modal after submitting
        setTimeout(closeModal, 1500);
    } else {
        confirmationMessage.textContent = "Please enter a valid email.";
    }
}
function validateForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email && password) {
        // Both fields are filled, proceed to redirect
        location.href = 'index.html';
    } else {
        // One or both fields are empty, show an alert or message
        alert("Please fill in both fields.");
    }
}







