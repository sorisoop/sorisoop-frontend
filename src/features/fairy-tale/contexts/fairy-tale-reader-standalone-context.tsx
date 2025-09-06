import { createContext, type Dispatch, type SetStateAction } from "react";
import type { FlipBookRef } from "react-pageflip";
import type { FairyTaleContentResponse } from "@/entities/fairy-tale/model";

export interface FairyTaleReaderStandaloneContextValue {
  data: FairyTaleContentResponse[];
  isOverlayOpen: boolean;
  isBookEndOpen: boolean;
  flipBookRef: React.RefObject<FlipBookRef | null>;
  showText: boolean;
  currentPage: number;

  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;

  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
  setIsBookEndOpen: Dispatch<SetStateAction<boolean>>;
  setShowText: Dispatch<SetStateAction<boolean>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const FairyTaleReaderStandaloneContext = createContext<FairyTaleReaderStandaloneContextValue | null>(null);
