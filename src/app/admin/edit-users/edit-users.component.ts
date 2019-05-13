//Vendors
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
// Models
import { UserModel, ErrorModel, CountModel } from '@app/shared/models';
// Services
import { UserService, AuthenticationService } from '@app/shared/services';

@Component({
    templateUrl: 'edit-users.component.html',
    styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit, OnDestroy {
    public currentUser: UserModel;
    public currentUserSubscription: Subscription;
    public countTotalUsers: number;
    public users: UserModel[] = [];
    private currentPage: number = 1;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router,
        public ngxSmartModalService: NgxSmartModalService
    ) {
        this.currentUserSubscription = this.authenticationService.getCurrentUser().subscribe((user: UserModel) => {
            this.currentUser = user;
         });
        this.userService.getTotalElements().subscribe(
            (count: CountModel) => {
                this.countTotalUsers = count[0].totalCountUsers;
            },
            (err: ErrorModel<string, number>) => {throw err}
        );
    }

    public ngOnInit(): void {
        this.loadUsersForPagination(this.currentPage);
    }

    public ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }

    public editUser(index: number): void {
        this.router.navigate(['admin/edit-users/edit-user', this.users[index].id]);
    }

    public deleteUser(id: string): void {
            this.countTotalUsers -= 1;
            if (!this.countTotalUsers && this.currentPage !== 1) { this.currentPage -= 1 }
            this.userService.delete(id).pipe(first()).subscribe(() => {
                this.countTotalUsers -= 1;
                this.loadUsersForPagination(this.currentPage);
            });
    }

    private loadUsersForPagination(currentPage: number): void {
        this.userService.getUsersForPagination(currentPage, 10).subscribe(
            (data: UserModel[]) => {
                this.users = data;
            },
            (err: ErrorModel<string, number>) => {throw err}
        );
    }

    public changeCurrentPage(currentPage: number): void {
        this.currentPage = currentPage;
        this.userService.getUsersForPagination(currentPage, 10).subscribe(
            (data: UserModel[]) => { this.users = data },
            (err: ErrorModel<string, number>) => {throw err}
        );
    }

    public selectedId(id: string): void {
        this.ngxSmartModalService.resetModalData('deleteUserPopap');
        this.ngxSmartModalService.setModalData(id, 'deleteUserPopap');
    }
}