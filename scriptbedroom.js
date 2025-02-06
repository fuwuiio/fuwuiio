const player = document.querySelector('img.player');
const gameWrapper = document.querySelector('.gameWrapper');
const boundaries = document.querySelectorAll('.boundary');

// Player movement variables
let isMovingLeft = false;
let isMovingRight = false;
let isMovingUp = false;
let isMovingDown = false;

let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Animation state variables
let lastMoveTime = 0; // To alternate images for walking animation
let walkFrame = 0; // Keep track of alternating walk frames

// Define images for idle and walking states
const idleImages = {
    left: "transformedplayerleftidle.png",
    right: "transformedplayerrightidle.png",
    up: "transformedplayerupidle.png",
    down: "transformedplayerdownidle.png",
};

const walkImages = {
    left: ["transformedplayerleft1.png","transformedplayerleftidle.png", "transformedplayerleft2.png","transformedplayerleftidle.png"],
    right: ["transformedplayerright1.png", "transformedplayerrightidle.png","transformedplayerright2.png","transformedplayerrightidle.png"],
    up: ["transformedplayerup1.png", "transformedplayerupidle.png","transformedplayerup2.png", "transformedplayerupidle.png"],
    down: ["transformedplayerdown1.png", "transformedplayerdownidle.png", "transformedplayerdown2.png", "transformedplayerdownidle.png"],
};

// Player movement animation function
function animatePlayer() {
    const playerWidth = player.naturalWidth;
    const playerHeight = player.naturalHeight;
    let playerX = parseInt(player.style.left);
    let playerY = parseInt(player.style.top);

    let stopX = false;
    let stopY = false;

    // Update the player position
    if (isMovingLeft && !isMovingUp && !isMovingDown) {
        playerX -= 3;
    }
    if (isMovingRight && !isMovingUp && !isMovingDown) {
        playerX += 3;
    }
    if (isMovingDown && !isMovingLeft && !isMovingRight) {
        playerY += 3;
    }
    if (isMovingUp && !isMovingLeft && !isMovingRight) {
        playerY -= 3;
    }

    // Collision detection with boundaries
    for (const boundary of boundaries) {
        const boundaryLeft = parseInt(boundary.style.left);
        const boundaryTop = parseInt(boundary.style.top);
        const boundaryRight = boundaryLeft + parseInt(boundary.style.width);
        const boundaryBottom = boundaryTop + parseInt(boundary.style.height);

        if (isMovingLeft && playerX < boundaryRight && playerX + playerWidth > boundaryLeft &&
            playerY + playerHeight > boundaryTop && playerY < boundaryBottom) {
            playerX = boundaryRight;
            stopX = true;
        }

        if (isMovingRight && playerX + playerWidth > boundaryLeft && playerX < boundaryRight &&
            playerY + playerHeight > boundaryTop && playerY < boundaryBottom) {
            playerX = boundaryLeft - playerWidth;
            stopX = true;
        }

        if (isMovingUp && playerY < boundaryBottom && playerY + playerHeight > boundaryTop &&
            playerX + playerWidth > boundaryLeft && playerX < boundaryRight) {
            playerY = boundaryBottom;
            stopY = true;
        }

        if (isMovingDown && playerY + playerHeight > boundaryTop && playerY < boundaryBottom &&
            playerX + playerWidth > boundaryLeft && playerX < boundaryRight) {
            playerY = boundaryTop - playerHeight;
            stopY = true;
        }
    }

    // Set new position
    if (!stopX) {
        player.style.left = playerX + 'px';
    }
    if (!stopY) {
        player.style.top = playerY + 'px';
    }

  // Get the current position of the game wrapper
let gameWrapperCurrentX = parseInt(gameWrapper.style.left) || 0;  // Use 0 as fallback if the value is NaN
let gameWrapperCurrentY = parseInt(gameWrapper.style.top) || 0;   // Same for Y

// Set the limits for the game wrapper's position
const maxX = 0;  
const minX = 1535 - gameWrapper.offsetWidth;  
const maxY = 0;  
const minY = 725 - gameWrapper.offsetHeight;  

// Update position based on movement directions with boundary checks

if (isMovingLeft) {
    gameWrapper.style.left = Math.min(gameWrapperCurrentX + 3, maxX) + 'px'; // Prevent going past the left edge
}

if (isMovingRight) {
    gameWrapper.style.left = Math.max(gameWrapperCurrentX - 3, minX) + 'px'; // Prevent going past the right edge
}

if (isMovingUp) {
    gameWrapper.style.top = Math.min(gameWrapperCurrentY + 3, maxY) + 'px'; // Prevent going past the top edge
}

if (isMovingDown) {
    gameWrapper.style.top = Math.max(gameWrapperCurrentY - 3, minY) + 'px'; // Prevent going past the bottom edge
}

// Handle walking animation: alternate between frames
    if (isMovingLeft || isMovingRight || isMovingUp || isMovingDown) {
        const currentTime = Date.now();
        if (currentTime - lastMoveTime > 200) { // Change frame every 500ms
            walkFrame = (walkFrame + 1) % 4; // Alternate between 0 and 1
            lastMoveTime = currentTime;
        }

        // Set the appropriate walk image
        if (isMovingLeft) {
            player.src = walkImages.left[walkFrame];
        } else if (isMovingRight) {
            player.src = walkImages.right[walkFrame];
        } else if (isMovingUp) {
            player.src = walkImages.up[walkFrame];
        } else if (isMovingDown) {
            player.src = walkImages.down[walkFrame];
        }
    } else {
        // Set the idle image based on direction
        if (isMovingLeft) {
            player.src = idleImages.left;
        } else if (isMovingRight) {
            player.src = idleImages.right;
        } else if (isMovingUp) {
            player.src = idleImages.up;
        } else if (isMovingDown) {
            player.src = idleImages.down;
        }
    }

    // Repeat the animation
    requestAnimationFrame(animatePlayer);
}

animatePlayer();

// Handle player movement keys
document.addEventListener('keydown', (event) => {
    // WASD keys
    if (event.key === "a" || event.key === "A") {
        isMovingLeft = true;
    }
    if (event.key === "d" || event.key === "D") {
        isMovingRight = true;
    }
    if (event.key === "w" || event.key === "W") {
        isMovingUp = true;
    }
    if (event.key === "s" || event.key === "S") {
        isMovingDown = true;
    }

    // Arrow keys
    if (event.key === "ArrowLeft") {
        isMovingLeft = true;
    }
    if (event.key === "ArrowRight") {
        isMovingRight = true;
    }
    if (event.key === "ArrowUp") {
        isMovingUp = true;
    }
    if (event.key === "ArrowDown") {
        isMovingDown = true;
    }
});

document.addEventListener('keyup', (event) => {
    // WASD keys
    if (event.key === "a" || event.key === "A") {
        isMovingLeft = false;
    }
    if (event.key === "d" || event.key === "D") {
        isMovingRight = false;
    }
    if (event.key === "w" || event.key === "W") {
        isMovingUp = false;
    }
    if (event.key === "s" || event.key === "S") {
        isMovingDown = false;
    }

    // Arrow keys
    if (event.key === "ArrowLeft") {
        isMovingLeft = false;
    }
    if (event.key === "ArrowRight") {
        isMovingRight = false;
    }
    if (event.key === "ArrowUp") {
        isMovingUp = false;
    }
    if (event.key === "ArrowDown") {
        isMovingDown = false;
    }
});
