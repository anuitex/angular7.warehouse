//Vendors
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//Services
import { AuthenticationService } from '@app/shared/services';
//Models
import { KeyValueModel } from '@app/shared/models';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    public intercept(request: HttpRequest<KeyValueModel<number>>, next: HttpHandler): Observable<HttpEvent<KeyValueModel<number>>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                //commit temp
                // location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}