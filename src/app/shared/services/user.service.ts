//Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
//Models
import { UserModel, PasswordModel, ErrorModel } from '@app/shared/models';
//Environment
import { environment } from '@environments/environment';
import { CountModel } from '@app/shared/models/count.model';
//Services
import { PropertyNameChangeHelper } from '@app/shared/services/property-name-change.service';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(
        private http: HttpClient,
        private helper: PropertyNameChangeHelper
        ) { }

    public checkUserPassword(userModel: UserModel, password: PasswordModel): Observable<{ data: UserModel, status: number }> {
        password.userModel = userModel;
        return this.http.post<{ data: UserModel, status: number }>(`${environment.apiUrl}/users/changeUserPassword`, password);
    }

    public getAll(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${environment.apiUrl}/users`)
            .pipe(map(user => {
                user = this.helper.changeKeyNameFromArray<UserModel>(user, 'id', '_id');
                return user;
            }));
    }

    public getById(id: string): Observable<UserModel> {
        return this.http.get<UserModel>(`${environment.apiUrl}/users/${id}`)
            .pipe(map(user => {
                user = this.helper.changeKeyName<UserModel>(user, 'id', '_id');
                return user;
            }));
    }

    public register(user: UserModel): Observable<UserModel> {
        return Observable.create((observer: Observer<UserModel>) => {
            this.http.post<UserModel>(`${environment.apiUrl}/users/`, user).subscribe(
                (createdUser: UserModel) => {
                    if (createdUser) {
                        observer.next(createdUser);
                        observer.complete();
                    } else {
                        observer.error('User already exist');
                    }
                },
                (err: ErrorModel<string, number>) => {
                    observer.error('User already exist');
                    throw err;
                }
            );
        });
    }

    public update(user: UserModel): Observable<UserModel> {
        return this.http.put<UserModel>(`${environment.apiUrl}/users/${user.id}`, user)
            .pipe(map(user => {
                user = this.helper.changeKeyName<UserModel>(user, 'id', '_id');
                return user;
            }));
    }

    public delete(id: string): Observable<UserModel> {
        return this.http.delete<UserModel>(`${environment.apiUrl}/users/${id}`)
            .pipe(map(user => {
                user = this.helper.changeKeyName<UserModel>(user, 'id', '_id');
                return user;
            }));
    }

    public getTotalElements(): Observable<CountModel> {
        return this.http.get<CountModel>(`${environment.apiUrl}/count/`);
    }
    public getUsersForPagination(currentPage: number, count: number): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${environment.apiUrl}/users/?page=${currentPage}&_limit=${count}`)
            .pipe(map(user => {
                user = this.helper.changeKeyNameFromArray<UserModel>(user, 'id', '_id');
                return user;
            }));
    }
}