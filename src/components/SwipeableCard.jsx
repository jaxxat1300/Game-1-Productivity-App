import React, { useState, useRef } from 'react';

const SwipeableCard = ({ children, onSwipeLeft, onSwipeRight, className = '' }) => {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    setCurrentX(x - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    if (currentX > threshold && onSwipeRight) {
      onSwipeRight();
    } else if (currentX < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }
    
    setCurrentX(0);
    setIsDragging(false);
  };

  const transform = isDragging ? `translateX(${currentX}px)` : 'translateX(0)';
  const opacity = isDragging ? 1 - Math.abs(currentX) / 300 : 1;

  return (
    <div
      ref={cardRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform,
        opacity,
        transition: isDragging ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default SwipeableCard;

