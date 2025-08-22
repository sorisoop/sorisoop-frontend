import { useState, useRef } from "react";

export const useDragPreventClick = (threshold = 5) => {
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(false);

    if ("touches" in e) {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
    } else {
      startX.current = e.clientX;
      startY.current = e.clientY;
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX = 0,
      clientY = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const dx = Math.abs(clientX - startX.current);
    const dy = Math.abs(clientY - startY.current);
    if (dx > threshold || dy > threshold) {
      setIsDragging(true);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleClick,
    isDragging,
  };
};
