import React, { useState } from 'react';
import Draggable from 'react-draggable';

const Canvas = ({ elements, updateElement, deleteElement, backgroundColor }) => {
  const handleTextChange = (e, elementId) => {
    updateElement(elementId, { content: e.target.textContent });
  };

  const handleFocus = (e, elementId) => {
    if (e.target.textContent === 'Add Text') {
      updateElement(elementId, { content: '' });
    }
  };

  const handleBlur = (e, elementId) => {
    if (e.target.textContent === '') {
      updateElement(elementId, { content: 'Add Text' });
    }
  };

  return (
    <div style={{ flexGrow: 1, backgroundColor: backgroundColor || '#fff', position: 'relative' }}>
      {elements.map((el) => (
        <Draggable key={el.id}>
          <div
            style={{
              position: 'absolute',
              left: el.left || '100px',
              top: el.top || '100px',
              border: el.type === 'text' ? '1px solid #000' : 'none',
              padding: '10px',
              width: el.type === 'text' ? 'auto' : '100px',
              height: el.type === 'text' ? 'auto' : '100px',
              backgroundColor: el.type === 'shape' ? (el.shape === 'circle' ? 'lightblue' : 'grey') : 'transparent',
              borderRadius: el.type === 'shape' && el.shape === 'circle' ? '50%' : '0%',
              fontFamily: el.style?.fontFamily,
              fontSize: el.style?.fontSize,
              color: el.style?.color,
              filter: el.type === 'image' && el.filter ? `${el.filter}(100%)` : 'none',
            }}
            contentEditable={el.type === 'text'}
            suppressContentEditableWarning={true}
            onInput={(e) => handleTextChange(e, el.id)}
            onFocus={(e) => handleFocus(e, el.id)}
            onBlur={(e) => handleBlur(e, el.id)}
          >
            {el.type === 'text' && el.content}
            {el.type === 'image' && <img src={el.src} alt="Uploaded" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
            {el.type === 'shape' && el.shape === 'triangle' && (
              <svg width="100" height="100">
                <polygon points="50,15 100,85 0,85" style={{ fill: 'grey' }} />
              </svg>
            )}
            <button
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
              onClick={() => deleteElement(el.id)}
            >
              X
            </button>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default Canvas;
