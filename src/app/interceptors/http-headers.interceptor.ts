import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
/**
 * HttpHeadersInterceptor
 */
export class HttpHeadersInterceptor implements HttpInterceptor {
  /**
   * @param {HttpRequest} req
   * @param {HttpHandler} next
   * @return {Observable<HttpEvent<any>>}
   */
  intercept(
      req: HttpRequest<any>,
      next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setParams: {
        key: 'b4dae448da424d40b2a47568f61e2852',
      },
    });
    return next.handle(req);
  }
}
