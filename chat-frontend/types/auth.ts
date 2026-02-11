export interface LoginResponse {
  token: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthContextType {
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
}
