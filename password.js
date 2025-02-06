class Password {
    constructor(puzzleId, correctPassword, passwordButtonId, itemButtonId, passwordInputId, passwordSubmitButtonId) {
        this.puzzleId = puzzleId;
        this.correctPassword = correctPassword;  // The correct password
        this.passwordButton = document.getElementById(passwordButtonId);
        this.itemButton = document.getElementById(itemButtonId);
        this.passwordInput = document.getElementById(passwordInputId);  // The specific input for the password
        this.passwordPopup = document.getElementById('passwordPopup');  // The password input popup
        this.passwordOverlay = document.getElementById('overlay');  // Reusing the existing overlay
        this.passwordSubmitButton = document.getElementById(passwordSubmitButtonId);  // Submit button for password
        this.closePasswordPopupButton = document.getElementById('closePasswordPopup');  // Close button for password popup

        // Initially disable the item button
        this.itemButton.disabled = true;  // Item button is disabled at the start

        // Bind the password button to trigger the password popup
        this.passwordButton.addEventListener('click', () => this.showPasswordPopup());

        // Bind the submit button or Enter key to check the password
        this.passwordSubmitButton.addEventListener('click', () => this.checkPassword());
        this.passwordInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.checkPassword();
            }
        });

        // Bind close button to hide the password popup
        this.closePasswordPopupButton.addEventListener('click', () => this.closePasswordPopup());

        // Close the popup when overlay is clicked
        this.passwordOverlay.addEventListener('click', () => this.closePasswordPopup());
    }

    // Show the password input box when the password button is clicked
    showPasswordPopup() {
        this.passwordPopup.style.display = 'block';  // Show the password box
        this.passwordOverlay.style.display = 'block';  // Show the overlay
        this.passwordInput.focus();  // Focus on the input field

        // Conditionally display the relevant input field and button based on puzzleId
        if (this.puzzleId === 'password1') {
            document.getElementById('password1-input').style.display = 'block';
            document.getElementById('passwordSubmitButton1').style.display = 'block';

            document.getElementById('password2-input').style.display = 'none';
            document.getElementById('passwordSubmitButton2').style.display = 'none';
            document.getElementById('password3-input').style.display = 'none';
            document.getElementById('passwordSubmitButton3').style.display = 'none';
        } else if (this.puzzleId === 'password2') {
            document.getElementById('password2-input').style.display = 'block';
            document.getElementById('passwordSubmitButton2').style.display = 'block';

            document.getElementById('password1-input').style.display = 'none';
            document.getElementById('passwordSubmitButton1').style.display = 'none';
            document.getElementById('password3-input').style.display = 'none';
            document.getElementById('passwordSubmitButton3').style.display = 'none';
        } else if (this.puzzleId === 'password3') {
            document.getElementById('password3-input').style.display = 'block';
            document.getElementById('passwordSubmitButton3').style.display = 'block';

            document.getElementById('password1-input').style.display = 'none';
            document.getElementById('passwordSubmitButton1').style.display = 'none';
            document.getElementById('password2-input').style.display = 'none';
            document.getElementById('passwordSubmitButton2').style.display = 'none';
    }
    }

    // Check if the entered password is correct
    checkPassword() {
        const enteredPassword = this.passwordInput.value.trim().toLowerCase(); // Convert input to lowercase
        const correctPassword = this.correctPassword.toLowerCase(); // Convert correct password to lowercase
    
        if (enteredPassword === correctPassword) {
            // Password is correct, unlock the item button
            this.unlockItem();
        } else {
            // If the password is incorrect, reset the input (optional)
            this.passwordInput.value = '';
            alert('Incorrect password, try again.');
        }
    }    

    // Unlock the item (same as item clicked function)
    unlockItem() {
        // Enable the item button
        this.itemButton.disabled = false;  // Enable the item button

        // Optionally, show a message that the item is unlocked
        alert('Correct!');

        // Close the password popup
        this.closePasswordPopup();
    }

    // Close the password popup if the player cancels
    closePasswordPopup() {
        this.passwordPopup.style.display = 'none';
        this.passwordOverlay.style.display = 'none';  // Hide the existing overlay
    }
}

// Initialize password puzzles
document.addEventListener('DOMContentLoaded', () => {
    // Example password puzzle initialization
    new Password('password1', 'calm', 'passwordButton1', 'item1', 'password1-input', 'passwordSubmitButton1');
    new Password('password2', 'kind', 'passwordButton2', 'item2', 'password2-input', 'passwordSubmitButton2');
    new Password('password3', 'curious', 'passwordButton3', 'item3', 'password3-input', 'passwordSubmitButton3');
});
