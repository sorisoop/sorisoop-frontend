export interface ProfileResponse {
  id: number;
  nickname: string;
  profileImage: string;
  role: "PARENT" | "CHILD";
  age: number;
  gender: "M" | "F";
}
