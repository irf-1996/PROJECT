import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { VotingExplainedComponent } from './voting-explained/voting-explained.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFormatterPipe } from '../pipes/date-formatter.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    FooterComponent,
    VotingExplainedComponent,
    DateFormatterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
    
  ],
  exports:[
    FooterComponent,
    VotingExplainedComponent,
    FormsModule,
    ReactiveFormsModule,
    DateFormatterPipe,
    SweetAlert2Module
    
  ]
})
export class SharedModule { }
