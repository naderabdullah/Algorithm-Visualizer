import { ArrayVisualizer } from "./visualizers/arrayVisualizer.js";
import { RadixVisualizer } from "./visualizers/radixVisualizer.js";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { selectionSort } from "./algorithms/selectionSort.js";
import { insertionSort } from "./algorithms/insertionSort.js";
import { quickSort } from "./algorithms/quickSort.js";
import { countingSort } from "./algorithms/countingSort.js";
import { radixSort } from "./algorithms/radixSort.js";

const canvas = document.getElementById("canvas");
const visualizer = new ArrayVisualizer(canvas);
const radixVisualizer = new RadixVisualizer(canvas);

// Algorithm registry - add new algorithms here
const algorithms = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  quick: quickSort,
  counting: countingSort,
  radix: radixSort,
};

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
let delay = 501 - parseInt(speedInput.value);
let arraySize = parseInt(arraySizeInput.value);
let data = [];
let originalData = [];
let sorter = null;
let isRunning = false;
let animationId = null;
let currentAlgorithm = null;

// Initialize speed display on load
speedValue.textContent = delay;

function generateArray() {
  data = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100 + 1));
  originalData = [...data];
  visualizer.drawArray(data);
  comparisonsEl.textContent = '0';
  swapsEl.textContent = '0';
  sizeDisplayEl.textContent = arraySize;
}

// Speed control
speedInput.addEventListener("input", () => {
  const sliderVal = parseInt(speedInput.value);
  delay = 501 - sliderVal;
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
  
  currentAlgorithm = algorithmSelect.value;
  const algorithmFn = algorithms[currentAlgorithm];
  
  if (!algorithmFn) {
    console.error(`Algorithm "${currentAlgorithm}" not found`);
    isRunning = false;
    startBtn.disabled = false;
    randomizeBtn.disabled = false;
    algorithmSelect.disabled = false;
    return;
  }
  
  sorter = algorithmFn(data);
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
  
  // Use appropriate visualizer for reset
  if (currentAlgorithm === 'radix') {
    radixVisualizer.drawArray(data);
  } else {
    visualizer.drawArray(data);
  }
  
  comparisonsEl.textContent = '0';
  swapsEl.textContent = '0';
  startBtn.disabled = false;
  randomizeBtn.disabled = false;
  algorithmSelect.disabled = false;
});

function animate() {
  const step = sorter.next();
  if (!step.done) {
    // Use radix visualizer for radix sort, array visualizer for others
    if (currentAlgorithm === 'radix') {
      radixVisualizer.drawRadixSort(
        step.value.array,
        step.value.buckets,
        step.value.digitPos || 0,
        step.value.highlight,
        step.value.comparing || []
      );
    } else {
      visualizer.drawArray(
        step.value.array,
        step.value.comparing || [],
        step.value.highlight
      );
    }
    
    comparisonsEl.textContent = step.value.comparisons || 0;
    swapsEl.textContent = step.value.swaps || 0;
    animationId = setTimeout(animate, delay);
  } else {
    // Final state - use appropriate visualizer
    if (currentAlgorithm === 'radix') {
      radixVisualizer.drawArray(step.value.array);
    } else {
      visualizer.drawArray(step.value.array);
    }
    
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