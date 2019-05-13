//Vendors
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
//Components
import { LoginComponent } from "@app/pages/login";
import { RegisterComponent } from "@app/pages/register";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
})

export class AuthorizationModule {}
