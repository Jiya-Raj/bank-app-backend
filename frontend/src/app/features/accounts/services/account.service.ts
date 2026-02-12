import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../../core/services/api-config.service';
import { AccountRequest, AccountResponse } from '../../../core/models/account.models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private readonly http: HttpClient, private readonly config: ApiConfigService) {}

  getAccounts(): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(this.config.endpoints.accounts);
  }

  createAccount(payload: AccountRequest): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(this.config.endpoints.accounts, payload);
  }
}
