import { ArrayVisualizer } from "./visualizers/arrayVisualizer.js";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { selectionSort } from "./algorithms/selectionSort.js";

const canvas = document.getElementById("canvas");
const visualizer = new ArrayVisualizer(canvas);

// Controls
const speedInput = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const arraySizeInput = document.getElementById("arraySize");
const arraySizeValue = document.getElementById("arraySizeValue");
const algorithmSelect = document.getElementById("algorithm");

// Buttons
const startBtn = document.getElementById("startBtn");
const randomizeBtn = document.getElementById("randomizeBtn");
const resetBtn = document.getElementById("resetBtn");

// Stats
const comparisonsEl = document.getElementById("comparisons");
const swapsEl = document.getElementById("swaps");
const sizeDisplayEl = document.getElementById("sizeDisplay");

// State
let delay = 100 - parseInt(speedInput.value) + 1;
let arraySize = parseInt(arraySizeInput.value);
let data = [];
let originalData = [];
let sorter = null;
let isRunning = false;
let animationId = null;

function generateArray() {
  data = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 10);
  originalData = [...data];
  visualizer.drawArray(data);
  comparisonsEl.textContent = '0';
  swapsEl.textContent = '0';
  sizeDisplayEl.textContent = arraySize;
}

// Speed control
speedInput.addEventListener("input", () => {
  const sliderVal = parseInt(speedInput.value);
  delay = 100 - sliderVal + 1;
  speedValue.textContent = delay;
});

// Array size control
arraySizeInput.addEventListener("input", () => {
  arraySize = parseInt(arraySizeInput.value);
  arraySizeValue.textContent = arraySize;
  if (!isRunning) {
    generateArray();
  }
});

// Start button
startBtn.addEventListener("click", () => {
  if (isRunning) return;
  
  isRunning = true;
  startBtn.disabled = true;
  randomizeBtn.disabled = true;
  algorithmSelect.disabled = true;
  
  const algorithm = algorithmSelect.value;
  sorter = algorithm === 'bubble' ? bubbleSort(data) : selectionSort(data);
  animate();
});

// Randomize button
randomizeBtn.addEventListener("click", () => {
  if (!isRunning) {
    generateArray();
  }
});

// Reset button
resetBtn.addEventListener("click", () => {
  if (animationId) {
    clearTimeout(animationId);
  }
  isRunning = false;
  data = [...originalData];
  visualizer.drawArray(data);
  comparisonsEl.textContent = '0';
  swapsEl.textContent = '0';
  startBtn.disabled = false;
  randomizeBtn.disabled = false;
  algorithmSelect.disabled = false;
});

function animate() {
  const step = sorter.next();
  if (!step.done) {
    visualizer.drawArray(
      step.value.array,
      step.value.comparing,
      step.value.highlight
    );
    comparisonsEl.textContent = step.value.comparisons || 0;
    swapsEl.textContent = step.value.swaps || 0;
    animationId = setTimeout(animate, delay);
  } else {
    visualizer.drawArray(step.value.array);
    comparisonsEl.textContent = step.value.comparisons || 0;
    swapsEl.textContent = step.value.swaps || 0;
    isRunning = false;
    startBtn.disabled = false;
    randomizeBtn.disabled = false;
    algorithmSelect.disabled = false;
  }
}

// Initialize
generateArray();