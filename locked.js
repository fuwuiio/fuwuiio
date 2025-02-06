// Define the list of required item images that need to be in the inventory
const requiredItems = ['Scarf.png', 'Star Hat.png', 'SuperBear Keychain.png',
                        'Marbles.png','BlushFlower.png','Warm Bun.png',
                        'Magnifying Glass.png','Heart Brooch.png','Shell.png',
                        'Paintbrush.png','Sleeping Mask.png','Friendship Bracelet.png',]; // Example items
const linkToPage = document.getElementById('linkToPage'); // Button wrapping the image
const homedoor = document.getElementById('homedoor'); // The image itself

// Define the image sources for the enabled and disabled states
const enabledImage = "doorbuttonopen.png"; // Image when the button is enabled
const disabledImage = "doorbutton.png"; // Image when the button is disabled

// Define the link to the page (destination URL)
const destinationLink = "final.html";  // Change this to your target URL

// Function to check if all required items are in the inventory
function checkRequiredItems() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || []; // Get inventory from localStorage
    
    // Check if all required items are in the inventory
    const allItemsPresent = requiredItems.every(item => inventory.includes(item));
    
    // Enable or disable the button (and change the image) based on the check
    if (allItemsPresent) {
        linkToPage.disabled = false;  // Enable the button
        homedoor.src = enabledImage;  // Change image to enabled version
        
        // Enable the click functionality (link)
        linkToPage.addEventListener('click', () => {
            window.location.href = destinationLink;  // Navigate to the link when the button is clicked
        });
    } else {
        linkToPage.disabled = true;   // Disable the button
        homedoor.src = disabledImage; // Change image to disabled version
        
        // Remove the click functionality when the button is disabled
        linkToPage.removeEventListener('click', () => {
            window.location.href = destinationLink;  // No link action if button is disabled
        });
    }
}

// Initial call to set the button state when the page loads
document.addEventListener('DOMContentLoaded', () => {
    checkRequiredItems(); // Check when the page loads
    updateInventory();    // Update inventory display
});

// Recheck when inventory changes (for example, after adding items)
buttonItems.forEach(button => {
    button.addEventListener('click', () => {
        // Add item logic...
        updateInventory(); // Recheck after inventory changes
    });
});
