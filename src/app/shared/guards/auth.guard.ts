//Vendors
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Observer } from 'rxjs';
//Services
import { AuthenticationService } from '@app/shared/services';
//Models
import { UserAccessModel, ErrorModel } from 'app/shared/models';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return Observable.create((observer: Observer<boolean>) => {
            this.authenticationService.checkCurrentUser().subscribe(
                (data: UserAccessModel) => {
                    if(!data) {
                        this.authenticationService.logout();
                        return false;
                    }
                    localStorage.setItem('currentUser', data.newToken);
                    this.authenticationService.dispatch(data.userModel);
                    if (route.data.role.indexOf(data.userModel.role) !== -1){
                        observer.next(true);
                        observer.complete();
                    } else {
                        observer.next(false);
                        this.router.navigate(['/']);
                        observer.complete();
                    }
                },
                (error: ErrorModel<string, number>) => {
                    if(state.url === '/login' || state.url === '/register') {
                        observer.next(true);
                    } else {
                        observer.next(false);
                        this.router.navigate(['/login']);
                    }
                }
            );
        });
    }
}