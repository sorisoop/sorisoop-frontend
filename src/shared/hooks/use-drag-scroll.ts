import { useState } from "react";

/**
 * useDragScroll
 * - 마우스로 드래그해서 스크롤할 수 있게 해주는 커스텀 훅
 *
 * @example
 * const { onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLDivElement>();
 *
 * return (
 *   <div
 *     onMouseDown={onMouseDown}
 *     onMouseMove={onMouseMove}
 *     onMouseUp={onMouseUp}
 *     style={{ overflowX: "auto", cursor: "grab" }}
 *   >
 *     { ... 컨텐츠 ... }
 *   </div>
 * );
 *
 * @returns {
 *   active,        // 드래그 활성화
 *   inActive,      // 드래그 비활성화
 *   onMouseDown,   // 드래그 시작 → 마우스 좌표/스크롤 위치 기록
 *   onMouseMove,   // 드래그 중 → 이동 거리만큼 scrollLeft 조정
 *   onMouseUp      // 드래그 종료 → 상태 초기화
 * }
 */
export const useDragScroll = <T extends HTMLElement>() => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [prevPositionX, setPrevPositionX] = useState(0);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);

  const inActive = () => setIsActive(false);
  const active = () => setIsActive(true);

  const onMouseMove: React.MouseEventHandler<T> = (e) => {
    if (isActive) {
      e.preventDefault();
      const moveX = e.clientX - mouseDownClientX;
      e.currentTarget.scrollTo(prevPositionX - moveX, 0);
    }
  };

  const onMouseDown: React.MouseEventHandler<T> = (e) => {
    e.preventDefault();
    active();
    setMouseDownClientX(e.clientX);
    setPrevPositionX(e.currentTarget.scrollLeft);
    e.currentTarget.style.cursor = "grabbing";
  };

  const onMouseUp: React.MouseEventHandler<T> = (e) => {
    inActive();
    e.currentTarget.style.cursor = "grab";
  };

  return { active, inActive, onMouseUp, onMouseDown, onMouseMove };
};
