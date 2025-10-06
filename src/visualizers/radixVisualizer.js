export class RadixVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    this.ctx = ctx;
  }

  /**
   * Main drawing method for radix sort visualization
   */
  drawRadixSort(arr, buckets = null, digitPos = 0, highlight = null, comparing = []) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // If no buckets provided, just draw the array normally
    if (!buckets || buckets.length === 0) {
      this.drawArray(arr, comparing, highlight);
      return;
    }

    // Split canvas: top 40% for array, bottom 60% for buckets
    const arrayHeight = this.canvas.height * 0.35;
    const bucketsHeight = this.canvas.height * 0.65;
    const bucketsStartY = arrayHeight;

    // Draw the main array at the top
    this.drawArraySection(arr, 0, arrayHeight, comparing, highlight);

    // Draw digit position indicator
    this.drawDigitIndicator(digitPos, arrayHeight - 5);

    // Draw the buckets at the bottom
    this.drawBuckets(buckets, bucketsStartY, bucketsHeight, digitPos);
  }

  /**
   * Draw the array section
   */
  drawArraySection(arr, startY, height, comparing = [], highlight = null) {
    if (!arr || arr.length === 0) return;

    const barWidth = this.canvas.width / arr.length;
    const maxValue = Math.max(...arr);

    arr.forEach((value, i) => {
      const barHeight = (value / maxValue) * (height - 50);
      const x = i * barWidth;
      const y = startY + (height - barHeight - 30);

      let gradient;
      let glowColor = null;
      
      if (highlight === i) {
        gradient = this.ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, '#48bb78');
        gradient.addColorStop(1, '#38a169');
        glowColor = 'rgba(72, 187, 120, 0.5)';
      } else if (comparing.includes(i)) {
        gradient = this.ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, '#f6ad55');
        gradient.addColorStop(1, '#ed8936');
        glowColor = 'rgba(246, 173, 85, 0.4)';
      } else {
        gradient = this.ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
      }

      if (glowColor) {
        this.ctx.shadowColor = glowColor;
        this.ctx.shadowBlur = 15;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
      } else {
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        this.ctx.shadowBlur = 6;
        this.ctx.shadowOffsetY = 4;
      }

      this.ctx.fillStyle = gradient;
      this.roundRect(x + 2, y, barWidth - 4, barHeight, 4);

      this.ctx.shadowColor = 'transparent';
      this.ctx.shadowBlur = 0;
      this.ctx.shadowOffsetY = 0;

      // Draw value
      this.ctx.fillStyle = highlight === i ? '#22543d' : '#2d3748';
      this.ctx.font = highlight === i ? 'bold 12px Inter, sans-serif' : 'bold 10px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(value, x + barWidth / 2, y - 6);
    });
  }

  /**
   * Draw the 10 buckets (0-9)
   */
  drawBuckets(buckets, startY, height, digitPos) {
    const bucketWidth = this.canvas.width / 10;
    const bucketHeight = height - 40;

    for (let i = 0; i < 10; i++) {
      const x = i * bucketWidth;
      const y = startY + 20;

      // Draw bucket container
      this.ctx.strokeStyle = '#cbd5e0';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x + 4, y, bucketWidth - 8, bucketHeight);

      // Draw bucket label (digit 0-9)
      this.ctx.fillStyle = '#4a5568';
      this.ctx.font = 'bold 14px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(i.toString(), x + bucketWidth / 2, y - 6);

      // Draw items in bucket
      const items = buckets[i] || [];
      if (items.length === 0) continue;

      const itemHeight = Math.min(bucketHeight / items.length, 35);

      items.forEach((value, idx) => {
        const itemY = y + bucketHeight - (idx + 1) * itemHeight;
        const itemX = x + 8;
        const itemW = bucketWidth - 16;

        // Color items in bucket
        const gradient = this.ctx.createLinearGradient(itemX, itemY, itemX, itemY + itemHeight - 4);
        gradient.addColorStop(0, '#4299e1');
        gradient.addColorStop(1, '#3182ce');

        this.ctx.shadowColor = 'rgba(66, 153, 225, 0.3)';
        this.ctx.shadowBlur = 8;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;

        this.ctx.fillStyle = gradient;
        this.roundRect(itemX, itemY, itemW, itemHeight - 4, 3);

        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;

        // Draw value text
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 10px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(value, itemX + itemW / 2, itemY + itemHeight / 2 + 3);
      });
    }
  }

  /**
   * Draw indicator showing which digit position is being examined
   */
  drawDigitIndicator(digitPos, y) {
    const positions = ['1s', '10s', '100s', '1000s'];
    const text = `Sorting by ${positions[digitPos] || (Math.pow(10, digitPos) + 's')} place`;
    
    this.ctx.fillStyle = '#5a67d8';
    this.ctx.font = 'bold 12px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, this.canvas.width / 2, y);
  }

  /**
   * Draw array normally (same as ArrayVisualizer)
   */
  drawArray(arr, comparing = [], highlight = null) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (!arr || arr.length === 0) return;
    
    const barWidth = this.canvas.width / arr.length;
    const maxValue = Math.max(...arr);

    arr.forEach((value, i) => {
      const barHeight = (value / maxValue) * (this.canvas.height - 40);
      const x = i * barWidth;
      const y = this.canvas.height - barHeight;

      let gradient;
      let glowColor = null;
      
      if (highlight === i) {
        gradient = this.ctx.createLinearGradient(x, y, x, this.canvas.height);
        gradient.addColorStop(0, '#48bb78');
        gradient.addColorStop(1, '#38a169');
        glowColor = 'rgba(72, 187, 120, 0.5)';
      } else if (comparing.includes(i)) {
        gradient = this.ctx.createLinearGradient(x, y, x, this.canvas.height);
        gradient.addColorStop(0, '#f6ad55');
        gradient.addColorStop(1, '#ed8936');
        glowColor = 'rgba(246, 173, 85, 0.4)';
      } else {
        gradient = this.ctx.createLinearGradient(x, y, x, this.canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
      }

      if (glowColor) {
        this.ctx.shadowColor = glowColor;
        this.ctx.shadowBlur = 20;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
      } else {
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        this.ctx.shadowBlur = 8;
        this.ctx.shadowOffsetY = 4;
      }

      this.ctx.fillStyle = gradient;
      this.roundRect(x + 2, y, barWidth - 4, barHeight, 6);

      if (highlight === i) {
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 3;
        this.roundRectStroke(x + 2, y, barWidth - 4, barHeight, 6);
      }

      this.ctx.shadowColor = 'transparent';
      this.ctx.shadowBlur = 0;
      this.ctx.shadowOffsetY = 0;

      this.ctx.fillStyle = highlight === i ? '#22543d' : '#2d3748';
      this.ctx.font = highlight === i ? 'bold 14px Inter, sans-serif' : 'bold 12px Inter, sans-serif';
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

  roundRectStroke(x, y, width, height, radius) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}