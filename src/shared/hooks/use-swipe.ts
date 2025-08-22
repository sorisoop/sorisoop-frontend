import { useRef } from "react";

interface UseSwipeOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
  enabled?: boolean;
}

/**
 * useSwipe
 *
 * 모바일 환경에서 터치 스와이프 이벤트를 감지해 좌/우 콜백을 실행하는 훅.
 *
 * 사용 예시:
 * ```tsx
 * const { handleTouchStart, handleTouchEnd } = useSwipe({
 *   onSwipeLeft: () => console.log("다음 페이지"),
 *   onSwipeRight: () => console.log("이전 페이지"),
 *   threshold: 80,
 *   enabled: true,
 * });
 *
 * <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} />
 * ```
 */
export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50, enabled = true }: UseSwipeOptions) {
  const startX = useRef(0);
  const startY = useRef(0);

  /**
   * 터치 시작 좌표 저장
   */
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!enabled) return;
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
  };

  /**
   * 터치 종료 시 방향 계산 후 콜백 실행
   */
  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!enabled) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - startX.current;
    const dy = touch.clientY - startY.current;

    // 수평 이동이 threshold보다 크고, 수직보다 강할 때만 스와이프 처리
    if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) onSwipeRight();
      else onSwipeLeft();
    }
  };

  return { handleTouchStart, handleTouchEnd };
}
