//Vendors
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
//Components
import { AppComponent } from '@app/app.component';
// Module
import { AuthorizationModule } from '@app/pages/authorization.module';
import { SharedModule } from '@app/shared/shared.module';
import { AdminModule } from '@app/admin/admin.module';
import { LibraryModule } from '@app/library/library.module';
//Routers
import { appRoutes } from './app.routing';
//Services
import { JwtInterceptor, ErrorInterceptor } from './shared/helpers';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        LibraryModule,
        SharedModule,
        AuthorizationModule,
        AdminModule,
        RouterModule.forRoot(appRoutes),
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }