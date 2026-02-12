import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Account, AccountRequest } from '../models/types';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private readonly http: HttpClient) {}

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiBaseUrl}/accounts`);
  }

  createAccount(payload: AccountRequest): Observable<Account> {
    return this.http.post<Account>(`${environment.apiBaseUrl}/accounts`, payload);
  }
}
