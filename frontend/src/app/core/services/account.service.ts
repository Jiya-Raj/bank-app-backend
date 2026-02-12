import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { Account, AccountRequest } from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly baseUrl = `${environment.apiBaseUrl}${API_ENDPOINTS.accounts.base}`;

  constructor(private readonly http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl).pipe(catchError((error) => throwError(() => error)));
  }

  createAccount(payload: AccountRequest): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, payload).pipe(catchError((error) => throwError(() => error)));
  }
}
