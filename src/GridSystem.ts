export interface GridConfig {
  enabled: boolean;
  visible: boolean;
  size: number;
  color: string;
  opacity: number;
  snapThreshold: number;
}

export class GridSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public config: GridConfig;
  private container: HTMLElement;
  private resizeObserver: ResizeObserver;
  
  constructor(container: HTMLElement, config: Partial<GridConfig> = {}) {
    this.container = container;
    this.config = {
      enabled: true,
      visible: true,
      size: 20,
      color: '#e0e0e0',
      opacity: 0.5,
      snapThreshold: 10,
      ...config
    };
    
    this.initializeCanvas();
  }
  
  private initializeCanvas(): void {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    this.canvas.style.imageRendering = 'crisp-edges';
    
    this.ctx = this.canvas.getContext('2d')!;
    this.container.appendChild(this.canvas);
    
    this.updateCanvasSize();
    this.drawGrid();
    
    // Listen for container resize
    this.resizeObserver = new ResizeObserver(() => {
      this.updateCanvasSize();
      this.drawGrid();
    });
    this.resizeObserver.observe(this.container);
  }
  
  private updateCanvasSize(): void {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    
    this.ctx.scale(dpr, dpr);
  }
  
  private drawGrid(): void {
    if (!this.config.visible) {
      this.clearGrid();
      return;
    }
    
    this.clearGrid();
    
    const rect = this.container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const { size, color, opacity } = this.config;
    
    this.ctx.strokeStyle = color;
    this.ctx.globalAlpha = opacity;
    this.ctx.lineWidth = 1;
    
    this.ctx.beginPath();
    
    // Draw vertical lines
    for (let x = 0; x <= width; x += size) {
      this.ctx.moveTo(x + 0.5, 0);
      this.ctx.lineTo(x + 0.5, height);
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= height; y += size) {
      this.ctx.moveTo(0, y + 0.5);
      this.ctx.lineTo(width, y + 0.5);
    }
    
    this.ctx.stroke();
    this.ctx.globalAlpha = 1;
  }
  
  private clearGrid(): void {
    const rect = this.container.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);
  }
  
  public snapToGrid(x: number, y: number): { x: number; y: number } {
    if (!this.config.enabled) {
      return { x, y };
    }
    
    const { size, snapThreshold } = this.config;
    
    const snappedX = Math.round(x / size) * size;
    const snappedY = Math.round(y / size) * size;
    
    const deltaX = Math.abs(x - snappedX);
    const deltaY = Math.abs(y - snappedY);
    
    return {
      x: deltaX <= snapThreshold ? snappedX : x,
      y: deltaY <= snapThreshold ? snappedY : y
    };
  }
  
  public setGridVisible(visible: boolean): void {
    this.config.visible = visible;
    this.drawGrid();
  }
  
  public setGridEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
  }
  
  public setGridSize(size: number): void {
    this.config.size = size;
    this.drawGrid();
  }
  
  public updateConfig(newConfig: Partial<GridConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.drawGrid();
  }
  
  public destroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}