//Vendors
import { Component } from "@angular/core";
import { Router } from "@angular/router";
//Services
import { AuthenticationService } from "@app/shared/services";
//Models
import { UserModel } from "@app/shared/models";
import { RoleEnum } from "@app/shared/enums";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    public currentUser: UserModel;
    public isAdmin: boolean;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {

        this.authenticationService.getCurrentUser().subscribe(
            (data: UserModel) => {
                this.currentUser = data;
                if (data.role === RoleEnum.admin) {
                    this.isAdmin = true;
                } else {
                    this.isAdmin = false;
                }
            }
        );
    }

    public logout(): void {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    public navigateToLibrary(): void {
        this.router.navigate(['/library/books']);
    }

    public navigateToAdmin(): void {
        this.router.navigate(['/admin']);
    }

    public navigateToUserProfile() {
        this.router.navigate([`/library/setting-user/${this.currentUser.id}`]);
    }

}
