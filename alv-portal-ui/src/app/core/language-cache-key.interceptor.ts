import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Base64Service } from './base64.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LANGUAGE_KEY } from './i18n.service';

@Injectable()
export class LanguageCacheKeyInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private base64: Base64Service) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest = req;

    const translateLangKey = this.cookieService.get(LANGUAGE_KEY);
    if (translateLangKey) {
      newRequest = req.clone({
        setParams: { '_ng': this.base64.encode(translateLangKey) }
      });
    }
    return next.handle(newRequest);
  }
}
