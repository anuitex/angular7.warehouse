//Vendors
import { Routes } from '@angular/router';
//Components
import { RegisterComponent } from '@app/pages/register';
import { LoginComponent } from '@app/pages/login';
import { AuthGuard } from '@app/shared/guards';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'library' },
    {
        path: 'register',
        canActivate: [AuthGuard], data: {role: []},
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard], data: {role: []},
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path: 'library',
        loadChildren: './library/library.module#LibraryModule'
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '/library/books' }
];


