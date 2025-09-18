import { GridSystem } from './GridSystem';

export interface EditorViewMenuOptions {
  onGridToggle?: (visible: boolean) => void;
  onGridSizeChange?: (size: number) => void;
  onSnapToggle?: (enabled: boolean) => void;
}

export class EditorViewMenu {
  private container: HTMLElement;
  private gridSystem: GridSystem;
  private options: EditorViewMenuOptions;
  private menuElement: HTMLElement;
  
  constructor(
    container: HTMLElement,
    gridSystem: GridSystem,
    options: EditorViewMenuOptions = {}
  ) {
    this.container = container;
    this.gridSystem = gridSystem;
    this.options = options;
    
    this.createMenu();
  }
  
  private createMenu(): void {
    this.menuElement = document.createElement('div');
    this.menuElement.className = 'editor-view-menu';
    this.menuElement.innerHTML = `
      <div class="menu-section">
        <h3>Grid Settings</h3>
        
        <div class="menu-item">
          <label>
            <input type="checkbox" id="grid-visible" ${this.gridSystem.config.visible ? 'checked' : ''}>
            Show Grid
          </label>
        </div>
        
        <div class="menu-item">
          <label>
            <input type="checkbox" id="grid-snap" ${this.gridSystem.config.enabled ? 'checked' : ''}>
            Snap to Grid
          </label>
        </div>
        
        <div class="menu-item">
          <label for="grid-size">Grid Size:</label>
          <select id="grid-size">
            <option value="10" ${this.gridSystem.config.size === 10 ? 'selected' : ''}>10px</option>
            <option value="15" ${this.gridSystem.config.size === 15 ? 'selected' : ''}>15px</option>
            <option value="20" ${this.gridSystem.config.size === 20 ? 'selected' : ''}>20px</option>
            <option value="25" ${this.gridSystem.config.size === 25 ? 'selected' : ''}>25px</option>
            <option value="30" ${this.gridSystem.config.size === 30 ? 'selected' : ''}>30px</option>
            <option value="40" ${this.gridSystem.config.size === 40 ? 'selected' : ''}>40px</option>
            <option value="50" ${this.gridSystem.config.size === 50 ? 'selected' : ''}>50px</option>
          </select>
        </div>
        
        <div class="menu-item">
          <label for="grid-opacity">Grid Opacity:</label>
          <input type="range" id="grid-opacity" min="0.1" max="1" step="0.1" value="${this.gridSystem.config.opacity}">
          <span id="opacity-value">${Math.round(this.gridSystem.config.opacity * 100)}%</span>
        </div>
        
        <div class="menu-item">
          <label for="grid-color">Grid Color:</label>
          <input type="color" id="grid-color" value="${this.gridSystem.config.color}">
        </div>
      </div>
    `;
    
    this.container.appendChild(this.menuElement);
    this.bindEvents();
  }
  
  private bindEvents(): void {
    const gridVisible = this.menuElement.querySelector('#grid-visible') as HTMLInputElement;
    const gridSnap = this.menuElement.querySelector('#grid-snap') as HTMLInputElement;
    const gridSize = this.menuElement.querySelector('#grid-size') as HTMLSelectElement;
    const gridOpacity = this.menuElement.querySelector('#grid-opacity') as HTMLInputElement;
    const opacityValue = this.menuElement.querySelector('#opacity-value') as HTMLSpanElement;
    const gridColor = this.menuElement.querySelector('#grid-color') as HTMLInputElement;
    
    // Grid visibility toggle
    gridVisible.addEventListener('change', (e) => {
      const isVisible = (e.target as HTMLInputElement).checked;
      this.gridSystem.setGridVisible(isVisible);
      this.options.onGridToggle?.(isVisible);
    });
    
    // Grid snapping toggle
    gridSnap.addEventListener('change', (e) => {
      const isEnabled = (e.target as HTMLInputElement).checked;
      this.gridSystem.setGridEnabled(isEnabled);
      this.options.onSnapToggle?.(isEnabled);
    });
    
    // Grid size change
    gridSize.addEventListener('change', (e) => {
      const size = parseInt((e.target as HTMLSelectElement).value);
      this.gridSystem.setGridSize(size);
      this.options.onGridSizeChange?.(size);
    });
    
    // Grid opacity change
    gridOpacity.addEventListener('input', (e) => {
      const opacity = parseFloat((e.target as HTMLInputElement).value);
      opacityValue.textContent = `${Math.round(opacity * 100)}%`;
      this.gridSystem.updateConfig({ opacity });
    });
    
    // Grid color change
    gridColor.addEventListener('change', (e) => {
      const color = (e.target as HTMLInputElement).value;
      this.gridSystem.updateConfig({ color });
    });
  }
  
  public destroy(): void {
    if (this.menuElement && this.menuElement.parentNode) {
      this.menuElement.parentNode.removeChild(this.menuElement);
    }
  }
}