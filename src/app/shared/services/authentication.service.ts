//Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//Environment
import { environment } from '@environments/environment';
//Models
import { UserModel, UserAccessModel } from '@app/shared/models';
//Services
import { PropertyNameChangeHelper } from '@app/shared/services/property-name-change.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;

    public user: UserModel;
    public userBS: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(this.user);

    constructor(
        private http: HttpClient,
        private helper: PropertyNameChangeHelper
    ) {
        try {
            this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
        } catch {
            // localStorage.removeItem('currentUser');
        }
    }

    public checkCurrentUser(): Observable<UserAccessModel> {
        return this.http.get<UserAccessModel>(`${environment.apiUrl}/auth/verify`)
            .pipe(map(user => {
                user.userModel = this.helper.changeKeyName<UserModel>(user.userModel, 'id', '_id');
                return user;
            }));
    }

    public login(username: string, password: string): Observable<UserAccessModel> {
        return this.http.post<UserAccessModel>(`${environment.apiUrl}/auth/login`, { username, password })
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', user.accessToken);
                }
                return user;
            }));
    }

    public logout(): void {
        localStorage.removeItem('currentUser');
    }

    public getCurrentUser(): Observable<UserModel> {
        return this.userBS.asObservable();
    }

    public dispatch(user: UserModel): void {
        this.next(user);
    }

    private next(user: UserModel): void {
        this.user = user;
        this.userBS.next(user);
    }
}