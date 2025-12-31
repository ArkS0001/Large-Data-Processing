import { StreamProcessor } from './modules/streamProcessor.js';

// --- State Management ---
const processor = new StreamProcessor();
let timerId = null;
let processedCount = 0;
let processingDelay = 10;

// --- DOM Elements ---
const ui = {
    start: document.getElementById('btnStart'),
    pause: document.getElementById('btnPause'),
    stop: document.getElementById('btnStop'),
    select: document.getElementById('datasetSelect'),
    feed: document.getElementById('feedWindow'),
    count: document.getElementById('countDisplay'),
    status: document.getElementById('statusDisplay'),
    speed: document.getElementById('speedRange'),
    speedDisplay: document.getElementById('speedDisplay')
};

// --- Event Listeners ---
ui.start.addEventListener('click', startProcessing);
ui.pause.addEventListener('click', pauseProcessing);
ui.stop.addEventListener('click', stopProcessing);
ui.speed.addEventListener('input', (e) => {
    processingDelay = e.target.value;
    ui.speedDisplay.textContent = `${processingDelay}ms`;
});

// --- Core Logic ---

function startProcessing() {
    if (!timerId) {
        // Only init generator if starting fresh, otherwise resume
        if (processedCount === 0) {
            processor.init(ui.select.value);
            ui.feed.innerHTML = ''; // Clear placeholder
        }
        
        updateStatus('Processing', 'var(--success)');
        toggleButtons(true);
        processStep();
    }
}

function pauseProcessing() {
    clearTimeout(timerId);
    timerId = null;
    updateStatus('Paused', 'var(--warning)');
    ui.start.disabled = false;
    ui.pause.disabled = true;
}

function stopProcessing() {
    clearTimeout(timerId);
    timerId = null;
    processedCount = 0;
    ui.count.textContent = 0;
    updateStatus('Stopped', 'var(--primary)');
    toggleButtons(false);
    
    // Add separator line in UI
    const hr = document.createElement('hr');
    hr.style.borderColor = '#333';
    ui.feed.appendChild(hr);
}

/**
 * The Recursive Processing Loop
 * simulates reading a stream one chunk at a time.
 */
function processStep() {
    // 1. Fetch next data chunk (Lazy Load)
    const result = processor.next();

    if (!result || result.done) {
        stopProcessing();
        return;
    }

    const item = result.value;

    // 2. Update UI (Render)
    renderRow(item);
    
    // 3. Update Stats
    processedCount++;
    ui.count.textContent = processedCount.toLocaleString();

    // 4. Clean up DOM memory (Virtual Scrolling Lite)
    // Remove old nodes to prevent DOM Memory Leak
    if (ui.feed.childElementCount > 50) {
        ui.feed.removeChild(ui.feed.firstElementChild);
    }

    // 5. Schedule next step (Controlled Flow)
    // This allows the UI thread to breathe between processing records
    timerId = setTimeout(processStep, processingDelay);
}

// --- Helpers ---

function renderRow(item) {
    const row = document.createElement('div');
    row.className = 'log-row';
    
    const alertClass = item.alert ? 'log-alert' : 'log-data';
    const alertIcon = item.alert ? '⚠️' : '✓';

    row.innerHTML = `
        <span style="color: #666; font-size: 0.8em;">[${item.timestamp}] ID:${item.id}</span>
        <span class="${alertClass}">${item.data}</span>
        <span>${alertIcon}</span>
    `;

    ui.feed.appendChild(row);
    ui.feed.scrollTop = ui.feed.scrollHeight; // Auto-scroll
}

function updateStatus(text, color) {
    ui.status.textContent = text;
    ui.status.style.color = color;
}

function toggleButtons(isRunning) {
    ui.start.disabled = isRunning;
    ui.select.disabled = isRunning;
    ui.pause.disabled = !isRunning;
    ui.stop.disabled = !isRunning;
}