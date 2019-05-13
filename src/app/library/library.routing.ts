//Vendors
import { Routes } from '@angular/router';
//Components
import { MainLibraryComponent } from "@app/shared/containers/library-layout/main-library.component";
import { LibraryComponent } from '@app/library/library/library.component';
import { BookComponent } from '@app/library/book/book.component';
import { EditUserComponent } from '@app/admin/edit-user/edit-user.component';
//Guards
import { AuthGuard } from '@app/shared/guards';
import { RoleEnum } from '@app/shared/enums/role.enum';

export const libraryRoutes: Routes = [
    
    {
        path: 'library', component: MainLibraryComponent, canActivate: [AuthGuard], data: {role: [RoleEnum.admin, RoleEnum.user]}, children: [
            {
                path: '', pathMatch: 'full', redirectTo: 'books'
            }, {
                path: 'books',
                component: LibraryComponent
            }, {
                path: 'books/:id',
                component: BookComponent
            }, {
                path: 'setting-user/:id',
                component: EditUserComponent
            }, {
                path: '**', redirectTo: '/library/books'
            },
        ]
    },
];
