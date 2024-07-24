import React, { useState } from 'react';
import '../../../src/style.css';
 
const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
 
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };
 
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };
 
  return (
    <div className='image-slider'>
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
      />
      <div className='slider-nav'>
        <div
          onClick={handlePrev}
          style={{
            padding: '15px', 
          }}>
          <span
            style={{
              fontWeight: '800',
              fontSize: '20px',
              color: 'white',
              cursor: 'pointer',
            }}>{`<---`}</span>
        </div>
        <div
          onClick={handleNext}
          style={{           
            padding: '15px', 
          }}>
          <span
            style={{
              fontWeight: '800',
              fontSize: '20px',
              color: 'white',
              cursor: 'pointer',
            }}>{`--->`}</span>
        </div>
      </div>
    </div>
  );
};
 
export default ImageSlider;