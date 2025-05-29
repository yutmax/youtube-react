import { useState } from "react";

const CustomRange = ({ volume, onVolumeChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newValue = Math.min(1, Math.max(0, offsetX / rect.width));
    onVolumeChange(newValue);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleClick(e);
    }
  };

  return (
    <div className="custom-range-track" onClick={handleClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onMouseMove={handleMouseMove}>
      <div className="custom-range-progress" style={{ width: `${volume * 100}%` }} />
    </div>
  );
};

export default CustomRange;
