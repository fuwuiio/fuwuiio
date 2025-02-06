// Dialogue data for each NPC
const npcData = {
    Radish: [
        "Hello!",
        "I remember you! Though you do look a bit different...",
        "Did you come for the flower pin?",
        "The color reminded me of your rosy cheeks back then.",
        "How many petals did it have again?",
        "1...2...3...4... hm... I forgot."
    ],
    BlueRadish: [
        "Hii!",
        "What happened to your ears?...",
        "You know... they kinda looked like those buns.",
        "The hot ones that are shaped like swirls.",
        "I think there's one in this chest?",
        "There might be 4...3...2...1 buns in there? I'm not sure."
    ],
    RedRadish: [
        "Hm...",
        "It's been so long since I last saw you.",
        "Did you bring the marbles for the game?",
        "The ones that matched your shiny eyes?",
        "Let's play with these new rules I learned!",
        "You get the odd numbers first, then I get the even ones.",
        "1...3...2...4..."
    ],
    yampa: [
        "Welcome to the Bamboo Forest",
        "I assume you are looking for somthing?",
        "Your items?",
        "They are probably inside of these chests.",
        "There are bamboo bundles with different amounts.",
        "Shake them in the right order to unlock the chests.",
        "The young radishes have the sequences.",
        "I reccently taught them how to count to 4."
    ]
};

// Map of NPCs to their actual names (used for portrait and name display)
const npcNames = {
    Radish: "Daikon",
    BlueRadish: "Beety",
    RedRadish:"Turnip",
    yampa:"Yam-pa"
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
document.getElementById("Radish").addEventListener("click", () => startConversation("Radish"));
document.getElementById("BlueRadish").addEventListener("click", () => startConversation("BlueRadish"));
document.getElementById("RedRadish").addEventListener("click", () => startConversation("RedRadish"));
document.getElementById("yampa").addEventListener("click", () => startConversation("yampa"));

// Combine both `window.onload` functions into one to avoid overwriting
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
