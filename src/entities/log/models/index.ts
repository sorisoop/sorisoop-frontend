export interface SaveReadLogRequest {
  fairyTaleType: "FAIRY_TALE" | "CUSTOM_FAIRY_TALE";
  bookId: number | null;
  page: number | null;
  logType: "READ" | "CREATE";
}
