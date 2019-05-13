//Vendors
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
//Services
import { AuthenticationService } from '@app/shared/services';
//Mofrls
import { KeyValueModel, UserAccessModel } from '@app/shared/models';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    public intercept(request: HttpRequest<KeyValueModel<UserAccessModel>>, next: HttpHandler): Observable<HttpEvent<KeyValueModel<UserAccessModel>>> {
        // add authorization header with jwt token if available
        if (localStorage.getItem('currentUser')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('currentUser') }`
                }
            });
        }

        return next.handle(request);
    }
}