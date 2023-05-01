import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SideNavbarComponent } from './units/side-navbar/side-navbar.component';
import { DeclareElectionComponent } from './election/declare-election/declare-election.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListPositionsComponent } from './positions/list-positions/list-positions.component';
import { UpcomingElectionComponent } from './election/upcoming-election/upcoming-election.component';
import { ElecPositionListComponent } from './positions/elec-position-list/elec-position-list.component';
import { ListComponent } from './candidates/list/list.component';
import { SharedModule } from "../../shared/shared.module";
import { PendingCandidatesComponent } from './candidates/pending-candidates/pending-candidates.component';
import { ComplaintsComponent } from './units/complaints/complaints.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ResultsComponent } from './results/results.component';



@NgModule({
    declarations: [
        AdminComponent,
        SideNavbarComponent,
        DeclareElectionComponent,
        ListPositionsComponent,
        UpcomingElectionComponent,
        ElecPositionListComponent,
        ListComponent,
        PendingCandidatesComponent,
        ComplaintsComponent,
        ResultsComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        SharedModule,
        NgMultiSelectDropDownModule.forRoot()
    ]
})
export class AdminModule { }
