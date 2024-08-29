import React, { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function Editor() {
    const [slides, setSlides] = useState([{ title: '', content: '' }]);

    const handleSlideChange = (index, field, value) => {
        const updatedSlides = [...slides];
        updatedSlides[index][field] = value;
        setSlides(updatedSlides);
        socket.emit('slideUpdate', updatedSlides);
    };

    return (
        <div className="editor">
            {slides.map((slide, index) => (
                <div key={index} className="slide-editor">
                    <input
                        type="text"
                        placeholder="Slide Title"
                        value={slide.title}
                        onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                    />
                    <textarea
                        placeholder="Slide Content"
                        value={slide.content}
                        onChange={(e) => handleSlideChange(index, 'content', e.target.value)}
                    />
                </div>
            ))}
            <button onClick={() => setSlides([...slides, { title: '', content: '' }])}>Add Slide</button>
        </div>
    );
}

export default Editor;
