import { useState } from "react";

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
