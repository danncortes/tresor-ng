import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from './services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public tokenService: TokenService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.tokenService.getToken();
        const masterp = sessionStorage.getItem('masterp');

        if (token && masterp) {
            return next.handle(request.clone(
                    {
                        headers: request.headers.set('Authorization', `Bearer ${token}`).set('masterp', masterp)
                    }
                )
            );
        }

        return next.handle(request);
    }
}
