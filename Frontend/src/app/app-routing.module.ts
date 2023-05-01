import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { ResultsComponent } from './modules/results/results.component';
import { CandidatesHubComponent } from './modules/candidates-hub/candidates-hub.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'results', component: ResultsComponent
  },
  {
    path: 'candidates-hub', component: CandidatesHubComponent
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
  },
  {
    path: 'admin', 
    canActivate:[RoleGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
  },
  
  // ... other routes ...
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
