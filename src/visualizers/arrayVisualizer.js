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
    const maxValue = Math.max(...arr);

    arr.forEach((value, i) => {
      const barHeight = (value / maxValue) * (this.canvas.height - 40);
      const x = i * barWidth;
      const y = this.canvas.height - barHeight;

      // Create gradient based on state
      let gradient;
      if (min === i) {
        gradient = this.ctx.createLinearGradient(x, y, x, this.canvas.height);
        gradient.addColorStop(0, '#48bb78');
        gradient.addColorStop(1, '#38a169');
      } else if (comparing.includes(i)) {
        gradient = this.ctx.createLinearGradient(x, y, x, this.canvas.height);
        gradient.addColorStop(0, '#f56565');
        gradient.addColorStop(1, '#e53e3e');
      } else {
        gradient = this.ctx.createLinearGradient(x, y, x, this.canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
      }

      // Draw shadow
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      this.ctx.shadowBlur = 8;
      this.ctx.shadowOffsetY = 4;

      // Draw bar with rounded corners
      this.ctx.fillStyle = gradient;
      this.roundRect(x + 2, y, barWidth - 4, barHeight, 6);

      // Reset shadow
      this.ctx.shadowColor = 'transparent';
      this.ctx.shadowBlur = 0;
      this.ctx.shadowOffsetY = 0;

      // Draw value text
      this.ctx.fillStyle = '#2d3748';
      this.ctx.font = 'bold 12px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(value, x + barWidth / 2, this.canvas.height - barHeight - 8);
    });
  }

  roundRect(x, y, width, height, radius) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
    this.ctx.fill();
  }
}