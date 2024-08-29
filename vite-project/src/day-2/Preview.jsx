import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function Preview() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        socket.on('slideUpdated', (updatedSlides) => {
            setSlides(updatedSlides);
        });
        return () => socket.off('slideUpdated');
    }, []);

    return (
        <div className="preview">
            {slides.map((slide, index) => (
                <div key={index} className="slide">
                    <h2>{slide.title}</h2>
                    <p>{slide.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Preview;
