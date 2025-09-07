export interface SaveReadLogRequest {
  fairyTaleType: "FAIRY_TALE" | "CUSTOM_FAIRY_TALE";
  bookId: number;
  page: number;
  logType: "READ" | "CREATE";
}
