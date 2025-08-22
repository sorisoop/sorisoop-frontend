import { useState, useRef } from "react";

/**
 * useDragPreventClick
 * - 드래그 동작 중 발생하는 클릭 이벤트를 방지하기 위한 훅
 *
 * @param threshold number (default: 5)
 *        드래그로 판단할 최소 이동 거리(px).
 *        (마우스 다운 지점에서 X 또는 Y가 threshold 이상 이동하면 드래그로 간주)
 *
 * @returns {
 *   handleMouseDown,  // 드래그 시작 지점 기록
 *   handleMouseMove,  // 드래그 거리 계산 → threshold 이상이면 isDragging=true
 *   handleClick,      // 드래그 중이면 클릭 이벤트 취소
 *   isDragging        // 현재 드래그 중인지 여부
 * }
 */

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
