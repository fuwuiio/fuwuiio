const inventoryButton = document.getElementById('inventoryButton');
const inventoryContents = document.getElementById('inventoryContents');
const buttonMap = document.querySelector('.map');
const buttonTut = document.querySelector('.tut');
const buttonItems = document.querySelectorAll('.clickItem');  // Query all item buttons
const popupMap = document.getElementById('popupMap');
const popupTut = document.getElementById('popupTut');
const popupItem = document.getElementById('popupItem');
const overlay = document.getElementById('overlay');
const resetInventoryButton = document.getElementById('resetInventoryButton');

// Popup and inventory logic
buttonMap.addEventListener('click', () => {
    popupMap.style.display = 'block';
    overlay.style.display = 'block';
    disableCurrentPageLink();
});

function closePopupMap() {
    popupMap.style.display = 'none';
    overlay.style.display = 'none';
}

overlay.addEventListener('click', () => {
    closePopupMap();
});

// tutorial
buttonTut.addEventListener('click', () => {
    popupTut.style.display = 'block';
    overlay.style.display = 'block';
});

function closePopupTut() {
    popupTut.style.display = 'none';
    overlay.style.display = 'none';
}

overlay.addEventListener('click', () => {
    closePopupTut();
});

// Event listener for item buttons 
buttonItems.forEach(button => {
    button.addEventListener('click', () => {
        const itemLabel = button.getAttribute('alt'); // Gets alt text 
        const itemImage = itemLabel.trim() + '.png';  // Dynamic item image name

        // Adds item into inventory
        if (!inventory.includes(itemImage)) {
            inventory.push(itemImage);
            localStorage.setItem('inventory', JSON.stringify(inventory));  
            updateInventory();  
        }

        // Update the popup with the item name and image
        popupItem.querySelector('h').innerText = `You got the ${itemLabel}!`;
        popupItem.querySelector('img').src = itemImage;

        popupItem.style.display = 'block';
        overlay.style.display = 'block';

        // Hide the clicked button after clicked
        button.style.display = 'none'; 

        // Store the hidden button in localStorage
        let hiddenButtons = JSON.parse(localStorage.getItem('hiddenButtons')) || [];
        if (!hiddenButtons.includes(itemLabel)) {
            hiddenButtons.push(itemLabel);
            localStorage.setItem('hiddenButtons', JSON.stringify(hiddenButtons));
        }
    });
});

// hide buttons on page load 
function hideButtonsFromStorage() {
    const hiddenButtons = JSON.parse(localStorage.getItem('hiddenButtons')) || [];
    buttonItems.forEach(button => {
        const itemLabel = button.getAttribute('alt');
        if (hiddenButtons.includes(itemLabel)) {
            button.style.display = 'none';
        }
    });
}

function closePopupItem() {
    popupItem.style.display = 'none';
    overlay.style.display = 'none';
}

overlay.addEventListener('click', () => {
    closePopupItem();
});

// Update inventory display
function updateInventory() {
    inventoryContents.innerHTML = '';  // Clear the current inventory display
    inventory.forEach(item => {
        const img = document.createElement('img');
        img.src = item;  // Add each item image
        inventoryContents.appendChild(img);
    });
}

// Show/hide inventory contents when the button is clicked
inventoryButton.addEventListener('click', () => {
    const inventoryContentsDiv = document.getElementById('inventoryContents');
    const inventoryContentsVisible = inventoryContentsDiv.style.display === 'block';

    // Toggle visibility of the inventory contents
    inventoryContentsDiv.style.display = inventoryContentsVisible ? 'none' : 'block';

    if (!inventoryContentsVisible) {
        updateInventory();
    }
});

// Initialize inventory display and hide buttons on page load
document.addEventListener('DOMContentLoaded', () => {
    // Hide inventory contents by default
    const inventoryContentsDiv = document.getElementById('inventoryContents');
    inventoryContentsDiv.style.display = 'none';  // Ensures the inventory starts hidden

    // Initialize the inventory and hide buttons based on previous clicks
    updateInventory();
    hideButtonsFromStorage();
});

// Reset inventory when button is clicked
resetInventoryButton.addEventListener('click', () => {
    inventory = [];  // Clear inventory array
    localStorage.setItem('inventory', JSON.stringify(inventory));  // Update localStorage
    updateInventory();  // Update display

    // Show all item buttons again after resetting
    buttonItems.forEach(button => {
        button.style.display = 'inline-block'; 
    });

    // Clear the hidden buttons from localStorage
    localStorage.removeItem('hiddenButtons');
});

// Initialize inventory display and hide buttons on page load
document.addEventListener('DOMContentLoaded', () => {
    updateInventory();
    hideButtonsFromStorage();  // Hide buttons that were previously clicked
});

function disableCurrentPageLink() {
    const currentPage = window.location.pathname.split('/').pop(); // Get only the file name, not the entire path
    const links = document.querySelectorAll('#popupMap a');
    links.forEach(link => {
        const linkPage = link.href.split('/').pop(); // Get the file name from the link
        if (linkPage === currentPage) {
            link.style.pointerEvents = 'none';
            link.style.color = 'gray';
        }
    });
}
