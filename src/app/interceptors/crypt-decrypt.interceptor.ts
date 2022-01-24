import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { cryptDataObj } from '../utils/cryptDecrypt';
import { UserService } from '../services/user.service';
import { CredentialCrypt } from '../models/credential.model';

const { apiUrl } = environment;

interface Req extends Request, CredentialCrypt {
}

@Injectable()
export class CryptDecryptInterceptor implements HttpInterceptor {

  constructor(public userService: UserService
  ) {
  }

  intercept(request: HttpRequest<Req>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { method, url } = request;

    if (method === 'POST' && url === `${apiUrl}/credential`) {
      const masterp = request.headers.get('masterp');

      if (request.body && masterp) {
        return next.handle(request.clone({
          body: {
            ...request.body,
            data: cryptDataObj(request.body.data, masterp)
          }
        }));
      }

    }

    return next.handle(request);
  }
}
