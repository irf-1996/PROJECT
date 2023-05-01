import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { CardComponent } from './units/card/card.component';
import { CandidateComponent } from './units/candidate/candidate.component';
import { NominationFormComponent } from './units/nomination-form/nomination-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserComponent,
    UserHomeComponent,
    CardComponent,
    CandidateComponent,
    NominationFormComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
