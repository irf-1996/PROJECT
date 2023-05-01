import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DeclareElectionComponent } from './election/declare-election/declare-election.component';
import { ListPositionsComponent } from './positions/list-positions/list-positions.component';
import { UpcomingElectionComponent } from './election/upcoming-election/upcoming-election.component';
import { ElecPositionListComponent } from './positions/elec-position-list/elec-position-list.component';
import { ListComponent } from './candidates/list/list.component';
import { PendingCandidatesComponent } from './candidates/pending-candidates/pending-candidates.component';
import { ComplaintsComponent } from './units/complaints/complaints.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {
        path: 'declare-election', component: DeclareElectionComponent
      },
      {
        path: 'positions', component: ListPositionsComponent
      },
      {
        path: 'upcoming', component: UpcomingElectionComponent
      },
      {
        path: 'upcoming/:id', component: ElecPositionListComponent
      },
      {
        path: 'upcoming/:id/candidates', component: ListComponent
      },
      {
        path: 'pending-candidates', component: PendingCandidatesComponent
      },
      {
        path: 'complaints', component: ComplaintsComponent
      },
      {
        path: 'results', component: ResultsComponent
      },
      {
        path: '', component: ComplaintsComponent
      },
      
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
