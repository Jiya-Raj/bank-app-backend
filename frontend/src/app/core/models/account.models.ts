export interface AccountRequest {
  name: string;
  initialBalance: number;
}

export interface AccountResponse {
  accountNumber: string;
  name: string;
  balance: number;
}
