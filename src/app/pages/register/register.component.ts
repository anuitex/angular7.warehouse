//Vendors
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
//Services
import { AlertService, UserService, AuthenticationService } from '@app/shared/services';
//Models
import { UserModel, KeyValueModel, ErrorModel } from '@app/shared/models';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    public loading: boolean = false;
    public submitted: boolean = false;
    public isUserNameExist: boolean = false;
    private user: UserModel;
    private subscribe: Subscription;

    @Input()
    titleRegisterComponent: string = 'Register';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private location: Location,
    ) {
        if (!!this.subscribe) {
            this.subscribe.unsubscribe();
        }
        this.subscribe = this.authenticationService.getCurrentUser().subscribe(
            (data: UserModel) => {
                this.user = data;
                if (!!this.subscribe) {
                    this.subscribe.unsubscribe();
                }
            }
        );
    }

    public ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(18), Validators.pattern("^[a-zA-Z]*$")]],
            lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(18), Validators.pattern("^[a-zA-Z]*$")]],
            username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern("^[[A-Za-z0-9]+]*$")]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
            role: ['user', [Validators.required]]
        });
    }

    public get f(): KeyValueModel<AbstractControl> {
        return this.registerForm.controls;
    }

    public onSubmit(): void {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.subscribe = this.userService.register(this.registerForm.value).pipe(first()).subscribe(
            (data: UserModel) => {
                this.isUserNameExist = false;
                this.alertService.success('Registration successful', true);
                if (this.router.url === '/register') {
                    this.router.navigate(['/login']);
                    this.subscribe.unsubscribe();
                } else {
                    this.location.back();
                    this.subscribe.unsubscribe();
                }
            },
            (error : ErrorModel<string, number>) => {
                this.isUserNameExist = true;
                this.loading = false;
                this.alertService.error(error.description);
            });
    }

    public redirectToLogin(): void {
        if (this.router.url === '/register') {
            this.router.navigate(['/login']);
        } else {
            this.location.back();
        }
    }
}
