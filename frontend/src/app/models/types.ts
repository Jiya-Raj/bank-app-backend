export type Role = 'MANAGER' | 'CLERK';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Account {
  accountNumber: string;
  name: string;
  balance: number;
}

export interface AccountRequest {
  name: string;
  initialBalance: number;
}

export interface Transaction {
  accountNumber: string;
  transactionType: string;
  amount: number;
  status: string;
  createdAt: string;
}
