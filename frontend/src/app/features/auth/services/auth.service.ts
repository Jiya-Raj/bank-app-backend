import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiConfigService } from '../../../core/services/api-config.service';
import { JwtPayload, LoginRequest, LoginResponse, UserRole } from '../../../core/models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'bank.jwt.token';
  private readonly role$ = new BehaviorSubject<UserRole | null>(null);
  private readonly username$ = new BehaviorSubject<string | null>(null);
  private inMemoryToken: string | null = null;

  constructor(private readonly http: HttpClient, private readonly apiConfig: ApiConfigService) {
    const stored = localStorage.getItem(this.tokenKey);
    if (stored) {
      this.setSession(stored, false);
    }
  }

  login(payload: LoginRequest, remember = true): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiConfig.endpoints.login, payload).pipe(
      tap((response) => this.setSession(response.token, remember))
    );
  }

  logout(): void {
    this.inMemoryToken = null;
    localStorage.removeItem(this.tokenKey);
    this.role$.next(null);
    this.username$.next(null);
  }

  getToken(): string | null {
    return this.inMemoryToken;
  }

  isLoggedIn(): boolean {
    return !!this.inMemoryToken;
  }

  userRole$(): Observable<UserRole | null> {
    return this.role$.asObservable();
  }

  getCurrentRole(): UserRole | null {
    return this.role$.value;
  }

  getCurrentUsername(): string | null {
    return this.username$.value;
  }

  hasRole(roles: UserRole[]): boolean {
    const role = this.getCurrentRole();
    return role ? roles.includes(role) : false;
  }

  private setSession(token: string, persist: boolean): void {
    this.inMemoryToken = token;
    if (persist) {
      localStorage.setItem(this.tokenKey, token);
    }
    const payload = this.decode(token);
    this.role$.next(payload.role ?? null);
    this.username$.next(payload.sub ?? null);
  }

  private decode(token: string): JwtPayload {
    try {
      const payload = token.split('.')[1] ?? '';
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return { sub: '' };
    }
  }
}
