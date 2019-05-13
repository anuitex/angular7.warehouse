//Vendors
import { Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/guards';
//Components
import { AdminComponent } from '@app/shared/containers/admin-layout/admin.component';
import { EditUsersComponent } from '@app/admin/edit-users';
import { AddNewUserComponent } from '@app/admin/add-new-user/add-new-user.component';
import { SettingLibraryComponent } from '@app/admin/setting-library/setting-library.component';
import { SettingAuthorsComponent } from '@app/admin/setting-authors/setting-authors.component';
import { SettingBookComponent } from '@app/admin/setting-book/setting-book.component';
import { EditUserComponent } from '@app/admin/edit-user/edit-user.component';
// Enum
import { RoleEnum } from '@app/shared/enums/role.enum';

export const adminRoutes: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {role: [RoleEnum.admin]}, children: [
        { path: '', pathMatch: 'full', redirectTo: 'edit-users' },
        { path: 'edit-users', component: EditUsersComponent },
        { path: 'edit-users/edit-user/:id', component: EditUserComponent },
        { path: 'edit-users/add-new-user', component: AddNewUserComponent },
        { path: 'setting', component: SettingLibraryComponent },
        { path: 'edit-authors', component: SettingAuthorsComponent },
        { path: 'setting/add-new-book', component: SettingBookComponent, pathMatch: 'full' },
        { path: 'setting/:book', component: SettingBookComponent },
        { path: '**', redirectTo: 'edit-users' }
    ]},
];
