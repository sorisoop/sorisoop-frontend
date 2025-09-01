import { useContext } from "react";
import { NotificationContext } from "../contexts";

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};
