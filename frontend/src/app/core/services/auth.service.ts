import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { JwtClaims, LoginRequest, LoginResponse } from '../models/auth.model';
import { parseJwt } from '../utils/jwt.util';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenStorageKey = 'bank.jwt';
  private readonly tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem(this.tokenStorageKey));
  private readonly claimsSubject = new BehaviorSubject<JwtClaims | null>(this.getStoredClaims());

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginRequest, remember = true): Observable<void> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}${API_ENDPOINTS.auth.login}`, payload).pipe(
      map((response) => {
        const token = response.token;
        this.tokenSubject.next(token);
        this.claimsSubject.next(parseJwt(token));
        if (remember) {
          localStorage.setItem(this.tokenStorageKey, token);
        } else {
          localStorage.removeItem(this.tokenStorageKey);
        }
      }),
      catchError((error) => throwError(() => error))
    );
  }

  logout(): void {
    this.tokenSubject.next(null);
    this.claimsSubject.next(null);
    localStorage.removeItem(this.tokenStorageKey);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getRole(): string | null {
    return this.claimsSubject.value?.role ?? null;
  }

  getUsername(): string | null {
    return this.claimsSubject.value?.sub ?? null;
  }

  isAuthenticated(): boolean {
    const claims = this.claimsSubject.value;
    if (!claims?.exp) {
      return Boolean(this.tokenSubject.value);
    }
    const expiresAtMs = claims.exp * 1000;
    return Date.now() < expiresAtMs;
  }

  hasRole(roles: string[]): boolean {
    const role = this.getRole();
    return role ? roles.includes(role) : false;
  }

  private getStoredClaims(): JwtClaims | null {
    const token = localStorage.getItem(this.tokenStorageKey);
    return token ? parseJwt(token) : null;
  }
}
