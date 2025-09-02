export interface NotificationResonse {
  id: number;
  customFairyTaleId: number | null;
  content: string;
  createdAt: string;
  isRead: "T" | "F";
}
