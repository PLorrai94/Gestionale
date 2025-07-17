export interface AuthResponse {
  token: string;        // <-- era jwtToken
  username: string;
  email?: string;       // opzionale, se serve
  id?: number;          // opzionale, se serve
}