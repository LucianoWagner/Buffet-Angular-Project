import { Injectable } from '@angular/core';
import { enviorment } from '../../../enviorments/enviorments';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './jwt-payload.interface';
import { Tokenresponse } from '../../models/tokenresponse';
import { TuiFileLike } from '@taiga-ui/kit';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = enviorment.apiUrl;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  login(
    email: string,
    password: string,
  ): Observable<{ access_token: string; refresh_token: string }> {
    return this.http
      .post<{
        access_token: string;
        refresh_token: string;
      }>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((tokens) => {
          this.storeTokens(tokens.access_token, tokens.refresh_token);
        }),
        catchError((error: HttpErrorResponse) => {
          let message = 'Login failed';
          if (error?.error?.status === 403) {
            message = 'La combinación de correo y contraseña no es válida';
          }

          return throwError(() => new Error(message));
        }),
      );
  }

  register(
    dni: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    avatar?: File,
    role = 'CLIENT',
  ): Observable<any> {
    const formData = new FormData();
    formData.append('dni', dni);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    if (avatar) {
      console.log('Entre');
      formData.append('image', avatar);
    }

    return this.http
      .post<{
        message: string;
      }>(`${this.apiUrl}/auth/register`, formData)
      .pipe(
        tap((response) => {
          console.log('User registered successfully:', response.message);
        }),
        catchError((error) => {
          let message = 'Ha ocurrido un error. Intente de nuevo';
          if (error.error.errorCode === 'EMAIL_YA_EXISTENTE') {
            message = 'Este correo ya está registrado';
          } else if (error.error.errorCode === 'DNI_YA_EXISTENTE') {
            message = 'Este DNI ya está registrado';
          } else {
            message = 'Ha ocurrido un error. Intente de nuevo';
          }

          return throwError(() => new Error(message));
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

  refreshToken(): Observable<Tokenresponse> {
    return this.http
      .post<Tokenresponse>(`${this.apiUrl}/auth/refresh`, {
        refresh_token: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens) => {
          this.storeTokens(tokens.access_token, tokens.refresh_token);
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

  getRole(): string {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return '';
    }
    const decodedToken = jwtDecode<JwtPayload>(accessToken);
    return decodedToken.role || '';
  }

  hasPermission(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }

  getUsername(): string {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return '';
    }
    const decodedToken = jwtDecode<JwtPayload>(accessToken);
    return decodedToken.sub;
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      console.log('UNAUTHORIZED');
    }
    return throwError(() => error);
  }
}
