export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export type UserRole = 'CLERK' | 'MANAGER';

export interface JwtPayload {
  sub: string;
  role?: UserRole;
  exp?: number;
  iat?: number;
}
