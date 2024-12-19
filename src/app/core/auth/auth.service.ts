import { Injectable } from '@angular/core';
import { enviorment } from '../../../enviorments/enviorments';
import { HttpClient } from '@angular/common/http';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { catchError, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './jwt-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = enviorment.apiUrl;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{
        access_token: string;
        refresh_token: string;
      }>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((tokens) => {
          this.storeTokens(tokens.access_token, tokens.refresh_token);
        }),
        catchError((error) => {
          console.error(error);
          return error;
        }),
      );
  }

  logout(): void {
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
  }

  getAccessToken(): string {
    return this.cookieService.get('access_token');
  }

  getRefreshToken(): string {
    return this.cookieService.get('refresh_token');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  refreshToken(): Observable<unknown> {
    return this.http
      .post<{
        access_token: string;
        refresh_token: string;
      }>(`${this.apiUrl}/auth/refresh`, {
        refresh_token: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens) => {
          this.storeTokens(tokens.access_token, tokens.refresh_token);
        }),
        catchError((error) => {
          console.error(error);
          return error;
        }),
      );
  }

  getPermissions(): string[] {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return [];
    }
    const decodedToken = jwtDecode<JwtPayload>(accessToken);
    return decodedToken.permissions || [];
  }

  private storeTokens(accessToken: string, refreshToken: string): void {
    const cookieOptions: CookieOptions = {
      path: '/',
      sameSite: 'Strict',
      secure: true,
    };
    this.cookieService.set('access_token', accessToken, cookieOptions);
    this.cookieService.set('refresh_token', refreshToken, cookieOptions);
  }
}
