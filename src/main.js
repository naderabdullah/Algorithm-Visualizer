import { ArrayVisualizer } from "./visualizers/arrayVisualizer.js";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { selectionSort } from "./algorithms/selectionSort.js";

const canvas = document.getElementById("canvas");
const visualizer = new ArrayVisualizer(canvas);

const speedInput = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");

let delay = 100 - parseInt(speedInput.value) + 1; // reversed 1–100

speedInput.addEventListener("input", () => {
  const sliderVal = parseInt(speedInput.value);
  delay = 100 - sliderVal + 1; // reverse scale
  speedValue.textContent = delay;
});

const data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 300));
const sorter = selectionSort(data);

function animate() {
  const step = sorter.next();
  if (!step.done) {
    visualizer.drawArray(
      step.value.array,
      step.value.comparing,
      step.value.min
    );
    setTimeout(animate, delay);
  }
}

animate();
