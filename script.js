// Project-D: Dhrithi's Birthday Website - Updated with 9-Box Game
// Interactive animations and game logic

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initializeSparkles();
    initializePageNavigation();
    initializeCakeGame();
    initializeBoxGame(); // Updated game
    initializeBackgroundMusic(); // Initialize background music
});

// Page Navigation System
function initializePageNavigation() {
    const beginBtn = document.getElementById('beginBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    beginBtn.addEventListener('click', () => {
        switchPage('page1', 'page2');
    });
    
    nextBtn.addEventListener('click', () => {
        switchPage('page2', 'page3');
    });
}

function switchPage(fromPage, toPage) {
    const currentPage = document.getElementById(fromPage);
    const nextPage = document.getElementById(toPage);
    
    // Fade out current page
    currentPage.style.opacity = '0';
    currentPage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        currentPage.classList.remove('active');
        nextPage.classList.add('active');
        
        // Fade in next page
        setTimeout(() => {
            nextPage.style.opacity = '1';
            nextPage.style.transform = 'scale(1)';
        }, 100);
    }, 500);
}

// Sparkles Animation for Page 1
function initializeSparkles() {
    const sparklesContainer = document.querySelector('.sparkles-container');
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '💖', '💜', '🦄', '🌸'];
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        
        // Random horizontal position
        sparkle.style.left = Math.random() * 100 + 'vw';
        
        // Random animation duration
        sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        // Random delay
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        
        sparklesContainer.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 6000);
    }
    
    // Create sparkles continuously
    setInterval(createSparkle, 300);
    
    // Create initial batch
    for (let i = 0; i < 15; i++) {
        setTimeout(createSparkle, i * 200);
    }
}

// Cake Cutting Game for Page 2
function initializeCakeGame() {
    const cake = document.querySelector('.cake');
    const nextBtn = document.getElementById('nextBtn');
    const confettiContainer = document.querySelector('.confetti-container');
    let cakeClicked = false;
    
    cake.addEventListener('click', function() {
        if (cakeClicked) return;
        cakeClicked = true;
        
        // Cake cutting animation
        cake.style.animation = 'none';
        cake.style.transform = 'scale(1.1)';
        
        // Hide flames (blow out candles)
        const flames = document.querySelectorAll('.flame');
        flames.forEach((flame, index) => {
            setTimeout(() => {
                flame.style.opacity = '0';
                flame.style.transform = 'translateX(-50%) scale(0)';
            }, index * 200);
        });
        
        // Create confetti burst
        setTimeout(() => {
            createConfettiBurst();
        }, 600);
        
        // Show next button
        setTimeout(() => {
            nextBtn.classList.remove('hidden');
            nextBtn.style.animation = 'buttonFloat 2s ease-in-out infinite';
        }, 1500);
        
        // Add cake cutting effect
        setTimeout(() => {
            cake.style.transform = 'scale(1.05)';
            
            // Add a "cut" effect
            const cutLine = document.createElement('div');
            cutLine.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 2px;
                height: 0;
                background: #8B4513;
                transform: translate(-50%, -50%);
                z-index: 10;
                transition: height 0.5s ease;
            `;
            cake.appendChild(cutLine);
            
            setTimeout(() => {
                cutLine.style.height = '120px';
            }, 100);
        }, 800);
    });
}

function createConfettiBurst() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#FF69B4', '#FFD700', '#00CED1', '#FF6347', '#98FB98', '#DDA0DD', '#FFB6C1', '#87CEEB'];
    const confettiShapes = ['🎉', '🎊', '✨', '🌟', '💖', '💜', '🎈', '🍰'];
    
    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random choice between color squares and emoji
            if (Math.random() > 0.5) {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 8 + 6 + 'px';
                confetti.style.height = confetti.style.width;
            } else {
                confetti.textContent = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
                confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
                confetti.style.backgroundColor = 'transparent';
            }
            
            // Random horizontal position
            confetti.style.left = Math.random() * 100 + 'vw';
            
            // Random animation duration
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }, i * 50);
    }
}

// Updated 9-Box Game for Page 3
function initializeBoxGame() {
    const gameBoxes = document.querySelectorAll('.game-box');
    const wrongBoxMessage = document.getElementById('wrongBoxMessage');
    const wrongBoxText = document.getElementById('wrongBoxText');
    const finalMessage = document.getElementById('finalMessage');
    
    let gameEnded = false;
    
    // Flirty messages for wrong boxes (boxes 1-8)
    const flirtyMessages = [
        "Nothing here cutie, the bone in this just melted by seeing u.",
        "Empty! Just like a world without u 🌍",
        "Empty box! I didn't see u today but u still look goddamm awesomeee ✨",
        "Nothing here! uk? if u hold 2 diamonds in front of a mirror, u can see two of them 🤭",
        "Oops! Nothing here! Are u an alien? Cuz ur beauty is out of this world 💫👽",
        "Nahhh emptyy! ig ur mom is good at baking cuz she made a cutiee pieee 🥧",
        "Nope! but wait… did I mention ur smile lights up galaxies? 🌌",
        "Not here but Close! but how are u soo perfect in everyyy wayyy?"
    ];
    
    gameBoxes.forEach((box, index) => {
        box.addEventListener('click', function() {
            if (gameEnded) return;
            
            // Check if this is the 9th box (index 8) - the only box with the bone
            if (index === 8) {
                // This is the correct box (9th box) - always has the bone
                gameEnded = true;
                
                // Add glow animation
                this.classList.add('glow');
                
                // Show glowing bone animation
                showGlowingBone();
                
                // Create confetti burst
                setTimeout(() => {
                    createVictoryConfetti();
                }, 800);
                
                // Show final message
                setTimeout(() => {
                    showFinalMessage();
                }, 2000);
                
            } else {
                // This is a wrong box (boxes 1-8) - show corresponding flirty message
                const message = flirtyMessages[index];
                
                // Add bounce animation
                this.classList.add('bounce');
                setTimeout(() => {
                    this.classList.remove('bounce');
                }, 800);
                
                // Show flirty wrong message
                showWrongBoxMessage(message);
                
                // Box remains active and can be clicked again
            }
        });
    });
}

function showWrongBoxMessage(message) {
    const wrongBoxMessage = document.getElementById('wrongBoxMessage');
    const wrongBoxText = document.getElementById('wrongBoxText');
    const backButton = document.getElementById('popupBackButton');
    
    wrongBoxText.textContent = message;
    wrongBoxMessage.classList.remove('hidden');
    wrongBoxMessage.classList.add('show');
    
    // Remove any existing event listeners
    const newBackButton = backButton.cloneNode(true);
    backButton.parentNode.replaceChild(newBackButton, backButton);
    
    // Add Back button click handler
    newBackButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close popup immediately
        wrongBoxMessage.classList.remove('show');
        setTimeout(() => {
            wrongBoxMessage.classList.add('hidden');
        }, 300);
        
        console.log('❌ Wrong box popup closed via Back button');
    });
    
    // Allow manual close by clicking outside popup content
    const closeHandler = (e) => {
        if (e.target === wrongBoxMessage) {
            wrongBoxMessage.classList.remove('show');
            setTimeout(() => {
                wrongBoxMessage.classList.add('hidden');
            }, 300);
            wrongBoxMessage.removeEventListener('click', closeHandler);
            console.log('❌ Wrong box popup closed by clicking outside');
        }
    };
    wrongBoxMessage.addEventListener('click', closeHandler);
    
    console.log('💬 Wrong box message displayed with Back button');
}

function showGlowingBone() {
    const bone = document.createElement('div');
    bone.className = 'bone-glow';
    bone.textContent = '🦴';
    document.body.appendChild(bone);
    
    setTimeout(() => {
        bone.remove();
    }, 2000);
}

// No puppy animations needed since puppy was removed

function createVictoryConfetti() {
    const colors = ['#FF69B4', '#FFD700', '#00CED1', '#FF6347', '#98FB98', '#DDA0DD', '#FFB6C1', '#87CEEB'];
    const confettiShapes = ['🎉', '🎊', '✨', '🌟', '💖', '💜', '🎈', '🍰', '🦴', '🐶'];
    
    // Create massive confetti burst
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.position = 'fixed';
            confetti.style.zIndex = '500';
            
            // Random choice between color squares and emoji
            if (Math.random() > 0.3) {
                confetti.textContent = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
                confetti.style.fontSize = Math.random() * 25 + 20 + 'px';
                confetti.style.backgroundColor = 'transparent';
            } else {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 12 + 8 + 'px';
                confetti.style.height = confetti.style.width;
            }
            
            // Random horizontal position
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-50px';
            
            // Random animation duration
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 30);
    }
}

function showFinalMessage() {
    const finalMessage = document.getElementById('finalMessage');
    const gameContainer = document.querySelector('.game-container');
    
    // Hide game elements
    gameContainer.style.opacity = '0';
    gameContainer.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        finalMessage.classList.remove('hidden');
        finalMessage.classList.add('show');
        
        // Add closing functionality
        finalMessage.addEventListener('click', (e) => {
            if (e.target === finalMessage) {
                closeFinalMessage();
            }
        });
        
        // Add scroll effects to message
        addMessageScrollEffects();
        
    }, 500);
}

function addMessageScrollEffects() {
    const messageText = document.querySelector('.message-text');
    const paragraphs = messageText.querySelectorAll('p');
    
    // Animate paragraphs appearing one by one
    paragraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, index * 500 + 1000);
    });
}

function closeFinalMessage() {
    const finalMessage = document.getElementById('finalMessage');
    const gameContainer = document.querySelector('.game-container');
    
    finalMessage.style.opacity = '0';
    finalMessage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        finalMessage.classList.add('hidden');
        finalMessage.classList.remove('show');
        
        // Show game elements again
        gameContainer.style.opacity = '1';
        gameContainer.style.transform = 'scale(1)';
    }, 500);
}

// Add extra interactivity and polish
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to interactive elements
    addHoverEffects();
    
    // Add keyboard navigation
    addKeyboardNavigation();
    
    // Add touch gestures for mobile
    addTouchGestures();
});

function addHoverEffects() {
    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(221,160,221,0.8)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Add enhanced hover effects to game boxes
    const gameBoxes = document.querySelectorAll('.game-box');
    gameBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08) translateY(-8px)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const activePage = document.querySelector('.page.active');
        
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            
            if (activePage.id === 'page1') {
                document.getElementById('beginBtn').click();
            } else if (activePage.id === 'page2') {
                const cake = document.querySelector('.cake');
                const nextBtn = document.getElementById('nextBtn');
                
                if (nextBtn.classList.contains('hidden')) {
                    cake.click();
                } else {
                    nextBtn.click();
                }
            }
        }
        
        if (e.key === 'Escape') {
            const finalMessage = document.getElementById('finalMessage');
            const wrongBoxMessage = document.getElementById('wrongBoxMessage');
            
            if (!finalMessage.classList.contains('hidden')) {
                closeFinalMessage();
            }
            if (!wrongBoxMessage.classList.contains('hidden')) {
                wrongBoxMessage.classList.remove('show');
                setTimeout(() => {
                    wrongBoxMessage.classList.add('hidden');
                }, 300);
            }
        }
    });
}

function addTouchGestures() {
    // Add touch feedback for mobile devices
    const interactiveElements = document.querySelectorAll('button, .cake, .game-box');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Additional magical touches
function addMagicalTouches() {
    // Add random sparkle effects when hovering over elements
    const magicalElements = document.querySelectorAll('.birthday-title, .cake, .game-box');
    
    magicalElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            createMagicalSparkle(this);
        });
    });
}

function createMagicalSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: absolute;
        pointer-events: none;
        font-size: 1.5rem;
        z-index: 1000;
        animation: magicalSparkle 1s ease-out forwards;
    `;
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add the magical sparkle keyframe
const style = document.createElement('style');
style.textContent = `
@keyframes magicalSparkle {
    0% {
        opacity: 0;
        transform: scale(0) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: scale(1.5) rotate(180deg);
    }
    100% {
        opacity: 0;
        transform: scale(0.5) rotate(360deg) translateY(-50px);
    }
}
`;
document.head.appendChild(style);

// Initialize magical touches
setTimeout(addMagicalTouches, 1000);

// Background Music System
function initializeBackgroundMusic() {
    const audio = document.getElementById('backgroundMusic');
    const toggleButton = document.getElementById('musicToggle');
    const musicIcon = document.querySelector('.music-icon');
    
    // State tracking
    let isPlaying = false;
    let isMuted = false;
    let hasUserInteracted = false;
    
    console.log('🎵 Initializing background music system...');
    
    // Set initial volume
    audio.volume = 0.45; // Soft volume as requested
    
    // Function to handle first user interaction (for autoplay policy)
    function handleFirstInteraction() {
        if (hasUserInteracted) return;
        hasUserInteracted = true;
        
        console.log('🎵 First interaction detected - starting music...');
        
        // Try to start the music
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                updateButtonState();
                console.log('🎵 Music started successfully!');
            }).catch(error => {
                console.log('Music autoplay failed:', error.message);
                updateButtonState();
            });
        }
    }
    
    // Function to update button appearance
    function updateButtonState() {
        toggleButton.classList.remove('playing', 'muted', 'waiting');
        
        if (isPlaying && !isMuted) {
            // Music is playing and audible
            toggleButton.classList.add('playing');
            musicIcon.textContent = '🎵';
        } else if (isMuted || !isPlaying) {
            // Music is muted or not playing
            toggleButton.classList.add('muted');
            musicIcon.textContent = '🔇';
        } else {
            // Waiting for interaction
            toggleButton.classList.add('waiting');
            musicIcon.textContent = '🎵';
        }
    }
    
    // Toggle music on button click
    toggleButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!hasUserInteracted) {
            handleFirstInteraction();
            return;
        }
        
        if (audio.paused) {
            // Start/resume music
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    isMuted = false;
                    updateButtonState();
                    console.log('🎵 Music resumed');
                }).catch(error => {
                    console.log('Play failed:', error);
                });
            }
        } else {
            // Mute/unmute music
            if (isMuted) {
                audio.muted = false;
                isMuted = false;
                console.log('🎵 Music unmuted');
            } else {
                audio.muted = true;
                isMuted = true;
                console.log('🔇 Music muted');
            }
            updateButtonState();
        }
    });
    
    // Handle first user interaction on any element
    const handleAnyClick = (e) => {
        if (!hasUserInteracted && e.target !== toggleButton) {
            handleFirstInteraction();
        }
    };
    
    document.addEventListener('click', handleAnyClick);
    document.addEventListener('keydown', handleAnyClick);
    document.addEventListener('touchstart', handleAnyClick);
    
    // Audio event handlers
    audio.addEventListener('loadeddata', () => {
        console.log('✅ Audio loaded successfully');
    });
    
    audio.addEventListener('canplay', () => {
        console.log('✅ Audio ready to play');
        // Try autoplay when ready
        if (!hasUserInteracted) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    hasUserInteracted = true;
                    updateButtonState();
                    console.log('🎵 Autoplay successful!');
                }).catch(error => {
                    console.log('Autoplay blocked:', error.message);
                    updateButtonState();
                });
            }
        }
    });
    
    audio.addEventListener('play', () => {
        console.log('▶️ Audio started playing');
        isPlaying = true;
        updateButtonState();
    });
    
    audio.addEventListener('pause', () => {
        console.log('⏸️ Audio paused');
        isPlaying = false;
        updateButtonState();
    });
    
    audio.addEventListener('ended', () => {
        console.log('🔄 Audio ended, restarting...');
        // Should not happen due to loop attribute, but just in case
        audio.currentTime = 0;
        audio.play();
    });
    
    audio.addEventListener('error', (e) => {
        console.error('❌ Audio error:', e);
        console.error('Make sure assets/birthdaysong.mp3 exists');
        // Hide music button if there's an error
        toggleButton.style.display = 'none';
    });
    
    audio.addEventListener('volumechange', () => {
        console.log(`🔊 Volume: ${Math.round(audio.volume * 100)}%`);
    });
    
    // Initialize button state
    updateButtonState();
    
    console.log('🎵 Background music system initialized');
}
