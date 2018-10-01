import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SessionManagerService } from '../authentication/session-manager.service';
import { environment } from '../../../environments/environment';

export class AuthInterceptor implements HttpInterceptor {

    constructor(private sessionManagerService: SessionManagerService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (/^http/.test(request.url) &&
            !(environment.apiEndpoint && request.url.startsWith(environment.apiEndpoint)))) {
            return next.handle(request);
        }

        const token = this.sessionManagerService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }
        return next.handle(request);
    }

}
