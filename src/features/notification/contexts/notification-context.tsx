import { createContext } from "react";

export interface NotificationContextType {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  messages: string[];
}

export const NotificationContext = createContext<NotificationContextType | null>(null);
