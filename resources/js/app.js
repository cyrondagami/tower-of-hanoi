const state = {
    diskCount: 5,
    towers: [[], [], []],
    selectedTower: null,
    moveCount: 0,
    isSolving: false,
    solvingTimer: null,
    timerInterval: null,
    startedAt: null,
    isPaused: false,
    elapsedBeforePause: 0,
};

const towerEls = [...document.querySelectorAll('.tower')];
const moveCounterEl = document.querySelector('#move-counter');
const statusTextEl = document.querySelector('#status-text');
const minimumMovesEl = document.querySelector('#minimum-moves');
const diskSelectEl = document.querySelector('#disk-count');
const resetButton = document.querySelector('#reset-button');
const solveButton = document.querySelector('#solve-button');
const resultPanelEl = document.querySelector('#result-panel');
const starsEl = document.querySelector('#stars');
const scoreValueEl = document.querySelector('#score-value');
const timeValueEl = document.querySelector('#time-value');
const timerValueEl = document.querySelector('.timer-label');
const decreaseDiskButton = document.querySelector('#decrease-disks');
const increaseDiskButton = document.querySelector('#increase-disks');
const playButton = document.querySelector('#play-button');
const rulesCardEl = document.querySelector('.rules-card');
const closeRulesButton = document.querySelector('.check-button');
const helpButton = document.querySelector('#help-button');

function setStatus(message) {
    statusTextEl.textContent = message;
}

function updateMoveCounter() {
    moveCounterEl.textContent = `Moves: ${state.moveCount}`;
}

function updateMinimumMoves() {
    minimumMovesEl.textContent = `Minimum Moves: ${2 ** state.diskCount - 1}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}m ${remainder.toString().padStart(2, '0')}s`;
}

function formatTimerValue(ms) {
    const totalMs = Math.max(0, ms);
    const minutes = Math.floor(totalMs / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((totalMs % 60000) / 1000).toString().padStart(2, '0');
    const hundredths = Math.floor((totalMs % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}.${hundredths}`;
}

function getElapsedMs() {
    if (state.startedAt === null) {
        return state.elapsedBeforePause;
    }
    return state.elapsedBeforePause + (Date.now() - state.startedAt);
}

function updateTimer() {
    if (!timerValueEl) {
        return;
    }
    timerValueEl.textContent = formatTimerValue(getElapsedMs());
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function startTimer() {
    stopTimer();
    state.timerInterval = setInterval(() => {
        updateTimer();
    }, 100);
}

function hideResultPanel() {
    resultPanelEl.classList.add('hidden');
    starsEl.innerHTML = '';
}

function finalizeWin() {
    if (state.startedAt !== null) {
        state.elapsedBeforePause = getElapsedMs();
    }

    state.startedAt = null;
    state.isPaused = true;
    stopTimer();
    setStatus('Solved in ' + state.moveCount + ' moves');
    showResultPanel();
    updatePlayButton();
    renderBoard();
}

function showResultPanel() {
    const elapsedMs = getElapsedMs();
    const elapsedSeconds = Math.max(0, Math.round(elapsedMs / 1000));

    let starCount = 1;
    let score = 150;

    if (elapsedSeconds < 180) {
        starCount = 3;
        score = 400;
    } else if (elapsedSeconds < 300) {
        starCount = 2;
        score = 260;
    }

    starsEl.innerHTML = Array.from({ length: 3 }, (_, index) => {
        const filled = index < starCount ? 'filled' : '';
        return `<span class="star ${filled}">★</span>`;
    }).join('');

    scoreValueEl.textContent = `${score}`;
    timeValueEl.textContent = formatTime(elapsedSeconds);
    resultPanelEl.classList.remove('hidden');
}

function resetBoard() {
    if (state.solvingTimer) {
        clearTimeout(state.solvingTimer);
        state.solvingTimer = null;
    }

    stopTimer();
    state.isSolving = false;
    state.isPaused = false;
    state.selectedTower = null;
    state.moveCount = 0;
    state.towers = [[], [], []];
    state.startedAt = null;
    state.elapsedBeforePause = 0;

    for (let disk = state.diskCount; disk >= 1; disk -= 1) {
        state.towers[0].push(disk);
    }

    hideResultPanel();
    updateMoveCounter();
    updateMinimumMoves();
    updatePlayButton();
    updateTimer();
    setStatus('Ready to solve');
    renderBoard();
}

function beginTimerIfNeeded() {
    if (state.startedAt !== null || state.isSolving) {
        return;
    }

    state.startedAt = Date.now();
    state.isPaused = false;
    updatePlayButton();
    updateTimer();
    startTimer();
}

function pauseTimer() {
    if (state.startedAt === null) {
        return;
    }

    state.elapsedBeforePause = getElapsedMs();
    state.startedAt = null;
    state.isPaused = true;
    stopTimer();
    updatePlayButton();
    updateTimer();
}

function resumeTimer() {
    if (state.startedAt !== null) {
        return;
    }

    state.startedAt = Date.now();
    state.isPaused = false;
    updatePlayButton();
    updateTimer();
    startTimer();
}

function togglePlayPause() {
    if (state.startedAt === null && !state.isPaused) {
        beginTimerIfNeeded();
        return;
    }

    if (state.isPaused) {
        resumeTimer();
        return;
    }

    pauseTimer();
}

function updatePlayButton() {
    if (!playButton) {
        return;
    }

    const isPaused = state.isPaused || state.startedAt === null;
    playButton.classList.toggle('paused', isPaused);

    if (state.startedAt !== null && !state.isPaused) {
        playButton.innerHTML = '<span class="pause-bars"><span></span><span></span></span>';
        playButton.setAttribute('aria-label', 'Pause game');
        return;
    }

    playButton.innerHTML = '<span class="play-triangle"></span>';
    playButton.setAttribute('aria-label', state.startedAt === null ? 'Start game' : 'Resume game');
}

function renderBoard() {
    towerEls.forEach((towerEl, towerIndex) => {
        const stack = towerEl.querySelector('.tower-stack');
        stack.innerHTML = '';

        state.towers[towerIndex].forEach((disk, diskIndex) => {
            const ring = document.createElement('div');
            const isSelectedDisk = state.selectedTower === towerIndex && diskIndex === state.towers[towerIndex].length - 1;

            ring.className = `ring${isSelectedDisk ? ' selected' : ''}`;
            ring.style.setProperty('--ring-width', `${90 + (disk / state.diskCount) * 130}px`);
            ring.textContent = disk;
            ring.style.color = '#2f3f50';
            ring.style.fontSize = '15px';
            ring.style.textAlign = 'center';
            ring.style.lineHeight = '20px';
            stack.appendChild(ring);
        });

        towerEl.classList.toggle('selected', state.selectedTower === towerIndex);
    });
}

function canMoveDisk(fromTower, toTower) {
    const source = state.towers[fromTower];
    const destination = state.towers[toTower];

    if (!source.length) {
        return false;
    }

    const movingDisk = source[source.length - 1];
    return !destination.length || movingDisk < destination[destination.length - 1];
}

function playMoveSound(diskSize) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;

    if (!AudioCtx) {
        return;
    }

    const context = new AudioCtx();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.value = 180 + diskSize * 42;
    gain.gain.value = 0.04;

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.09);

    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.09);
    oscillator.onended = () => context.close();
}

function moveDisk(fromTower, toTower) {
    if (!canMoveDisk(fromTower, toTower)) {
        return false;
    }

    beginTimerIfNeeded();

    const source = state.towers[fromTower];
    const destination = state.towers[toTower];
    const disk = source.pop();
    destination.push(disk);
    state.moveCount += 1;
    updateMoveCounter();
    playMoveSound(disk);

    const solved = state.towers[2].length === state.diskCount;
    if (solved) {
        finalizeWin();
    } else {
        setStatus(`Move ${state.moveCount}`);
    }

    renderBoard();
    return true;
}

function handleTowerSelection(index) {
    if (state.isSolving) {
        return;
    }

    if (state.selectedTower === null) {
        if (!state.towers[index].length) {
            setStatus('Choose a tower with a disk');
            return;
        }

        state.selectedTower = index;
        setStatus(`Selected tower ${String.fromCharCode(65 + index)}`);
        renderBoard();
        return;
    }

    if (state.selectedTower === index) {
        state.selectedTower = null;
        setStatus('Selection cleared');
        renderBoard();
        return;
    }

    if (!moveDisk(state.selectedTower, index)) {
        setStatus('Invalid move');
    }

    state.selectedTower = null;
    renderBoard();
}

function solveTowerOfHanoi() {
    if (state.isSolving) {
        return;
    }

    resetBoard();
    beginTimerIfNeeded();
    state.isSolving = true;
    state.selectedTower = null;
    setStatus('Solving...');

    const moves = [];
    const move = (n, from, helper, to) => {
        if (n <= 0) {
            return;
        }

        move(n - 1, from, to, helper);
        moves.push([from, to]);
        move(n - 1, helper, from, to);
    };

    move(state.diskCount, 0, 1, 2);

    let stepIndex = 0;
    const executeNextMove = () => {
        if (stepIndex >= moves.length) {
            state.isSolving = false;
            return;
        }

        const [from, to] = moves[stepIndex];
        if (moveDisk(from, to)) {
            stepIndex += 1;
            state.solvingTimer = setTimeout(executeNextMove, 420);
        } else {
            state.isSolving = false;
            setStatus('Unable to solve in this state');
        }
    };

    executeNextMove();
}

function handleDiskSelect(event) {
    state.diskCount = Number(event.target.value);
    resetBoard();
}

function adjustDiskCount(step) {
    const nextValue = Math.min(7, Math.max(3, state.diskCount + step));
    state.diskCount = nextValue;
    diskSelectEl.value = String(nextValue);
    resetBoard();
}

function toggleRules() {
    rulesCardEl.classList.toggle('hidden');
}

resetButton.addEventListener('click', resetBoard);
solveButton.addEventListener('click', solveTowerOfHanoi);
diskSelectEl.addEventListener('change', handleDiskSelect);
decreaseDiskButton.addEventListener('click', () => adjustDiskCount(-1));
increaseDiskButton.addEventListener('click', () => adjustDiskCount(1));
playButton.addEventListener('click', () => {
    rulesCardEl.classList.add('hidden');
    togglePlayPause();
    if (state.startedAt !== null && !state.isPaused) {
        setStatus('Game running');
    }
});
helpButton.addEventListener('click', toggleRules);
closeRulesButton.addEventListener('click', () => rulesCardEl.classList.add('hidden'));

towerEls.forEach((towerEl) => {
    towerEl.addEventListener('click', () => {
        handleTowerSelection(Number(towerEl.dataset.tower));
    });

    towerEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleTowerSelection(Number(towerEl.dataset.tower));
        }
    });
});

resetBoard();
rulesCardEl.classList.add('hidden'); // Rules hidden at start