import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class EndpointInterceptor implements HttpInterceptor {
  public headerName = 'Authorization';
  public authScheme = 'Bearer';

  public constructor(
    private authService: AuthService,
  ) {}

  private addHeader(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers
        .set(this.headerName, this.authScheme + ' ' + this.authService.getAuthenticationToken()),
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('./assets/i18n/')) {
      return next.handle(req);
    }

    if (this.authService.isSignedIn()) {
      req = this.addHeader(req);
    }

    return next.handle(req.clone({ url: `${environment.dev}${req.url}` }));
  }
}
