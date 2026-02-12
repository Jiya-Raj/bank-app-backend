export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface JwtClaims {
  sub: string;
  role?: string;
  exp?: number;
}
