import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { LoginService } from "../services/Login/login.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthIntercetorInterceptor implements HttpInterceptor {
  isUserRefreshing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private authService: LoginService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.UserLoggedIn()) {
      
      if (this.authService.isTokenExpired()) {
        this.authService.LogOut();
        this.router.navigate(['/']);
        return throwError(() => new Error('Token expired'));
      }


      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getAccessToken())
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.authService.UserLoggedIn()) {
          if (!this.isUserRefreshing.value) {
            this.isUserRefreshing.next(true);
            return this.authService.refreshUser().pipe(
              switchMap(success => {
                this.isUserRefreshing.next(false);
                if (success) {
                  const newReq = request.clone({
                    headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getAccessToken())
                  });
                  return next.handle(newReq);
                } else {
                  this.authService.LogOut();
                  return throwError(() => error);
                }
              }),
              catchError(refreshErr => {
                this.isUserRefreshing.next(false);
                this.authService.LogOut();
                return throwError(() => refreshErr);
              })
            );
          }

          return this.isUserRefreshing.pipe(
            filter(val => val === false),
            take(1),
            switchMap(() => {
              const newReq = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getAccessToken())
              });
              return next.handle(newReq);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
