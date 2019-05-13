//Vendors
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AuthorizationModule } from "@app/pages/authorization.module";
import { SharedModule } from "@app/shared/shared.module";
//Components
import { SettingBookComponent } from "@app/admin/setting-book/setting-book.component";
import { AdminComponent } from '@app/shared/containers/admin-layout/admin.component';
import { AddNewUserComponent } from "@app/admin/add-new-user/add-new-user.component";
import { SettingAuthorsComponent } from '@app/admin/setting-authors/setting-authors.component';
import { SettingLibraryComponent } from "@app/admin/setting-library/setting-library.component";
import { EditUserComponent } from '@app/admin/edit-user/edit-user.component';
import { EditUsersComponent } from "@app/admin/edit-users";
//Routing
import { adminRoutes } from "@app/admin/admin.routing";
import { NgxSmartModalModule } from "ngx-smart-modal";

@NgModule({
    declarations: [
        AdminComponent,
        EditUsersComponent,
        SettingLibraryComponent,
        SettingBookComponent,
        AddNewUserComponent,
        EditUserComponent,
        SettingAuthorsComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        AuthorizationModule,
        RouterModule.forChild(adminRoutes),
        NgxSmartModalModule.forChild()
    ],
    exports: [
        AdminComponent,
        EditUsersComponent,
        SettingLibraryComponent,
        AddNewUserComponent,
        SettingAuthorsComponent,
        EditUserComponent,
        RouterModule
    ]
})

export class AdminModule {}
