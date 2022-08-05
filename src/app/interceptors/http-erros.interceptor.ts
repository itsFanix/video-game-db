import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
@Injectable()
/**
 * HttpErrorsInterceptor
 */
export class HttpErrorsInterceptor implements HttpInterceptor {
  /**
   * constructor
   */
  constructor() {}

  /**
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @return {Observable<HttpEvent<any>>}
   */
  intercept(
      req: HttpRequest<any>,
      next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => new Error(JSON.stringify(err)));
        }),
    );
  }
}
