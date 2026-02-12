import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { DepositRequest, Transaction, WithdrawRequest } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private readonly http: HttpClient) {}

  deposit(payload: DepositRequest): Observable<Transaction> {
    return this.http
      .post<Transaction>(`${environment.apiBaseUrl}${API_ENDPOINTS.transactions.deposit}`, payload)
      .pipe(catchError((error) => throwError(() => error)));
  }

  withdraw(payload: WithdrawRequest): Observable<Transaction> {
    return this.http
      .post<Transaction>(`${environment.apiBaseUrl}${API_ENDPOINTS.transactions.withdraw}`, payload)
      .pipe(catchError((error) => throwError(() => error)));
  }

  getHistory(accountNumber: string): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${environment.apiBaseUrl}${API_ENDPOINTS.transactions.history(accountNumber)}`)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
