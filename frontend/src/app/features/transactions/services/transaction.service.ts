import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../../core/services/api-config.service';
import { DepositRequest, TransactionResponse, WithdrawRequest } from '../../../core/models/transaction.models';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private readonly http: HttpClient, private readonly config: ApiConfigService) {}

  deposit(payload: DepositRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(this.config.endpoints.deposit, payload);
  }

  withdraw(payload: WithdrawRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(this.config.endpoints.withdraw, payload);
  }

  history(accountNumber: string): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(`${this.config.endpoints.history}/${accountNumber}`);
  }

  getPendingApprovals(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(this.config.endpoints.pendingApprovals);
  }

  approve(transactionId: number): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(this.config.endpoints.approve(transactionId), {});
  }

  reject(transactionId: number): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(this.config.endpoints.reject(transactionId), {});
  }
}
