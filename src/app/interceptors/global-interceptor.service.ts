import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class GlobalInterceptorService implements HttpInterceptor {

  constructor() { }

  getToken(){
    return localStorage.getItem('token') || '';
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Crea el token para todas las peticiones HTTP
    const headers= new HttpHeaders({
      'x-token':this.getToken()
    })

    //Coloco los headers en la request
    const reqClone= req.clone({
      headers
    });

    return next.handle(reqClone).pipe(
      catchError(this.handleError)
    );
  }

   // Error handling
   handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    swal.fire('Error', `${errorMessage}`, 'error');
    return throwError(() => {
      return errorMessage;
    });
  }
}
