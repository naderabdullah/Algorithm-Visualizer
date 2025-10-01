export class ArrayVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    this.ctx = ctx;
  }

  drawArray(arr, comparing = [], min = null) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const barWidth = this.canvas.width / arr.length;

    arr.forEach((value, i) => {
      if (min === i) {
        this.ctx.fillStyle = "green"; // min element
      } else if (comparing.includes(i)) {
        this.ctx.fillStyle = "red"; // elements being compared
      } else {
        this.ctx.fillStyle = "blue"; // normal elements
      }
      
      this.ctx.fillRect(
        i * barWidth,
        this.canvas.height - value,
        barWidth - 2,
        value
      );
    });
  }
}
