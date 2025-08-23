export interface CustomerKeyResponse {
  customerKey: string;
}

export interface SignupRequest {
  name: string;
  birth: string;
  email: string;
  password: string;
}

export interface CheckEmailResponse {
  email: string;
}
