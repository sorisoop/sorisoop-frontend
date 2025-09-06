import { createContext } from "react";
import type { MissionStep } from "../types";

interface MissionFlowContextValue {
  step: MissionStep;
  setStep: (step: MissionStep) => void;
  stepHistory: MissionStep[];
  profileId: number | null;
  setProfileId: (id: number | null) => void;
  missionType: string | null;
  setMissionType: (type: string | null) => void;
  direction: "forward" | "backward";
  goToStep: (step: MissionStep) => void;
  goBack: () => boolean;
  resetHistory: () => void;
  missionTitle: string;
  setMissionTitle: (type: string) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  targetCategoryId: number | null;
  setTargetCategoryId: (id: number | null) => void;

  targetCount: number | null;
  setTargetCount: React.Dispatch<React.SetStateAction<number | null>>;

  targetFairyTaleIds: number[];
  setTargetFairyTaleIds: React.Dispatch<React.SetStateAction<number[]>>;

  isTransitioning: boolean;
}

export const MissionFlowContext = createContext<MissionFlowContextValue | null>(null);
