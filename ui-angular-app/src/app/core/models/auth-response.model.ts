export interface AuthResponse {
  token: string;
  refreshToken: string;
  username: string;
  email?: string;
  id?: number;
}
