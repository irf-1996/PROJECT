import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-voting-explained',
  templateUrl: './voting-explained.component.html',
  styleUrls: ['./voting-explained.component.scss','../../../assets/styles/global_style.scss']
})
export class VotingExplainedComponent {


  showNominationButton:Boolean = false;
  showVotingButton:Boolean = false;
  showResultsButton:Boolean = false;

  constructor(private router: Router, private api:AdminService) { }
  election:any={}

  goto() {
   this.router.navigate(['/user/nomination']) 
  }

  results() {
    this.router.navigate(['/results']) 
   }

  ngOnInit() {
    this.api.getElectionList().subscribe((res: any) => {
      this.election = res.data[0];
      this.dateCheck(this.election)
    })
  }

  dateCheck(election:any):void{
    const now = new Date();
    const nominationStartDate = new Date(election.nomination_start);
    const nominationEndDate = new Date( election.nomination_end);
    const votingStartDate = new Date(election.voting_start);
    const votingEndDate = new Date(election.voting_end );
    const resultDay = new Date(election.result_day);

    console.log(now,nominationStartDate,nominationEndDate,votingEndDate)

    if (now >= nominationStartDate && now <= nominationEndDate) {
      this.showNominationButton = true;
    }
    if (now >= votingStartDate && now <= votingEndDate) {
      this.showVotingButton = true;
    }

    if (now >= resultDay) {
      this.showResultsButton = true;
    }

  }

  login(){
    this.router.navigate(['/login']) 
  }
  hub(){
    this.router.navigate(['/candidates-hub']) 
  }
}
