export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL';

export interface DepositRequest {
  accountNumber: string;
  amount: number;
}

export interface WithdrawRequest {
  accountNumber: string;
  amount: number;
}

export interface Transaction {
  accountNumber: string;
  transactionType: TransactionType;
  amount: number;
  status: string;
  createdAt: string;
}
