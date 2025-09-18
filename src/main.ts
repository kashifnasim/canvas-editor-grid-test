import { CanvasEditor } from './EditorIntegration';
import './styles/EditorGridStyles.css';

// Initialize the editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const editor = new CanvasEditor('canvas-editor');
  
  // Setup toolbar event handlers
  const addTextBtn = document.getElementById('add-text');
  const addBoxBtn = document.getElementById('add-box');
  const addImageBtn = document.getElementById('add-image');
  const clearCanvasBtn = document.getElementById('clear-canvas');
  
  if (addTextBtn) {
    addTextBtn.addEventListener('click', () => {
      const textElement = editor.createTextElement(`Text ${Date.now().toString().slice(-4)}`);
      editor.addElement(textElement);
    });
  }
  
  if (addBoxBtn) {
    addBoxBtn.addEventListener('click', () => {
      const boxElement = editor.createBoxElement();
      editor.addElement(boxElement);
    });
  }
  
  if (addImageBtn) {
    addImageBtn.addEventListener('click', () => {
      const imageElement = editor.createImageElement();
      editor.addElement(imageElement);
    });
  }
  
  if (clearCanvasBtn) {
    clearCanvasBtn.addEventListener('click', () => {
      editor.clearAllElements();
    });
  }
  
  // Add some initial demo elements
  const initialText = editor.createTextElement('Welcome to Grid Editor!');
  const initialBox = editor.createBoxElement();
  const initialImage = editor.createImageElement();
  
  // Position them at different grid positions
  initialText.style.transform = 'translate(40px, 40px)';
  initialBox.style.transform = 'translate(220px, 60px)';
  initialImage.style.transform = 'translate(80px, 140px)';
  
  editor.addElement(initialText);
  editor.addElement(initialBox);
  editor.addElement(initialImage);
  
  // Make editor globally available for debugging
  (window as any).editor = editor;
});