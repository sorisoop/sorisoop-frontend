import type { FairyTaleContentResponse } from "@/entities/fairy-tale/model";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { FlipBookRef } from "react-pageflip";

export interface FairyTaleReaderContextValue {
  data: FairyTaleContentResponse[];
  currentPage: number;
  isOverlayOpen: boolean;
  isBookEndOpen: boolean;
  flipBookRef: React.RefObject<FlipBookRef | null>;
  showText: boolean;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setCurrentPage: (page: number) => void;
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
  setIsBookEndOpen: Dispatch<SetStateAction<boolean>>;
  setShowText: Dispatch<SetStateAction<boolean>>;
}

export const FairyTaleReaderContext = createContext<FairyTaleReaderContextValue | null>(null);
