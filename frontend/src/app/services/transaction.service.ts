import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transaction } from '../models/types';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private readonly http: HttpClient) {}

  deposit(accountNumber: string, amount: number): Observable<Transaction> {
    return this.http.post<Transaction>(`${environment.apiBaseUrl}/transactions/deposit`, { accountNumber, amount });
  }

  withdraw(accountNumber: string, amount: number): Observable<Transaction> {
    return this.http.post<Transaction>(`${environment.apiBaseUrl}/transactions/withdraw`, { accountNumber, amount });
  }

  getHistory(accountNumber: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiBaseUrl}/transactions/history/${accountNumber}`);
  }
}
