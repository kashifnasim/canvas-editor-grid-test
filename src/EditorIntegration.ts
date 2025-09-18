import { GridSystem } from './GridSystem';
import { MoveableGridIntegration } from './MoveableGridIntegration';
import { EditorViewMenu } from './EditorViewMenu';

export class CanvasEditor {
  private container: HTMLElement;
  private gridSystem: GridSystem;
  private moveableInstances: Map<HTMLElement, MoveableGridIntegration> = new Map();
  private viewMenu: EditorViewMenu;
  private elementCounter: number = 0;
  
  constructor(containerId: string) {
    this.container = document.getElementById(containerId)!;
    if (!this.container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    
    this.container.classList.add('canvas-editor-container');
    
    // Initialize grid system
    this.gridSystem = new GridSystem(this.container, {
      size: 20,
      visible: true,
      enabled: true,
      color: '#e0e0e0',
      opacity: 0.5,
      snapThreshold: 10
    });
    
    // Initialize view menu
    this.viewMenu = new EditorViewMenu(document.body, this.gridSystem, {
      onGridToggle: (visible) => {
        console.log('Grid visibility:', visible);
      },
      onGridSizeChange: (size) => {
        this.updateAllMoveableGridSize(size);
        console.log('Grid size changed:', size);
      },
      onSnapToggle: (enabled) => {
        this.updateAllMoveableSnapping(enabled);
        console.log('Grid snapping:', enabled);
      }
    });
    
    this.setupContainerEvents();
  }
  
  private setupContainerEvents(): void {
    // Deselect elements when clicking on empty space
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) {
        this.deselectAllElements();
      }
    });
  }
  
  private deselectAllElements(): void {
    this.moveableInstances.forEach((moveableInstance) => {
      // You might want to add a method to hide the moveable controls
    });
  }
  
  public addElement(element: HTMLElement): void {
    element.classList.add('editor-element');
    element.setAttribute('data-element-id', `element-${this.elementCounter++}`);
    
    // Set initial position if not set
    if (!element.style.position) {
      element.style.position = 'absolute';
    }
    
    // Set initial transform if not set
    if (!element.style.transform) {
      element.style.transform = 'translate(40px, 40px)';
    }
    
    this.container.appendChild(element);
    
    // Create moveable instance for this element
    const moveableInstance = new MoveableGridIntegration(
      this.container,
      element,
      this.gridSystem
    );
    
    this.moveableInstances.set(element, moveableInstance);
  }
  
  public removeElement(element: HTMLElement): void {
    const moveableInstance = this.moveableInstances.get(element);
    if (moveableInstance) {
      moveableInstance.destroy();
      this.moveableInstances.delete(element);
    }
    
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
  
  public clearAllElements(): void {
    // Create a copy of the map to avoid modification during iteration
    const elements = Array.from(this.moveableInstances.keys());
    elements.forEach(element => this.removeElement(element));
  }
  
  public createTextElement(text: string = 'Sample Text'): HTMLElement {
    const element = document.createElement('div');
    element.textContent = text;
    element.style.width = '150px';
    element.style.height = '40px';
    element.style.background = '#007bff';
    element.style.color = 'white';
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
    element.style.borderRadius = '6px';
    element.style.fontSize = '14px';
    element.style.fontWeight = '500';
    element.style.cursor = 'move';
    element.style.userSelect = 'none';
    
    return element;
  }
  
  public createBoxElement(): HTMLElement {
    const element = document.createElement('div');
    element.style.width = '120px';
    element.style.height = '80px';
    element.style.background = '#28a745';
    element.style.borderRadius = '6px';
    element.style.cursor = 'move';
    element.style.border = '2px solid #1e7e34';
    
    return element;
  }
  
  public createImageElement(): HTMLElement {
    const element = document.createElement('div');
    element.style.width = '160px';
    element.style.height = '120px';
    element.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
    element.style.borderRadius = '8px';
    element.style.cursor = 'move';
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
    element.style.color = 'white';
    element.style.fontSize = '14px';
    element.style.fontWeight = 'bold';
    element.textContent = 'IMAGE';
    
    return element;
  }
  
  private updateAllMoveableGridSize(size: number): void {
    this.moveableInstances.forEach((moveableInstance) => {
      moveableInstance.updateGridSnapping(true, size);
    });
  }
  
  private updateAllMoveableSnapping(enabled: boolean): void {
    this.moveableInstances.forEach((moveableInstance) => {
      moveableInstance.updateGridSnapping(enabled);
    });
  }
  
  public destroy(): void {
    this.moveableInstances.forEach((moveableInstance) => {
      moveableInstance.destroy();
    });
    this.moveableInstances.clear();
    this.gridSystem.destroy();
    this.viewMenu.destroy();
  }
}