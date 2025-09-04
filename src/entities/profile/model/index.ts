export interface ProfileResponse {
  id: number;
  nickname: string;
  profileImage: string;
  role: "PARENT" | "CHILD";
  age: number;
  gender: "M" | "F";
}

export interface SelectProfileSubmit {
  profileId: number;
  password: string | null;
}
