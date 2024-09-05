import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { routerGuard } from './router.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [routerGuard]
    }

];
