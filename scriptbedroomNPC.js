// Dialogue data for each NPC
const npcData = {
    mirror: [
        "It's me...",
        "I am the same person right?",
        "Have I really changed that much?",
        "I remember now... I'm- "
    ]
};

// Map of NPCs to their actual names (used for portrait and name display)
const npcNames = {
    mirror: "_ _ _ _ _ _"
};

// Create a variable to track current NPC interaction
let currentNpc = null;
let currentDialogueIndex = 0;
let finalDialogueShown = false;  // New state variable to track final dialogue

const dialogueBox = document.getElementById("dialogue-box");
const dialogueText = document.getElementById("dialogue-text");
const npcName = document.getElementById("npc-name");
const npcPortrait = document.getElementById("npc-portrait");
const nameInputOverlay = document.getElementById("name-input-overlay"); // New overlay container for name input
const nameInput = document.getElementById("name-input"); // This is the text input field for name
const submitButton = document.getElementById("submit-button"); // Button to submit the name

// Function to start a conversation with an NPC
function startConversation(npcId) {
    currentNpc = npcId;
    currentDialogueIndex = 0;
    finalDialogueShown = false;  // Reset the final dialogue state

    // Load NPC name and portrait based on the npcId
    npcName.innerText = npcNames[npcId]; 
    npcPortrait.src = `${npcId}_portrait.png`; 

    showDialogue();
    dialogueBox.style.display = "block"; // Show the dialogue box
}

// Function to show the dialogue based on current NPC and dialogue index
function showDialogue() {
    if (currentNpc && currentDialogueIndex < npcData[currentNpc].length) {
        dialogueText.innerText = npcData[currentNpc][currentDialogueIndex];
    } else {
        // After last dialogue, show the name input overlay
        promptForName();
    }
}

// Show the name input overlay (without hiding the dialogue)
function promptForName() {
    // Display the name input overlay, but keep the dialogue visible
    nameInputOverlay.style.display = "flex"; // Use flex or block to overlay it on top of the dialogue box

    submitButton.addEventListener("click", () => {
        const playerName = nameInput.value.trim();
        if (playerName) {
            // Replace the NPC's name with the player's name
            npcNames[currentNpc] = playerName;
            npcName.innerText = playerName;

            // Hide the input overlay and show the final dialogue
            nameInputOverlay.style.display = "none"; // Hide the name input overlay

            // Display the final dialogue with the player's name
            showFinalDialogue(playerName);
        }
    });
}

// Function to show the final dialogue with the player's name
function showFinalDialogue(playerName) {
    // Delay before showing the final dialogue
    setTimeout(() => {
        dialogueBox.style.display = "block"; // Ensure the dialogue box is visible
        dialogueText.innerText = `I'm ${playerName}!`; // Final dialogue with the player's name
        npcName.innerText = playerName; // Update NPC name to the player's name
        finalDialogueShown = true;  // Mark final dialogue as shown
    }, 500); // Add a slight delay before the final dialogue appears
}

// Function to trigger the fade to black effect
function triggerFadeToBlack() {
    const fadeElement = document.createElement('div');  // Create a new div element for the fade
    fadeElement.classList.add('fade-to-black');        
    document.body.appendChild(fadeElement);             

    // Trigger the fade effect
    setTimeout(() => {
        fadeElement.classList.add('show');              // Add 'show' class to make the fade visible
    }, 100);  // Delay before fading in, adjust as necessary

    // Optionally, hide the dialogue box and other elements if desired
    setTimeout(() => {
        dialogueBox.style.display = "none";  // Hide the dialogue box after fade-in

        // Show "End." text after the fade completes
        showEndScreen();
    }, 2500); // Adjust timing to match the fade duration
}

// display the "End." screen
function showEndScreen() {
    const endText = document.getElementById("end-screen");
    endText.classList.add('show');  
}

// Event listener for a mouse click on the dialogue box
dialogueBox.addEventListener("click", () => {
    if (finalDialogueShown) {
        // If the final dialogue has been shown, trigger the fade to black on the next click
        triggerFadeToBlack();
    } else {
        if (currentNpc && currentDialogueIndex < npcData[currentNpc].length) {
            currentDialogueIndex++;
            showDialogue();
        }
    }
});

// Add click event listeners to NPC images
document.getElementById("mirror").addEventListener("click", () => startConversation("mirror"));

window.onload = function() {
    // Splash screen fade-out
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('fade-out');
    }, 3000); // 

    // Select all img elements with the class 'npcposition'
    var npcs = document.querySelectorAll('.npcposition');

    npcs.forEach(function(img) {
        var div = img.previousElementSibling;  

        if (div && div.classList.contains('boundary')) {
            // Set the width and height of the div to match the image
            div.style.width = img.naturalWidth + 'px';
            div.style.height = img.naturalHeight + 'px';

            // Set the position of the div to match the position of the image
            div.style.left = img.style.left;
            div.style.top = img.style.top;
        }
    });
};
