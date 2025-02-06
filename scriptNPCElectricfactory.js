// Dialogue data for each NPC
const npcData = {
    Robot: [
        "Beep, Beep!",
        "Stop right there! Oh wait, it's you!",
        "I have your gift in this box. It represents what great friend you are!",
        "Though, I did forget the pattern to unlock it... ",
        "Orange, then blue, then orange again, hmm... what is the last one?"
    ],
    PurpleRobot: [
        "Zzt...zzt...",
        "Can't you see im busy solving this puzzle!",
        "Though, since its been a long time since I last saw you, it would be nice to chat.",
        "You always talked about your dreams, they were very colorful...",
        "Speaking of colors, I think this pattern uses all of them.",
        "Pink in the North, Green in the south, Orange in the West, and Blue in...",
    ],
    GreenRobot: [
        "Go, go , go!",
        "Hiya! Did you come to get your paintbrush?",
        "You're an artist right? You know your colors, yeah?",
        "I know the pattern is just green on the left and on the right is its complement.",
        "What goes well with green?",

    ],
    motherboard: [
        "Welcome to my lab! Are you looking to research somthing?",
        "You need help retrieving your items? Maybe my bots can help",
        "They're learning how to recognize patterns and colors.",
        "Maybe if you help them complete these patterns, they can unlock your items.",
        "They have most of it down, but some struggle more than others.",

    ]
};

// Map of NPCs to their actual names (used for portrait and name display)
const npcNames = {
    Robot: "StopBot",
    PurpleRobot: "SpeedBot",
    GreenRobot:"GoBot",
    motherboard:"Motherboard"
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
document.getElementById("Robot").addEventListener("click", () => startConversation("Robot"));
document.getElementById("PurpleRobot").addEventListener("click", () => startConversation("PurpleRobot"));
document.getElementById("GreenRobot").addEventListener("click", () => startConversation("GreenRobot"));
document.getElementById("motherboard").addEventListener("click", () => startConversation("motherboard"));

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
