import { useRef } from "react";

export function usePageDirection(pathname: string) {
  const prevDepth = useRef<number>(0);
  const prevDirection = useRef<"forward" | "backward">("forward");

  const currentDepth = pathname.split("/").filter(Boolean).length;
  let direction: "forward" | "backward" = "forward";

  if (currentDepth < prevDepth.current) {
    direction = "backward";
  } else if (currentDepth > prevDepth.current) {
    direction = "forward";
  }

  prevDepth.current = currentDepth;
  prevDirection.current = direction;

  return { direction, prevDirection: prevDirection.current };
}
