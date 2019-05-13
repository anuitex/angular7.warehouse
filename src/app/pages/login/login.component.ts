//Vendors
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
//Services
import { AlertService, AuthenticationService } from '@app/shared/services';
//Models
import { UserAccessModel, KeyValueModel, ErrorModel } from '@app/shared/models';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public failToGetData: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
    ) {
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['/']);
        }
    }

    public ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    public redirectToReg(): void {
        this.router.navigateByUrl('/register');
    }

    get f(): KeyValueModel<AbstractControl> {
        return this.loginForm.controls;
     }

    public onSubmit(): void {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                (data: UserAccessModel) => {
                    if (data) {
                        this.failToGetData = false;
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.failToGetData = true;
                        this.loading = false;
                    }
                },
                (error: ErrorModel<string, number>) => {
                    this.router.navigate(['/registration']);
                    this.alertService.error(error.description);
                    this.loading = false;
                }
            );
    }
}
