import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export abstract class HttpErrorHandler {
  constructor(private router: Router) {}

  protected handleError() {
    return (error: HttpErrorResponse): Observable<never> => {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred: ', error.error.message);
      } else {
        this.router.navigate([
          '/error',
          { message: error.error.message, statusCode: error.status},
        ]);
      }
      return throwError('Something bad happened; please try again later.');
    };
  }
}
