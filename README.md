# Canvas Editor with Grid System

A modern canvas-based website editor with grid system and snap-to-grid functionality using the daybrush/moveable library.

## Features

- ✅ Visual grid overlay with customizable appearance
- ✅ Snap-to-grid functionality for precise element positioning
- ✅ Integration with daybrush/moveable library for drag, resize, and rotate
- ✅ Toggleable grid visibility
- ✅ Configurable grid size, color, and opacity
- ✅ Responsive design support
- ✅ View menu controls for real-time adjustments

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/kashifnasim/canvas-editor-grid-test.git
cd canvas-editor-grid-test
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open `http://localhost:3000` in your browser

## Usage

- **Drag Elements**: Click and drag any element on the canvas
- **Resize Elements**: Use the resize handles that appear when selecting an element
- **Rotate Elements**: Use the rotation handle for free-form rotation
- **Grid Controls**: Use the view menu on the right to toggle grid settings

### Grid Controls

- **Show Grid**: Toggle grid visibility on/off
- **Snap to Grid**: Enable/disable automatic snapping to grid intersections
- **Grid Size**: Choose from preset grid sizes (10px to 50px)
- **Grid Opacity**: Adjust grid line transparency
- **Grid Color**: Change grid line color

## File Structure

```
├── src/
│   ├── GridSystem.ts          # Core grid system implementation
│   ├── MoveableGridIntegration.ts  # Integration with moveable library
│   ├── EditorViewMenu.ts      # View menu controls
│   ├── EditorIntegration.ts   # Main editor class
│   └── styles/
│       └── EditorGridStyles.css   # Styling for grid and controls
├── public/
│   ├── index.html            # Main HTML file
│   └── demo.html             # Demo page with examples
├── package.json
└── README.md
```

## API Reference

### GridSystem Class

```typescript
const gridSystem = new GridSystem(container, {
  enabled: true,        // Enable grid snapping
  visible: true,        // Show grid lines
  size: 20,            // Grid size in pixels
  color: '#e0e0e0',    // Grid line color
  opacity: 0.5,        // Grid line opacity
  snapThreshold: 10    // Snap distance threshold
});
```

### CanvasEditor Class

```typescript
const editor = new CanvasEditor('container-id');

// Add elements to the canvas
editor.addElement(htmlElement);

// Remove elements
editor.removeElement(htmlElement);
```

## Dependencies

- [moveable](https://www.npmjs.com/package/moveable) - For drag, resize, and rotate functionality
- TypeScript - For type safety and better development experience

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
