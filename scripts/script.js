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
e
        if (!isValid) {
            event.preventDefault();  
            alert(errorMessage);  
        }
    });
});
