import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ProjectsComponent } from './projects/projects.component';
export const routes: Routes = [
    { path: '', component: ProjectsComponent },
    { path: '/admin', component: AdminComponent },

];
