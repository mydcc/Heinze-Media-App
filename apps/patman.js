<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pacman</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Press Start 2P', cursive;
            background-color: #000;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            overflow: hidden; 
        }
        #gameCanvas {
            border: 5px solid #0000FF; 
            background-color: #111; 
            border-radius: 10px;
            box-shadow: 0 0 20px #FFFF00, 0 0 30px #0000FF; 
        }
        .controls, .info {
            margin-top: 10px; 
            text-align: center;
        }
        .info span {
            margin: 0 10px; 
            font-size: 1.1em; 
        }
        #levelDisplay {
            font-size: 1.1em;
            color: #00FF00; 
            margin-bottom: 5px;
        }
        .button {
            background-color: #FFFF00; 
            color: #000000; 
            border: 2px solid #fff;
            padding: 8px 15px; 
            margin: 3px;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Press Start 2P', cursive;
            transition: background-color 0.3s, transform 0.1s;
        }
        .button:hover {
            background-color: #FFD700; 
        }
        .button:active {
            transform: scale(0.95);
        }
        .button:disabled {
            background-color: #555500;
            cursor: not-allowed;
        }
        #touch-controls {
            display: none; 
            margin-top: 10px;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            width: 180px; 
        }
        #touch-controls .button {
            width: 100%;
            height: 45px;
            font-size: 1.3em;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .arrow-up::before { content: "↑"; }
        .arrow-down::before { content: "↓"; }
        .arrow-left::before { content: "←"; }
        .arrow-right::before { content: "→"; }

        #message-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0,0,0,0.85);
            color: #FFFF00;
            padding: 25px;
            border-radius: 15px;
            border: 3px solid #FFFF00;
            text-align: center;
            z-index: 100;
            font-size: 1.1em; 
            display: none; 
            min-width: 280px;
            max-width: 85vw; 
            box-shadow: 0 0 15px #FFFF00;
        }
        #message-box button {
            margin-top: 15px;
        }
         #ghostTimerDisplay {
            margin-top: 5px;
            font-size: 0.8em;
            color: #FFB8FF; 
        }
        @media (max-width: 600px) {
            #gameCanvas { width: 95vw; height: auto; }
            .info span { font-size: 0.9em; margin: 0 5px;}
            #levelDisplay { font-size: 0.9em; }
            #touch-controls { display: grid; width: 150px; gap: 5px;}
            #touch-controls .button { height: 40px; font-size: 1.2em;}
            .button { padding: 6px 12px; font-size: 0.9em;}
            #message-box { font-size: 0.9em; padding: 10px; min-width: 75vw;}
        }
    </style>
</head>
<body class="bg-black flex flex-col items-center justify-center min-h-screen p-2">

    <div id="levelDisplay" class="text-center">Level: 1</div>
    <div class="info mb-2 text-center">
        <span id="score" class="text-yellow-400">Score: 0</span>
        <span id="lives" class="text-red-500">Lives: 3</span>
    </div>
    <div id="ghostTimerDisplay" class="text-center">Ghosts start in: 20s</div>


    <canvas id="gameCanvas"></canvas>

    <div id="touch-controls" class="grid grid-cols-3 gap-2 mt-2">
        <div></div> <button id="touch-up" class="button arrow-up"></button>
        <div></div> <button id="touch-left" class="button arrow-left"></button>
        <div></div> <button id="touch-right" class="button arrow-right"></button>
        <div></div> <button id="touch-down" class="button arrow-down"></button>
        <div></div> 
    </div>

    <div class="controls mt-2 text-center">
        <button id="startButton" class="button">Start Game</button>
        <button id="pauseButton" class="button">Pause</button>
    </div>
    <div id="message-box" class="hidden">
        <p id="message-text"></p>
        <button id="message-button" class="button">OK</button>
    </div>

    <script>
        let canvas, ctx, scoreEl, livesEl, levelDisplayEl, startButton, pauseButton, ghostTimerDisplayEl, messageBox, messageText, messageButton, touchUpButton, touchDownButton, touchLeftButton, touchRightButton;

        const TILE_SIZE = 20; 
        let COLS, ROWS; 
        const WALL_COLOR = '#0000FF'; 
        const PELLET_COLOR = '#FFFF00'; 
        const POWER_PELLET_COLOR = '#FFA500'; 
        const PACMAN_COLOR = '#FFFF00'; 
        const GHOST_COLORS = ['#FF0000', '#FFB8FF', '#00FFFF', '#FFB852']; 
        
        let map = []; 
        let currentMapBaseConfig = []; 
        let allLevelBaseConfigs = []; 

        let pacman = {
            x: 0, y: 0, dx: 0, dy: 0,
            radius: TILE_SIZE / 2 - 2,
            angle1: 0.25 * Math.PI, angle2: 1.75 * Math.PI,
            mouthOpen: true, speed: TILE_SIZE / 12, 
            nextDx: 0, nextDy: 0, isRespawning: false 
        };

        let ghosts = [];
        const GHOST_SPEED = TILE_SIZE / 32;
        let frightenedMode = false;
        let frightenedTimer = 0;
        const FRIGHTENED_DURATION = 7000; 

        let score = 0;
        let lives = 3;
        let pelletsCount = 0;
        let gameRunning = false;
        let gamePaused = false;
        let gameOver = false;
        let currentRequestAnimationFrame;
        let currentLevelIndex = 0; 

        const GHOST_RELEASE_DELAY = 20000; 
        let ghostReleaseTimer = GHOST_RELEASE_DELAY;
        let ghostsActive = false;
        
        const gameOverMessages = [
            "GAME OVER! The ghosts got you. Try again?", "GAME OVER! You were brave, but they were faster this time.",
            "GAME OVER! Don't give up, Pac-Hero! Your high score awaits.", "GAME OVER! The pellets are gone and the ghosts are celebrating.", 
            "GAME OVER! Ouch! That looked painful. One more go!", "GAME OVER! You gave it your all! Time for a rematch."
        ];
        const winMessages = [
            "YOU WIN! All pellets munched! You are a true Pac-Champion!", "YOU WIN! Fantastic! The ghosts look pale with envy.",
            "YOU WIN! Incredible performance! New high score?", "YOU WIN! You've mastered the maze! Ready for the next round?",
            "YOU WIN! Superb! You are the king of the pellets!", "YOU WIN! Perfect run! The ghosts didn't stand a chance."
        ];
        const lostLifeMessages = [
            "Ouch! That was close. Try again!", "One life down! But you've got more!", "Ghost fodder! Show 'em next time!",
            "Whoops! Don't lose heart, Pac-Fighter!", "Not over yet! Go get those dots!", "Careful! The ghosts are hungry!",
            "Just a scratch! Shake it off and keep going!", "Almost gotcha! Stay nimble!", "The maze is tricky! New attempt!",
            "Oops! Focus up!", "You can do it! Show those ghosts who's boss!", "One life gone, but the high score is calling!",
            "Don't despair, keep chasing!", "The ghosts are lurking! Be smart!", "One more chance! Make it count!",
            "Pac-Power needed! Get it back!"
        ];

        const level1MapLayout = [ 
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],[1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],[1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,2,1],[1,2,2,2,2,1,2,2,2,1,1,2,2,2,1,2,2,2,2,2,1],[1,1,1,1,2,1,1,1,0,1,0,1,0,1,1,1,2,1,1,1,1],[0,0,0,1,2,1,0,5,5,5,5,0,0,0,0,1,2,1,0,0,0],[1,1,1,1,2,1,0,1,1,1,1,1,0,1,0,1,2,1,1,1,1],[1,2,2,2,2,2,0,1,0,0,0,0,0,1,0,2,2,2,2,2,1],[1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1],[0,0,0,1,2,1,0,0,0,0,4,0,0,0,0,1,2,1,0,0,0],[1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],[1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],[1,2,2,1,2,2,2,2,2,2,0,2,2,2,2,2,2,1,2,2,1],[1,1,2,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,2,1,1],[1,2,2,2,2,1,2,2,2,1,1,2,2,2,1,2,2,2,2,2,1],[1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        const level2MapLayout = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,3,2,2,1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,3,1],
            [1,2,1,2,1,2,1,1,1,2,1,2,1,1,1,2,1,2,1,2,1],
            [1,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1],
            [1,2,1,1,1,1,2,1,1,0,5,0,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,2,1,2,1,0,5,5,0,1,2,1,2,2,2,2,2,1],
            [1,1,1,1,2,1,2,1,0,5,5,0,1,2,1,2,1,1,1,1,1],
            [0,0,0,1,2,2,2,1,1,1,1,1,1,2,2,2,1,0,0,0],
            [1,1,1,1,1,1,2,0,0,0,4,0,0,0,2,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,1,2,1,2,1,2,1,2,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,3,1,1,2,1,1,1,1,1,1,1,2,1,1,3,1,1,1],
            [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        const allLevelLayouts = [level1MapLayout, level2MapLayout];
        
        document.addEventListener('DOMContentLoaded', () => {
            canvas = document.getElementById('gameCanvas');
            ctx = canvas.getContext('2d');
            scoreEl = document.getElementById('score');
            livesEl = document.getElementById('lives');
            levelDisplayEl = document.getElementById('levelDisplay');
            startButton = document.getElementById('startButton');
            pauseButton = document.getElementById('pauseButton');
            ghostTimerDisplayEl = document.getElementById('ghostTimerDisplay');
            messageBox = document.getElementById('message-box');
            messageText = document.getElementById('message-text');
            messageButton = document.getElementById('message-button');
            touchUpButton = document.getElementById('touch-up');
            touchDownButton = document.getElementById('touch-down');
            touchLeftButton = document.getElementById('touch-left');
            touchRightButton = document.getElementById('touch-right');

            function resizeCanvas() { 
                const aspectRatio = allLevelLayouts[currentLevelIndex][0].length / allLevelLayouts[currentLevelIndex].length;
                let canvasWidth = window.innerWidth * 0.8; 
                if (window.innerWidth < 600) { canvasWidth = window.innerWidth * 0.95; }
                let canvasHeight = canvasWidth / aspectRatio;
                const maxHeight = window.innerHeight * 0.7;
                if (canvasHeight > maxHeight) { canvasHeight = maxHeight; canvasWidth = canvasHeight * aspectRatio; }
                
                // Ensure ROWS and COLS are set based on the current level before using them for canvas dimensions
                ROWS = allLevelLayouts[currentLevelIndex].length;
                COLS = allLevelLayouts[currentLevelIndex][0].length;

                canvas.width = COLS * TILE_SIZE;
                canvas.height = ROWS * TILE_SIZE;

                // If the canvas size was adjusted by the above logic, ensure it's still a multiple of TILE_SIZE
                // This might be redundant if COLS/ROWS are always derived from the layout.
                canvas.width = Math.floor(canvas.width / TILE_SIZE) * TILE_SIZE;
                canvas.height = Math.floor(canvas.height / TILE_SIZE) * TILE_SIZE;


                if (gameRunning && !gamePaused) draw();
            }

            function generateRandomMapBaseConfig(levelLayoutBlueprint) {
                let newBaseConfig = levelLayoutBlueprint.map(row => row.map(cell => {
                    if (cell === 2 || cell === 3) return 0; 
                    return cell; 
                }));
                
                const currentBlueprintRows = levelLayoutBlueprint.length;
                const currentBlueprintCols = levelLayoutBlueprint[0].length;

                let protectedZonesSpecific = [];
                if (currentLevelIndex === 0) { 
                     protectedZonesSpecific = [ 
                        { yStart: 8, yEnd: 10, xStart: 7, xEnd: 13 }, 
                        { yStart: 7, yEnd: 7, xStart: 10, xEnd: 10 }, 
                        { yStart: 12, yEnd: 12, xStart: 10, xEnd: 10} 
                    ];
                } else if (currentLevelIndex === 1) { 
                     protectedZonesSpecific = [
                        { yStart: 4, yEnd: 6, xStart: 9, xEnd: 11 }, 
                        { yStart: 8, yEnd: 8, xStart: 10, xEnd: 10}  
                    ];
                }

                function isProtected(y, x) {
                    for (const zone of protectedZonesSpecific) {
                        if (y >= zone.yStart && y <= zone.yEnd && x >= zone.xStart && x <= zone.xEnd) return true;
                    }
                    if (y < currentBlueprintRows && x < currentBlueprintCols && (levelLayoutBlueprint[y][x] === 4 || levelLayoutBlueprint[y][x] === 5)) return true;
                    if (y === 0 || y === currentBlueprintRows - 1 || x === 0 || x === currentBlueprintCols - 1) return true;
                    return false;
                }
                
                for (let y = 1; y < currentBlueprintRows - 1; y++) {
                    for (let x = 1; x < currentBlueprintCols - 1; x++) {
                        if (isProtected(y, x)) continue;
                        if (newBaseConfig[y][x] === 1) { 
                            if (Math.random() < 0.15) newBaseConfig[y][x] = 0;
                        } else if (newBaseConfig[y][x] === 0) { 
                            let wallNeighbors = 0;
                            if (y > 0 && newBaseConfig[y-1][x] === 1) wallNeighbors++;
                            if (y < currentBlueprintRows - 1 && newBaseConfig[y+1][x] === 1) wallNeighbors++;
                            if (x > 0 && newBaseConfig[y][x-1] === 1) wallNeighbors++;
                            if (x < currentBlueprintCols - 1 && newBaseConfig[y][x+1] === 1) wallNeighbors++;
                            if (wallNeighbors < 3 && Math.random() < 0.05) newBaseConfig[y][x] = 1;
                        }
                    }
                }
                for (let y = 0; y < currentBlueprintRows; y++) {
                    for (let x = 0; x < currentBlueprintCols; x++) {
                        if (levelLayoutBlueprint[y][x] === 4) newBaseConfig[y][x] = 4;
                        if (levelLayoutBlueprint[y][x] === 5) newBaseConfig[y][x] = 5;
                    }
                }
                return newBaseConfig;
            }

            function initializeLevel(levelIdx) {
                currentLevelIndex = levelIdx;
                levelDisplayEl.textContent = `Level: ${currentLevelIndex + 1}`;
                
                if (!allLevelBaseConfigs[currentLevelIndex]) {
                     allLevelBaseConfigs[currentLevelIndex] = generateRandomMapBaseConfig(allLevelLayouts[currentLevelIndex]);
                }
                currentMapBaseConfig = allLevelBaseConfigs[currentLevelIndex];

                map = JSON.parse(JSON.stringify(currentMapBaseConfig)); 
                pelletsCount = 0;
                ghosts = []; 
                let ghostSpawnPointsFound = [];
                
                ROWS = currentMapBaseConfig.length;
                COLS = currentMapBaseConfig[0].length;
                canvas.width = COLS * TILE_SIZE;
                canvas.height = ROWS * TILE_SIZE;

                for (let y = 0; y < ROWS; y++) {
                    for (let x = 0; x < COLS; x++) {
                        if (map[y][x] === 0) { map[y][x] = 2; pelletsCount++; } 
                        else if (map[y][x] === 2 || map[y][x] === 3) { map[y][x] = 2; pelletsCount++;} 
                        else if (map[y][x] === 4) { pacman.x = x * TILE_SIZE + TILE_SIZE / 2; pacman.y = y * TILE_SIZE + TILE_SIZE / 2; map[y][x] = 0; } 
                        else if (map[y][x] === 5) { ghostSpawnPointsFound.push({x: x * TILE_SIZE + TILE_SIZE / 2, y: y * TILE_SIZE + TILE_SIZE / 2}); map[y][x] = 0; }
                    }
                }
                for (let y = 0; y < ROWS; y++) {
                    for (let x = 0; x < COLS; x++) {
                        if (map[y][x] === 0) { map[y][x] = 2; pelletsCount++; }
                    }
                }
                const powerPelletLocations = [ 
                    {y:2, x:1}, {y:2, x:COLS-2}, 
                    {y:ROWS-3, x:1}, {y:ROWS-3, x:COLS-2} 
                ];
                powerPelletLocations.forEach(loc => {
                    if (loc.y >= 0 && loc.y < ROWS && loc.x >=0 && loc.x < COLS && map[loc.y][loc.x] === 2) {
                         map[loc.y][loc.x] = 3;
                    }
                });
                
                const numberOfGhostsToCreate = Math.min(ghostSpawnPointsFound.length, GHOST_COLORS.length, 4);
                for(let i = 0; i < numberOfGhostsToCreate; i++) {
                     if(ghostSpawnPointsFound[i]) { 
                        ghosts.push({
                            x: ghostSpawnPointsFound[i].x, y: ghostSpawnPointsFound[i].y, dx: 0, dy: 0,
                            radius: TILE_SIZE / 2 - 2, color: GHOST_COLORS[i], speed: GHOST_SPEED, 
                            isFrightened: false, isReturning: false, lastMoveDir: null 
                        });
                    }
                }
                pacman.dx = 0; pacman.dy = 0; pacman.nextDx = 0; pacman.nextDy = 0; pacman.isRespawning = false;
                frightenedMode = false; frightenedTimer = 0; 
                ghostReleaseTimer = GHOST_RELEASE_DELAY; 
                ghostsActive = false;
                updateGhostTimerDisplay(); 
                updateUI(); 
            }

            function resetPacmanAndGhostsForLifeLost() { 
                const baseConfigForCurrentLevel = allLevelBaseConfigs[currentLevelIndex];
                for (let y = 0; y < baseConfigForCurrentLevel.length; y++) {
                    for (let x = 0; x < baseConfigForCurrentLevel[0].length; x++) {
                        if (baseConfigForCurrentLevel[y][x] === 4) { 
                            pacman.x = x * TILE_SIZE + TILE_SIZE / 2; 
                            pacman.y = y * TILE_SIZE + TILE_SIZE / 2; 
                            break; 
                        }
                    }
                }
                pacman.dx = 0; pacman.dy = 0; pacman.nextDx = 0; pacman.nextDy = 0;
                let ghostSpawnPoints = [];
                 for (let y = 0; y < baseConfigForCurrentLevel.length; y++) {
                    for (let x = 0; x < baseConfigForCurrentLevel[0].length; x++) {
                         if (baseConfigForCurrentLevel[y][x] === 5) ghostSpawnPoints.push({x: x * TILE_SIZE + TILE_SIZE / 2, y: y * TILE_SIZE + TILE_SIZE / 2});
                    }
                }
                ghosts.forEach((ghost, index) => {
                    const spawnPoint = ghostSpawnPoints[index % ghostSpawnPoints.length]; 
                    if (spawnPoint) { ghost.x = spawnPoint.x; ghost.y = spawnPoint.y; } 
                    else { ghost.x = (COLS / 2) * TILE_SIZE + TILE_SIZE / 2; ghost.y = (ROWS / 2) * TILE_SIZE + TILE_SIZE / 2; }
                    ghost.dx = 0; ghost.dy = 0; ghost.isFrightened = false; ghost.isReturning = false; ghost.lastMoveDir = null;
                });
                frightenedMode = false; frightenedTimer = 0;
                updateGhostTimerDisplay(); 
            }

            function startGame() { 
                if (startButton.textContent === "Start Game" || gameOver) { 
                    currentLevelIndex = 0; 
                    allLevelBaseConfigs = []; 
                    allLevelBaseConfigs[currentLevelIndex] = generateRandomMapBaseConfig(allLevelLayouts[currentLevelIndex]);
                } else { 
                     allLevelBaseConfigs[currentLevelIndex] = generateRandomMapBaseConfig(allLevelLayouts[currentLevelIndex]);
                }
                
                initializeLevel(currentLevelIndex); 
                
                score = 0; 
                lives = 3; 
                updateUI(); 
                pacman.isRespawning = false; gameRunning = true; gamePaused = false; gameOver = false; 
                startButton.textContent = "Restart Game"; pauseButton.textContent = "Pause"; pauseButton.disabled = false; 
                hideMessage(); 
                if (currentRequestAnimationFrame) { cancelAnimationFrame(currentRequestAnimationFrame); currentRequestAnimationFrame = null; }
                gameLoop(); 
            }
            function togglePause() { 
                if (!gameRunning || gameOver) return; 
                gamePaused = !gamePaused;
                if (gamePaused) {
                    pauseButton.textContent = "Resume"; showMessage("Paused", false); 
                    if (currentRequestAnimationFrame) { cancelAnimationFrame(currentRequestAnimationFrame); currentRequestAnimationFrame = null; }
                } else {
                    pauseButton.textContent = "Pause"; hideMessage();
                    if (!currentRequestAnimationFrame) gameLoop(); 
                }
            }
            function updateUI() { scoreEl.textContent = `Score: ${score}`; livesEl.textContent = `Lives: ${lives}`; }
            function updateGhostTimerDisplay() { 
                if (!ghostsActive && gameRunning && !gamePaused) {
                    ghostTimerDisplayEl.textContent = `Ghosts start in: ${Math.ceil(ghostReleaseTimer / 1000)}s`;
                    ghostTimerDisplayEl.classList.remove('hidden');
                } else if (ghostsActive || !gameRunning) {
                    ghostTimerDisplayEl.classList.add('hidden');
                }
            }
            function drawWall(x, y) { ctx.fillStyle = WALL_COLOR; ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE); }
            function drawPellet(x, y) { ctx.beginPath(); ctx.arc(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE / 5, 0, Math.PI * 2); ctx.fillStyle = PELLET_COLOR; ctx.fill(); ctx.closePath(); }
            function drawPowerPellet(x, y) { ctx.beginPath(); ctx.arc(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE / 3, 0, Math.PI * 2); ctx.fillStyle = POWER_PELLET_COLOR; ctx.fill(); ctx.closePath(); }
            
            function drawPacman() {
                const oA1 = 0.25 * Math.PI; const oA2 = 1.75 * Math.PI;
                let tA1 = oA1; let tA2 = oA2;
                if (pacman.mouthOpen) { tA1 = 0.25 * Math.PI; tA2 = 1.75 * Math.PI; } 
                else { tA1 = 0.05 * Math.PI; tA2 = 1.95 * Math.PI; }
                let dDx = pacman.dx; let dDy = pacman.dy;
                if (pacman.dx === 0 && pacman.dy === 0 && (pacman.nextDx !== 0 || pacman.nextDy !== 0)) { dDx = pacman.nextDx; dDy = pacman.nextDy; }
                if (dDx > 0) {} else if (dDx < 0) { tA1 += Math.PI; tA2 += Math.PI; } 
                else if (dDy > 0) { tA1 += 0.5 * Math.PI; tA2 += 0.5 * Math.PI; } 
                else if (dDy < 0) { tA1 -= 0.5 * Math.PI; tA2 -= 0.5 * Math.PI; }
                ctx.beginPath(); ctx.arc(pacman.x, pacman.y, pacman.radius, tA1, tA2);
                ctx.lineTo(pacman.x, pacman.y); ctx.fillStyle = PACMAN_COLOR; ctx.fill(); ctx.closePath();
                ctx.fillStyle = 'black'; let eX = pacman.x; let eY = pacman.y;
                const eO = pacman.radius * 0.4; const eR = pacman.radius * 0.15;
                if (dDx > 0) { eX += eO / 2; eY -= eO; } 
                else if (dDx < 0) { eX -= eO / 2; eY -= eO; } 
                else if (dDy > 0) { eX += eO; eY -= eO / 2; } 
                else if (dDy < 0) { eX -= eO; eY += eO / 2; } 
                else { eX += eO / 2; eY -= eO; }
                ctx.beginPath(); ctx.arc(eX, eY, eR, 0, Math.PI * 2); ctx.fill(); ctx.closePath();
            }

            function drawGhost(ghost) {
                ctx.beginPath(); ctx.arc(ghost.x, ghost.y, ghost.radius, Math.PI, 0);
                ctx.lineTo(ghost.x + ghost.radius, ghost.y + ghost.radius * 0.8);
                const nS = 5; 
                for (let i = 0; i < nS; i++) { ctx.lineTo(ghost.x + ghost.radius - (i * (2 * ghost.radius / nS)), ghost.y + ghost.radius * (i % 2 === 0 ? 0.8 : 1.2)); }
                ctx.lineTo(ghost.x - ghost.radius, ghost.y + ghost.radius * 0.8); ctx.closePath();
                if (ghost.isFrightened) { ctx.fillStyle = '#0000FF'; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2; ctx.stroke(); } 
                else if (ghost.isReturning) { ctx.fillStyle = '#888888'; } else { ctx.fillStyle = ghost.color; }
                ctx.fill();
                ctx.fillStyle = 'white'; const eR = ghost.radius * 0.3; const eOX = ghost.radius * 0.4; const eOY = ghost.radius * 0.3;
                ctx.beginPath(); ctx.arc(ghost.x - eOX, ghost.y - eOY, eR, 0, Math.PI * 2); ctx.arc(ghost.x + eOX, ghost.y - eOY, eR, 0, Math.PI * 2); ctx.fill(); ctx.closePath();
                ctx.fillStyle = 'black'; const pR = eR * 0.5; let pSX = 0; let pSY = 0; 
                if (!ghost.isReturning) { const ang = Math.atan2(pacman.y - ghost.y, pacman.x - ghost.x); pSX = Math.cos(ang) * pR * 0.8; pSY = Math.sin(ang) * pR * 0.8; }
                ctx.beginPath(); ctx.arc(ghost.x - eOX + pSX, ghost.y - eOY + pSY, pR, 0, Math.PI * 2); ctx.arc(ghost.x + eOX + pSX, ghost.y - eOY + pSY, pR, 0, Math.PI * 2); ctx.fill(); ctx.closePath();
            }

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#111'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) { if (map[y][x] === 1) drawWall(x, y); else if (map[y][x] === 2) drawPellet(x, y); else if (map[y][x] === 3) drawPowerPellet(x, y); }
                drawPacman(); ghosts.forEach(drawGhost);
            }

            function isWall(gX, gY) { if (gX < 0 || gX >= COLS || gY < 0 || gY >= ROWS) return true; return map[gY] && map[gY][gX] === 1; }
            function handleTunnel(e) { if (e.x < -e.radius && e.dx < 0) e.x = canvas.width + e.radius; else if (e.x > canvas.width + e.radius && e.dx > 0) e.x = -e.radius; if (e.y < -e.radius && e.dy < 0) e.y = canvas.height + e.radius; else if (e.y > canvas.height + e.radius && e.dy > 0) e.y = -e.radius; }
            
            function updatePacman() {
                const pGX = Math.floor(pacman.x / TILE_SIZE); const pGY = Math.floor(pacman.y / TILE_SIZE);
                const aT = pacman.speed * 0.9; 
                if (pacman.nextDx !== 0 || pacman.nextDy !== 0) {
                    let sD = false; const iCS = (pacman.dx === 0 && pacman.dy === 0);
                    if (pacman.nextDx !== 0) {
                        const cTH = iCS || (Math.abs(pacman.y - (pGY * TILE_SIZE + TILE_SIZE / 2)) < aT);
                        if (cTH) { if (!isWall(pGX + Math.sign(pacman.nextDx), pGY)) { pacman.y = pGY * TILE_SIZE + TILE_SIZE / 2; pacman.dx = pacman.nextDx; pacman.dy = 0; pacman.nextDx = 0; pacman.nextDy = 0; sD = true; } else if (iCS) pacman.nextDx = 0; }
                    }
                    if (!sD && pacman.nextDy !== 0) {
                        const cTV = iCS || (Math.abs(pacman.x - (pGX * TILE_SIZE + TILE_SIZE / 2)) < aT);
                        if (cTV) { if (!isWall(pGX, pGY + Math.sign(pacman.nextDy))) { pacman.x = pGX * TILE_SIZE + TILE_SIZE / 2; pacman.dy = pacman.nextDy; pacman.dx = 0; pacman.nextDx = 0; pacman.nextDy = 0; } else if (iCS) pacman.nextDy = 0; }
                    }
                }
                let pNX = pacman.x + pacman.dx; let pNY = pacman.y + pacman.dy;
                const cM = 0.01; 
                if (pacman.dx !== 0) {
                    let lX = pacman.dx > 0 ? pacman.x + pacman.radius + pacman.dx : pacman.x - pacman.radius + pacman.dx;
                    const lGX = Math.floor(lX / TILE_SIZE);
                    const tY = Math.floor((pacman.y - pacman.radius * 0.9) / TILE_SIZE); const mY = Math.floor(pacman.y / TILE_SIZE); const bY = Math.floor((pacman.y + pacman.radius * 0.9) / TILE_SIZE);
                    if (isWall(lGX, tY) || isWall(lGX, mY) || isWall(lGX, bY)) { pNX = pacman.dx > 0 ? lGX * TILE_SIZE - pacman.radius - cM : (lGX + 1) * TILE_SIZE + pacman.radius + cM; pacman.dx = 0; }
                }
                if (pacman.dy !== 0) {
                    let lY = pacman.dy > 0 ? pacman.y + pacman.radius + pacman.dy : pacman.y - pacman.radius + pacman.dy;
                    const lGY = Math.floor(lY / TILE_SIZE);
                    const lXG = Math.floor((pacman.x - pacman.radius * 0.9) / TILE_SIZE); const mXG = Math.floor(pacman.x / TILE_SIZE); const rXG = Math.floor((pacman.x + pacman.radius * 0.9) / TILE_SIZE);
                    if (isWall(lXG, lGY) || isWall(mXG, lGY) || isWall(rXG, lGY)) { pNY = pacman.dy > 0 ? lGY * TILE_SIZE - pacman.radius - cM : (lGY + 1) * TILE_SIZE + pacman.radius + cM; pacman.dy = 0; }
                }
                pacman.x = pNX; pacman.y = pNY; handleTunnel(pacman);
                const fPGX = Math.floor(pacman.x / TILE_SIZE); const fPGY = Math.floor(pacman.y / TILE_SIZE);
                if (fPGY >= 0 && fPGY < ROWS && fPGX >= 0 && fPGX < COLS) {
                    if (map[fPGY][fPGX] === 2) { map[fPGY][fPGX] = 0; score += 10; pelletsCount--; updateUI(); } 
                    else if (map[fPGY][fPGX] === 3) { map[fPGY][fPGX] = 0; score += 50; pelletsCount--; activateFrightenedMode(); updateUI(); }
                }
                if (pacman.dx !== 0 || pacman.dy !== 0) pacman.mouthOpen = !pacman.mouthOpen;
            }

            function activateFrightenedMode() { frightenedMode = true; frightenedTimer = FRIGHTENED_DURATION; ghosts.forEach(g => { g.isFrightened = true; g.dx *= -1; g.dy *= -1; }); }
            
            function updateGhosts() {
                if (!ghostsActive) return;
                if (frightenedMode) {
                    frightenedTimer -= 1000 / 60;
                    if (frightenedTimer <= 0) {
                        frightenedMode = false;
                        ghosts.forEach(g => { g.isFrightened = false; g.isReturning = false; });
                    }
                }
                ghosts.forEach(ghost => {
                    if (ghost.isReturning) {
                        let spawnPoint;
                        const currentLevelBlueprint = allLevelLayouts[currentLevelIndex];
                        for (let r = 0; r < currentLevelBlueprint.length; r++) { 
                            for (let c = 0; c < currentLevelBlueprint[0].length; c++) 
                                if (currentLevelBlueprint[r][c] === 5) { 
                                    spawnPoint = { x: c * TILE_SIZE + TILE_SIZE / 2, y: r * TILE_SIZE + TILE_SIZE / 2 }; 
                                    break; 
                                } 
                            if (spawnPoint) break; 
                        }
                        if (spawnPoint) {
                            const targetX = spawnPoint.x; const targetY = spawnPoint.y;
                            const angle = Math.atan2(targetY - ghost.y, targetX - ghost.x);
                            ghost.dx = Math.cos(angle) * ghost.speed * 1.5;
                            ghost.dy = Math.sin(angle) * ghost.speed * 1.5;
                            if (Math.hypot(ghost.x - targetX, ghost.y - targetY) < TILE_SIZE / 2) { ghost.isReturning = false; ghost.isFrightened = false; ghost.x = targetX; ghost.y = targetY; ghost.dx = 0; ghost.dy = 0; ghost.lastMoveDir = null; }
                        }
                    } else {
                        const ghostGridX = Math.floor(ghost.x / TILE_SIZE); const ghostGridY = Math.floor(ghost.y / TILE_SIZE);
                        const currentSpeed = ghost.isFrightened ? ghost.speed * 0.75 : ghost.speed;
                        const onGridCenter = Math.abs(ghost.x - (ghostGridX * TILE_SIZE + TILE_SIZE / 2)) < currentSpeed * 0.5 && Math.abs(ghost.y - (ghostGridY * TILE_SIZE + TILE_SIZE / 2)) < currentSpeed * 0.5;
                        let possibleMoves = [];
                        if (onGridCenter || (ghost.dx === 0 && ghost.dy === 0)) {
                            if (!isWall(ghostGridX, ghostGridY - 1) && ghost.lastMoveDir !== 'down') possibleMoves.push({ dx: 0, dy: -currentSpeed, dir: 'up' });
                            if (!isWall(ghostGridX, ghostGridY + 1) && ghost.lastMoveDir !== 'up') possibleMoves.push({ dx: 0, dy: currentSpeed, dir: 'down' });
                            if (!isWall(ghostGridX - 1, ghostGridY) && ghost.lastMoveDir !== 'right') possibleMoves.push({ dx: -currentSpeed, dy: 0, dir: 'left' });
                            if (!isWall(ghostGridX + 1, ghostGridY) && ghost.lastMoveDir !== 'left') possibleMoves.push({ dx: currentSpeed, dy: 0, dir: 'right' });
                            if (possibleMoves.length > 0) {
                                let chosenMove;
                                if (ghost.isFrightened) {
                                    let maxDist = -Infinity;
                                    possibleMoves.forEach(move => { const nextGhostX = ghost.x + move.dx * 5; const nextGhostY = ghost.y + move.dy * 5; const dist = Math.hypot(nextGhostX - pacman.x, nextGhostY - pacman.y); if (dist > maxDist) { maxDist = dist; chosenMove = move; } });
                                } else { chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]; }
                                if (chosenMove) { ghost.dx = chosenMove.dx; ghost.dy = chosenMove.dy; ghost.lastMoveDir = chosenMove.dir; ghost.x = ghostGridX * TILE_SIZE + TILE_SIZE / 2; ghost.y = ghostGridY * TILE_SIZE + TILE_SIZE / 2; }
                            } else if (ghost.lastMoveDir) {
                                if (ghost.lastMoveDir === 'up' && !isWall(ghostGridX, ghostGridY + 1)) { ghost.dx = 0; ghost.dy = currentSpeed; ghost.lastMoveDir = 'down'; }
                                else if (ghost.lastMoveDir === 'down' && !isWall(ghostGridX, ghostGridY - 1)) { ghost.dx = 0; ghost.dy = -currentSpeed; ghost.lastMoveDir = 'up'; }
                                else if (ghost.lastMoveDir === 'left' && !isWall(ghostGridX + 1, ghostGridY)) { ghost.dx = currentSpeed; ghost.dy = 0; ghost.lastMoveDir = 'right'; }
                                else if (ghost.lastMoveDir === 'right' && !isWall(ghostGridX - 1, ghostGridY)) { ghost.dx = -currentSpeed; ghost.dy = 0; ghost.lastMoveDir = 'left'; }
                            }
                        }
                    }
                    let potentialGhostNextX = ghost.x + ghost.dx; let potentialGhostNextY = ghost.y + ghost.dy;
                    const collisionMargin = 0.1; 
                    if (ghost.dx !== 0) {
                        const nextGridX = Math.floor((potentialGhostNextX + Math.sign(ghost.dx) * ghost.radius) / TILE_SIZE);
                        if (isWall(nextGridX, Math.floor(ghost.y / TILE_SIZE))) { potentialGhostNextX = ghost.dx > 0 ? nextGridX * TILE_SIZE - ghost.radius - collisionMargin : (nextGridX + 1) * TILE_SIZE + ghost.radius + collisionMargin; ghost.dx = 0; ghost.dy = 0; }
                    }
                    if (ghost.dy !== 0) {
                        const nextGridY = Math.floor((potentialGhostNextY + Math.sign(ghost.dy) * ghost.radius) / TILE_SIZE);
                        if (isWall(Math.floor(ghost.x / TILE_SIZE), nextGridY)) { potentialGhostNextY = ghost.dy > 0 ? nextGridY * TILE_SIZE - ghost.radius - collisionMargin : (nextGridY + 1) * TILE_SIZE + ghost.radius + collisionMargin; ghost.dx = 0; ghost.dy = 0; }
                    }
                    ghost.x = potentialGhostNextX; ghost.y = potentialGhostNextY;
                    handleTunnel(ghost);
                    const dist = Math.hypot(pacman.x - ghost.x, pacman.y - ghost.y);
                    if (dist < pacman.radius + ghost.radius) {
                        if (ghost.isFrightened && !ghost.isReturning) { score += 200; ghost.isReturning = true; ghost.isFrightened = false; updateUI(); } 
                        else if (!ghost.isReturning && !frightenedMode) { handlePacmanDeath(); }
                    }
                });
            }
            
            function handlePacmanDeath() {
                if (pacman.isRespawning || !gameRunning || gameOver) return;
                pacman.isRespawning = true;
                lives--; updateUI(); frightenedMode = false;
                ghosts.forEach(g => { g.isFrightened = false; g.isReturning = false; });
                if (currentRequestAnimationFrame) { cancelAnimationFrame(currentRequestAnimationFrame); currentRequestAnimationFrame = null; }
                if (lives <= 0) {
                    gameOver = true; gameRunning = false;
                    const rM = gameOverMessages[Math.floor(Math.random() * gameOverMessages.length)];
                    showMessage(`${rM} Score: ${score}`, true, () => { pacman.isRespawning = false; startGame(); });
                    startButton.textContent = "New Game"; pauseButton.disabled = true;
                } else {
                    gamePaused = true;
                    const rM = lostLifeMessages[Math.floor(Math.random() * lostLifeMessages.length)];
                    showMessage(`${rM} (${lives} lives left)`, true, () => {
                        resetPacmanAndGhostsForLifeLost(); 
                        pacman.isRespawning = false; gamePaused = false; hideMessage();
                        if (!gameOver) { 
                            gameRunning = true; 
                            if (!currentRequestAnimationFrame) gameLoop(); 
                        }
                    });
                }
            }

            function checkWinCondition() {
                if (pelletsCount === 0 && gameRunning) {
                    gameRunning = false; 
                    if (currentRequestAnimationFrame) { cancelAnimationFrame(currentRequestAnimationFrame); currentRequestAnimationFrame = null; }
                    
                    currentLevelIndex++;
                    if (currentLevelIndex < allLevelLayouts.length) { 
                        showMessage(`Level ${currentLevelIndex} Cleared! Next level...`, true, () => {
                            if (!allLevelBaseConfigs[currentLevelIndex]) {
                                allLevelBaseConfigs[currentLevelIndex] = generateRandomMapBaseConfig(allLevelLayouts[currentLevelIndex]);
                            }
                            initializeLevel(currentLevelIndex); 
                            
                            pacman.isRespawning = false;
                            gameRunning = true;
                            gamePaused = false;
                            gameOver = false; 
                            if (currentRequestAnimationFrame) { cancelAnimationFrame(currentRequestAnimationFrame); currentRequestAnimationFrame = null; }
                            gameLoop();
                        });
                    } else { 
                        gameOver = true;
                        const randomWinMsg = winMessages[Math.floor(Math.random() * winMessages.length)];
                        showMessage(`${randomWinMsg} Final Score: ${score}`, true, () => {
                            pacman.isRespawning = false;
                            startGame(); 
                        });
                        startButton.textContent = "New Game";
                        pauseButton.disabled = true;
                    }
                }
            }

            function gameLoop() {
                if (pacman.isRespawning) { if (currentRequestAnimationFrame) requestAnimationFrame(gameLoop); return; }
                if (gamePaused || !gameRunning || gameOver) {
                    if (gameOver || (gamePaused && messageBox.style.display === 'block')) { draw(); }
                    if (gameOver && currentRequestAnimationFrame) { cancelAnimationFrame(currentRequestAnimationFrame); currentRequestAnimationFrame = null; }
                    return;
                }
                if (!ghostsActive && gameRunning && !gamePaused) {
                    ghostReleaseTimer -= 1000 / 60; updateGhostTimerDisplay();
                    if (ghostReleaseTimer <= 0) { ghostsActive = true; ghostTimerDisplayEl.classList.add('hidden'); }
                }
                updatePacman(); updateGhosts(); draw(); checkWinCondition();
                if (gameRunning && !gameOver) { currentRequestAnimationFrame = requestAnimationFrame(gameLoop); } 
                else if (currentRequestAnimationFrame) { cancelAnimationFrame(currentRequestAnimationFrame); currentRequestAnimationFrame = null; }
            }

            function showMessage(text, showBtn = true, btnAction = hideMessage) {
                messageText.innerHTML = text;
                if (showBtn) { messageButton.style.display = 'inline-block'; messageButton.onclick = btnAction; } 
                else { messageButton.style.display = 'none'; }
                messageBox.classList.remove('hidden'); messageBox.style.display = 'block';
            }

            function hideMessage() {
                messageBox.classList.add('hidden'); messageBox.style.display = 'none';
            }
            
            window.addEventListener('resize', resizeCanvas); 
            resizeCanvas(); 
            allLevelBaseConfigs[currentLevelIndex] = generateRandomMapBaseConfig(allLevelLayouts[currentLevelIndex]);
            initializeLevel(currentLevelIndex); 
            draw(); 
            showMessage("Press Start Game!", true, startGame);

            startButton.addEventListener('click', startGame); 
            pauseButton.addEventListener('click', togglePause);
            pauseButton.disabled = true; 

            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                document.getElementById('touch-controls').style.display = 'grid';
            }

            touchUpButton.addEventListener('click', () => handleTouch('up'));
            touchDownButton.addEventListener('click', () => handleTouch('down'));
            touchLeftButton.addEventListener('click', () => handleTouch('left'));
            touchRightButton.addEventListener('click', () => handleTouch('right'));

            window.addEventListener('keydown', (e) => { 
                if (!(gameRunning || gamePaused) && !(e.key === 'Escape' || e.key === 'p' || e.key === 'P')) { if (!gameOver && startButton.textContent === "Start Game") {} else { return; }}
                if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.key)) e.preventDefault();
                if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') { if ((gameRunning || gamePaused) && !gameOver) togglePause(); return; }
                if (gamePaused || !gameRunning || gameOver || pacman.isRespawning) return; 
                switch (e.key) {
                    case 'ArrowUp': case 'w': case 'W': pacman.nextDx = 0; pacman.nextDy = -pacman.speed; break;
                    case 'ArrowDown': case 's': case 'S': pacman.nextDx = 0; pacman.nextDy = pacman.speed; break;
                    case 'ArrowLeft': case 'a': case 'A': pacman.nextDx = -pacman.speed; pacman.nextDy = 0; break;
                    case 'ArrowRight': case 'd': case 'D': pacman.nextDx = pacman.speed; pacman.nextDy = 0; break;
                }
            });
        }); // End of DOMContentLoaded

        function handleTouch(direction) { 
            if (gamePaused || !gameRunning || gameOver || pacman.isRespawning) return;
            switch (direction) {
                case 'up': pacman.nextDx = 0; pacman.nextDy = -pacman.speed; break;
                case 'down': pacman.nextDx = 0; pacman.nextDy = pacman.speed; break;
                case 'left': pacman.nextDx = -pacman.speed; pacman.nextDy = 0; break;
                case 'right': pacman.nextDx = pacman.speed; pacman.nextDy = 0; break;
            }
        }
    </script>
</body>
</html>