declare module "react-pageflip" {
  import * as React from "react";

  export interface HTMLFlipBookProps {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    swipeDistance?: number;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    renderOnlyPageLengthChange?: boolean;
    startPage?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    onFlip?: (e: { data: number }) => void;
    onChangeOrientation?: (e: { data: "portrait" | "landscape" }) => void;
    onChangeState?: (e: { data: string }) => void;
    onInit?: (e: { data: { page: number; mode: "portrait" | "landscape" } }) => void;
    onUpdate?: (e: { data: { page: number; mode: "portrait" | "landscape" } }) => void;
  }

  export interface PageFlip {
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    flip(page: number, corner?: "top" | "bottom"): void;
    turnToPage(page: number): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
  }

  export type FlipBookRef = {
    pageFlip(): PageFlip;
  };

  const HTMLFlipBook: React.MemoExoticComponent<
    React.ForwardRefExoticComponent<HTMLFlipBookProps & React.RefAttributes<FlipBookRef>>
  >;

  export default HTMLFlipBook;
}
