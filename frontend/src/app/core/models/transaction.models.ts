export interface DepositRequest {
  accountNumber: string;
  amount: number;
}

export interface WithdrawRequest {
  accountNumber: string;
  amount: number;
}

export type TransactionStatus = 'SUCCESS' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';

export interface TransactionResponse {
  id?: number;
  accountNumber: string;
  transactionType: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
}

export interface ApiProblemDetail {
  title?: string;
  detail?: string;
  message?: string;
}
