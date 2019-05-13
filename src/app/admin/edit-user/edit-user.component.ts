//Vendors
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
//Services
import { AuthenticationService, UserService } from '@app/shared/services';
//Models
import { UserModel, UserAccessModel, ErrorModel } from "@app/shared/models";
import { KeyValueModel } from '../../shared/models/key-value.model';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  public isPageProfile: boolean;
  public editPass: boolean;
  public user: UserModel;
  public currentUser: UserModel;
  public isCurrentUserAdmin: boolean;
  public errorMessage: string;

  public editFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern("^[[A-Za-z0-9]+]*$")]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(18), Validators.pattern("^[a-zA-Z]*$")]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(18), Validators.pattern("^[a-zA-Z]*$")]),
    role: new FormControl('user', []),
  });

  public editPasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
  });

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public auth: AuthenticationService
  ) {
    this.checkCurrentUser();
    this.getUserById();
  }

  ngOnInit() { }

  private checkCurrentUser(): void {
    this.auth.checkCurrentUser().subscribe(
      (data: UserAccessModel) => {
        this.currentUser = data.userModel;
        if (!!data && data.userModel.role === 'admin') {
          this.isCurrentUserAdmin = true
        } else {
          this.isCurrentUserAdmin = false;
        }
        if (!data) {
          this.auth.logout();
          this.router.navigateByUrl('/login');
        }
        if (!!data && data.userModel.id === this.route.snapshot.params.id) {
          this.isPageProfile = true;
        }
      }
    );
  }

  private getUserById(): void {
    this.userService.getById(this.route.snapshot.params.id).subscribe((data: UserModel) => {
      this.user = data;
      this.editFormGroup.setValue({
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        role: this.user.role,
      });
    });
  }

  public saveEditForm(): void {
    if (this.editFormGroup.valid) {
      for (let data in this.editFormGroup.value) {
        if (this.editFormGroup.value[data]) {
          this.user[data] = this.editFormGroup.value[data];
        }
      }
      this.userService.update(this.user).pipe().subscribe(
        (data: UserModel) => {
          this.checkCurrentUser();
          this.router.navigateByUrl('/admin/edit-users');
        },
        (err: ErrorModel<string, number>) => {
          this.errorMessage = 'Username already exist';
        }
      );
    }
  }

  public backToPrevPage(): void {
    this.location.back();
  }

  public editPassword(): void {
    this.editPass = !this.editPass;
  }

  public savePassword(): void {
    this.userService.checkUserPassword(this.user, this.editPasswordForm.value).subscribe(
      (data: {data: UserModel, status: number}) => {
        this.editPass = false;
        if (data.status === 201) {
          this.user = data.data;
          this.getUserById();
        }
      },
      (err: ErrorModel<string, number>) => { throw err.data }
    );
  }
}
