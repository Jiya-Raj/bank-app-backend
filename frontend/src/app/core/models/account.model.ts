export interface Account {
  accountNumber: string;
  name: string;
  balance: number;
}

export interface AccountRequest {
  name: string;
  initialBalance: number;
}
