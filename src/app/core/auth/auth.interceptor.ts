import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable } from 'rxjs';
import { switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const accessToken = this.authService.getAccessToken();


    let clonedRequest = req;


    if (accessToken) {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return next.handle(clonedRequest).pipe(
      catchError((error) => {

        if (error.status === 401) {

          return this.authService.refreshToken().pipe(
            switchMap((newTokens) => {
              console.log(newTokens)


              // @ts-ignore
              const newRequest = clonedRequest.clone({
                setHeaders: {
                  Authorization: `Bearer ${newTokens.access_token}`,
                },
              });
              return next.handle(newRequest);
            }),
            catchError((error) => {
              console.log("ENTRE AL ERRORRRRRRRRRRR")
              this.authService.logout();
              return error;
            }),
          );
        }
        return error;
      }),
    );
  }
}
