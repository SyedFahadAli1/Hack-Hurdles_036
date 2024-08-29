import React, { useState } from 'react';

const Sidebar = ({ addElement, setBackgroundColor, setFontStyle, setFontSize, setFontColor, applyFilter }) => {
  const [isShapesMenuOpen, setShapesMenuOpen] = useState(false);
  const [shapeColor, setShapeColor] = useState('#000000'); // Default color

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        addElement({ type: type, src: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleShapesMenu = () => {
    setShapesMenuOpen(!isShapesMenuOpen);
  };

  const shapeTypes = [
    'circle', 'rectangle', 'square', 'triangle', 'ellipse', 'pentagon', 'hexagon', 'heptagon', 'octagon', 'nonagon',
    'decagon', 'star', 'heart', 'diamond', 'cross', 'parallelogram', 'trapezoid', 'rhombus', 'kite', 'arrow',
    'crescent', 'octagram', 'trapezium', 'semi-circle', 'quarter-circle', 'right-angle', 'isosceles-triangle', 'equilateral-triangle', 'scalene-triangle', 'kite-shape', 'hexagram', 'star5', 'star6'
  ];

  return (
    <div style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '10px' }}>
      <h3>Tools</h3>
      <button onClick={() => addElement({ type: 'text', content: 'New Text', isHeader: false })}>Add Text</button>
      <button onClick={() => addElement({ type: 'text', content: 'Header', isHeader: true })}>Add Header</button>
      
      <button onClick={toggleShapesMenu}>
        Shapes {isShapesMenuOpen ? '▲' : '▼'}
      </button>
      {isShapesMenuOpen && (
        <div style={{ marginTop: '10px' }}>
          {shapeTypes.map(shape => (
            <button
              key={shape}
              onClick={() => addElement({ type: 'shape', shape, color: shapeColor })}
              style={{ display: 'block', margin: '5px 0' }}
            >
              {shape.charAt(0).toUpperCase() + shape.slice(1)}
            </button>
          ))}
        </div>
      )}
      
      <h4>Shape Color</h4>
      <input type="color" value={shapeColor} onChange={(e) => setShapeColor(e.target.value)} />

      <h4>Images & Videos</h4>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="imageUpload"
        onChange={(e) => handleFileUpload(e, 'image')}
      />
      <label htmlFor="imageUpload">
        <button>Add Image</button>
      </label>
      <input
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        id="videoUpload"
        onChange={(e) => handleFileUpload(e, 'video')}
      />
      <label htmlFor="videoUpload">
        <button>Add Video</button>
      </label>

      <h4>Background</h4>
      <input type="color" onChange={(e) => setBackgroundColor(e.target.value)} />
      
      <h4>Font</h4>
      <select onChange={(e) => setFontStyle(e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
      </select>
      <input type="number" onChange={(e) => setFontSize(e.target.value)} placeholder="Font Size" />
      <input type="color" onChange={(e) => setFontColor(e.target.value)} />
      
      <h4>Image Filters</h4>
      <button onClick={() => applyFilter('grayscale')}>Grayscale</button>
      <button onClick={() => applyFilter('sepia')}>Sepia</button>
      <button onClick={() => applyFilter('brightness')}>Brightness</button>
      
      <h4>Alignment</h4>
      <button onClick={() => addElement({ type: 'alignment', align: 'left' })}>Align Left</button>
      <button onClick={() => addElement({ type: 'alignment', align: 'center' })}>Align Center</button>
      <button onClick={() => addElement({ type: 'alignment', align: 'right' })}>Align Right</button>
    </div>
  );
};

export default Sidebar;
