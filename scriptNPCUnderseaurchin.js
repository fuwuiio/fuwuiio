// Dialogue data for each NPC
const npcData = {
    Shellberry: [
        "Blub...",
        "What's up? Finally came back for the shell?",
        "I gave you this one in particular because it reminds me of your aura",
        "So soothing, serene, and... what's that word again?",
        'It rhymes with "palm"...',
        'Something like "C_ _ _ _" '
    ],
    GreenShellberry: [
        "Lalala...",
        "Oh, it's you!",
        "I kept the heart brooch you gave me, do you want it back?",
        "You were always... hmm... how can I describe your personality?",
        "A very nice person... always had others on your mind...",
        'Oh! the word is similar to "mind"',
        'It went like "K_ _ _ _"'
    ],
    PinkShellberry: [
        "Drip, drop...",
        "You're back!",
        "You left your Magnifying glass here last time we hung out.",
        "You ask so many questions, but it's fun answering them all.",
        "What do they call it? When someone thirsts for knowledge?",
        'It is not "serious" but "C u _ _ _ _ _"?'
    ],
    mermaid: [
        "Oh my! You have traveled a long way.",
        "Your items? I think my baby pearls might've put them in these treausre boxes.",
        "Silly pearls... You can unlock them by whispering the password into the conches.",
        "The pearls will have the passwords, but oh my...",
        "It's almost nap time. They tend to forget their words when they are sleepy.",
        'Hopefully you could complete thier words to unlock these chests.'
    ]
};

// Map of NPCs to their actual names (used for portrait and name display)
const npcNames = {
    Shellberry: "Pearla",
    GreenShellberry: "Bubbles",
    PinkShellberry:"Cora",
    mermaid:"Mother o' Pearl"
};

// Create a variable to track current NPC interaction
let currentNpc = null;
let currentDialogueIndex = 0;

const dialogueBox = document.getElementById("dialogue-box");
const dialogueText = document.getElementById("dialogue-text");
const npcName = document.getElementById("npc-name");
const npcPortrait = document.getElementById("npc-portrait");

// Function to start a conversation with an NPC
function startConversation(npcId) {
    currentNpc = npcId;
    currentDialogueIndex = 0;

    // Load NPC name and portrait based on the npcId
    npcName.innerText = npcNames[npcId]; // Get the name from npcNames map
    npcPortrait.src = `${npcId}_portrait.png`; // Load portrait based on npcId

    showDialogue();
    dialogueBox.style.display = "block"; // Show the dialogue box
}

// Function to show the dialogue based on current NPC and dialogue index
function showDialogue() {
    if (currentNpc && currentDialogueIndex < npcData[currentNpc].length) {
        dialogueText.innerText = npcData[currentNpc][currentDialogueIndex];
    } else {
        setTimeout(() => {
            dialogueBox.style.display = "none"; // Hide the dialogue box after the conversation ends
        });
    }
}

// Event listener for a mouse click on the dialogue box
dialogueBox.addEventListener("click", () => {
    if (currentNpc && currentDialogueIndex < npcData[currentNpc].length) {
        currentDialogueIndex++;
        showDialogue();
    }
});

// Add click event listeners to NPC images
document.getElementById("Shellberry").addEventListener("click", () => startConversation("Shellberry"));
document.getElementById("GreenShellberry").addEventListener("click", () => startConversation("GreenShellberry"));
document.getElementById("PinkShellberry").addEventListener("click", () => startConversation("PinkShellberry"));
document.getElementById("mermaid").addEventListener("click", () => startConversation("mermaid"));

// Combine both `window.onload` functions into one to avoid overwriting
window.onload = function() {
    // Splash screen fade-out
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('fade-out');
    }, 3000); 

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
