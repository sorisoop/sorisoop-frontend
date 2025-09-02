export interface NotificationResonse {
  id: number;
  customFairyTaleId: number;
  content: string;
  thumbnailImage: string;
  title: string;
  createdAt: string;
  isRead: "T" | "F";
}
