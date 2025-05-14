import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { BASE_API } from "./token/baseURL";
import { Inject } from "@angular/core";





export class ApiInterceptro implements HttpInterceptor{
   constructor(@Inject(BASE_API) private apiUrl: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!request.url.startsWith('http')) {
      
      // Clone the request and modify its URL by prepending the environment's API URL
      const apiReq = request.clone({
        url: `${this.apiUrl}/${request.url}` // Prepend the base URL
      });

      // Pass the cloned request instead of the original request
      return next.handle(apiReq).pipe(
        catchError((error: HttpErrorResponse) => {
          
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.error?.message?error.error?.message: error.message}`;
          }
          return throwError(()=>errorMsg);
        }));;
    }
    return next.handle(request);
  }

}
