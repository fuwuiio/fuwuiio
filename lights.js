// Function to initialize each puzzle
function initializePuzzle(puzzleId, images, answerArray, pumpkinButtonId) {
    let currentArray = Array(answerArray.length).fill(images[0]); // Start with all "off light" images
    const buttons = document.querySelectorAll(`#${puzzleId} .cycleButton`);
    const pumpkinButton = document.getElementById(pumpkinButtonId); // Get the specific pumpkin button

    // Loop through each button and add a click event listener
    buttons.forEach((button, index) => {
        let currentIndex = 0;
        const imgElement = button.querySelector('.cycleImage');

        button.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % images.length; // Cycle through images
            imgElement.src = images[currentIndex]; // Change the image source
            currentArray[index] = images[currentIndex]; // Update the current state of the puzzle

            // Check if the sequence is correct
            checkArray(currentArray, answerArray, pumpkinButton);
        });
    });

    function checkArray(currentArray, answerArray, pumpkinButton) {
        if (currentArray.toString() === answerArray.toString()) {
            alert('Correct!');
            unlockItem(pumpkinButton); // Unlock the pumpkin item when the sequence is correct
        }
    }

    function unlockItem(pumpkinButton) {
        pumpkinButton.disabled = false; // Enable the pumpkin button by removing the 'disabled' attribute
    }
}

// Initialize all puzzles when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Define each puzzle's data (this can be expanded to as many puzzles as needed)
    initializePuzzle('puzzle1', ['off light.png', 'orange light.png', 'blue light.png', 'pink light.png', 'green light.png'], 
                     ['orange light.png', 'blue light.png', 'orange light.png', 'blue light.png'], 'item1');
    initializePuzzle('puzzle2', ['off light.png', 'orange light.png', 'blue light.png', 'pink light.png', 'green light.png'], 
                    ['pink light.png', 'green light.png', 'pink light.png', 'green light.png'], 'item2');
     initializePuzzle('puzzle3', ['off light.png', 'orange light.png', 'blue light.png', 'pink light.png', 'green light.png'], 
                    ['pink light.png', 'orange light.png', 'green light.png', 'blue light.png'], 'item3');
    // Add more puzzles here if needed, e.g.
    // initializePuzzle('puzzle2', [...], [...], 'item2');
});
