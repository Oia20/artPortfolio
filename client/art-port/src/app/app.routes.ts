import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CountdownComponent } from './countdown/countdown.component';
import { NewprojComponent } from './newproj/newproj.component';
import { LoginComponent } from './login/login.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';


export const routes: Routes = [
    {   path: 'home', 
        component: MainComponent, 
        pathMatch: 'full'
    },
    {   path: 'admin', 
        component: AdminComponent, 
        pathMatch: 'full'
    },
    {
        path: 'ily',
        component: CountdownComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'edit/:id',
        component: ProjectEditComponent
    },
    {
        path: 'new',
        component: NewprojComponent
    },
    { path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
    },
    { path: '**',
     redirectTo: 'home' 
    }
];
