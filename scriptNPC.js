// Dialogue data for each NPC
const npcData = {
    sheep: [
        "Heyo, you doing alright?",
        "You look pale.",
        "Maybe you should rest at home",
        "Which one is your home? Umm... Its the orange one. How could you forget? ",
        "Wait! before you leave, remember to take your hat.", 
        "It's been sitting on my lawn for a while."
    ],
    momsheep: [
        "Honey! Are you ok?",
        "Come into the house, its too chilly outside.",
        "Wear your scarf, it will make you feel warmer. Wait...",
        "You feel the same, but look and act so differently...",
        "I can't let you into this house till I can confirm your identity!",
        "You need to bring me more items to prove that you are truly my baby!"
    ],
    bluesheep: [
        "Baaa.",
        "Hello, its been a while, you've changed quite a bit.",
        'Are you still into "Superbear"? Just wondering cause I still have your keychain.',
        "You left it here the last time we had a playdate. How long ago was that?",
        "Might've been a few years ago...",

    ],
    ram: [
        "Welcome Home, you finally came back",
        "Who am I? I'm the mayor, dont you remember?",
        "You don't remember anything? Hmm... maybe you been away for too long.",
        "Go talk to some of the townsfolk, maybe they can help you recall some memories.",
        "You also should probably put on some clothes...",

    ]
};

// Map of NPCs to their actual names (used for portrait and name display)
const npcNames = {
    sheep: "Aries",
    momsheep: "Mom",
    bluesheep:"Bluebell",
    ram:"Rammus"
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
document.getElementById("sheep").addEventListener("click", () => startConversation("sheep"));
document.getElementById("momsheep").addEventListener("click", () => startConversation("momsheep"));
document.getElementById("bluesheep").addEventListener("click", () => startConversation("bluesheep"));
document.getElementById("ram").addEventListener("click", () => startConversation("ram"));


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
