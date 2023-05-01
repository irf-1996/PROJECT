import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { CandidateComponent } from './units/candidate/candidate.component';
import { NominationFormComponent } from './units/nomination-form/nomination-form.component';



const routes: Routes = [
  {
    path:'',component:UserHomeComponent
  },
  
  {
    path:'candidates/:position',component:CandidateComponent
  },
  {
    path:'nomination',component:NominationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
