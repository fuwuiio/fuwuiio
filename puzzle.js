class Puzzle {
    constructor(puzzleId, correctSequence, itemButtonId) {
        this.puzzleId = puzzleId;
        this.correctSequence = correctSequence;
        this.itemButton = document.getElementById(itemButtonId);
        this.playerSequence = [];

        // Initially disable the item button
        this.itemButton.disabled = true;

        // Bind sequence buttons
        this.sequenceButtons = document.querySelectorAll(`#${puzzleId} .sequence-btn`);
        this.sequenceButtons.forEach(button => {
            button.addEventListener('click', () => this.handleSequenceClick(button));
        });

        // Bind item button
        this.itemButton.addEventListener('click', () => this.handleItemClick());
    }

    // Handle a click on a sequence button
    handleSequenceClick(button) {
        const buttonValue = parseInt(button.getAttribute('data-sequence'));
        this.playerSequence.push(buttonValue);

        // Check if the sequence is correct
        if (this.isCorrectSequence()) {
            this.itemButton.disabled = false;  // Unlock the item button
            alert("Correct!"); // Show the alert when the sequence is correct
        } else if (this.playerSequence.length >= this.correctSequence.length) {
            
            this.resetSequence();
        }
    }

    // Check if the player's sequence matches the correct one
    isCorrectSequence() {
        return JSON.stringify(this.playerSequence) === JSON.stringify(this.correctSequence);
    }

    // Reset the player's sequence
    resetSequence() {
        this.playerSequence = [];
        this.itemButton.disabled = true;  // Keep the item button locked
    }

    // Handle clicking on the item (when the sequence is correct)
    handleItemClick() {
        if (!this.itemButton.disabled) {
            const itemLabel = this.itemButton.getAttribute('alt');
            const itemImage = itemLabel.trim() + '.png';

            if (!inventory.includes(itemImage)) {
                inventory.push(itemImage);
                localStorage.setItem('inventory', JSON.stringify(inventory));
                updateInventory();
            }

            // Show popup with item info
            popupItem.querySelector('h').innerText = `You got the ${itemLabel}!`;
            popupItem.querySelector('img').src = itemImage;
            popupItem.style.display = 'block';
            overlay.style.display = 'block';
        }
    }
}

// Initialize puzzles
document.addEventListener('DOMContentLoaded', () => {
    
    new Puzzle('puzzle1', [1, 2, 3, 4], 'item1');  

    new Puzzle('puzzle2', [4, 3, 2, 1], 'item2');

    new Puzzle('puzzle3', [1, 3, 2, 4], 'item3');
});