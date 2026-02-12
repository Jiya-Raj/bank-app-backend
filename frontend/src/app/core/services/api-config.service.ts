import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiConfigService {
  readonly baseUrl = environment.apiBaseUrl;
  readonly endpoints = {
    login: `${this.baseUrl}/auth/login`,
    accounts: `${this.baseUrl}/accounts`,
    deposit: `${this.baseUrl}/transactions/deposit`,
    withdraw: `${this.baseUrl}/transactions/withdraw`,
    history: `${this.baseUrl}/transactions/history`,
    pendingApprovals: `${this.baseUrl}/transactions/pending`,
    approve: (id: number) => `${this.baseUrl}/transactions/${id}/approve`,
    reject: (id: number) => `${this.baseUrl}/transactions/${id}/reject`
  };
}
