import Moveable from 'moveable';
import { GridSystem } from './GridSystem';

export class MoveableGridIntegration {
  private moveable: Moveable;
  private gridSystem: GridSystem;
  private target: HTMLElement;
  
  constructor(
    container: HTMLElement,
    target: HTMLElement,
    gridSystem: GridSystem
  ) {
    this.target = target;
    this.gridSystem = gridSystem;
    
    this.moveable = new Moveable(container, {
      target: target,
      draggable: true,
      resizable: true,
      rotatable: true,
      snappable: false, // We handle snapping manually
      
      // Visual styling
      className: 'moveable-control',
      controlPadding: 10,
      
      // Draggable options
      dragArea: true,
      
      // Resizable options
      renderDirections: ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'],
      
      // Rotatable options
      rotationPosition: 'top'
    });
    
    this.setupEventHandlers();
  }
  
  private setupEventHandlers(): void {
    // Handle drag events with grid snapping
    this.moveable.on('drag', (e) => {
      const { beforeTranslate } = e;
      const currentX = beforeTranslate[0];
      const currentY = beforeTranslate[1];
      
      if (this.gridSystem.config.enabled) {
        const snapped = this.gridSystem.snapToGrid(currentX, currentY);
        e.target.style.transform = `translate(${snapped.x}px, ${snapped.y}px)`;
      } else {
        e.target.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
    });
    
    // Handle resize events with grid snapping
    this.moveable.on('resize', (e) => {
      const { width, height, drag } = e;
      
      let finalWidth = width;
      let finalHeight = height;
      let finalX = drag.beforeTranslate[0];
      let finalY = drag.beforeTranslate[1];
      
      if (this.gridSystem.config.enabled) {
        // Snap the size to grid
        const snappedSize = this.gridSystem.snapToGrid(width, height);
        finalWidth = snappedSize.x;
        finalHeight = snappedSize.y;
        
        // Snap the position during resize
        const snappedPos = this.gridSystem.snapToGrid(finalX, finalY);
        finalX = snappedPos.x;
        finalY = snappedPos.y;
      }
      
      e.target.style.width = `${finalWidth}px`;
      e.target.style.height = `${finalHeight}px`;
      e.target.style.transform = `translate(${finalX}px, ${finalY}px)`;
    });
    
    // Handle rotation - maintain grid snapping for position
    this.moveable.on('rotate', (e) => {
      const { drag, beforeRotate } = e;
      
      let transform = `rotate(${beforeRotate}deg)`;
      
      if (drag && this.gridSystem.config.enabled) {
        const snappedPos = this.gridSystem.snapToGrid(drag.beforeTranslate[0], drag.beforeTranslate[1]);
        transform = `translate(${snappedPos.x}px, ${snappedPos.y}px) ${transform}`;
      } else if (drag) {
        transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px) ${transform}`;
      }
      
      e.target.style.transform = transform;
    });
    
    // Handle when element is clicked/selected
    this.moveable.on('clickGroup', (e) => {
      e.inputEvent.stopPropagation();
    });
  }
  
  public updateGridSnapping(enabled: boolean, size?: number): void {
    if (size) {
      this.gridSystem.setGridSize(size);
    }
    this.gridSystem.setGridEnabled(enabled);
  }
  
  public destroy(): void {
    this.moveable.destroy();
  }
}