import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Candidate } from 'src/app/interface/candidate';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})



export class CandidateComponent {



  position: any
  data: any
  pos: any
  preference: Candidate[] = []
  selectedOrder: string[] = [];
  isDisabled: boolean = true;
  showVotingButton: boolean = false
  election: any
  userEmail:any
  constructor(private location: Location,private router: Router, private apiAdmin: AdminService, private api: UserService, private route: ActivatedRoute , private authApi:AuthService) { }

  ngOnInit() {
    this.position = localStorage.getItem('position')
    this.userEmail = this.authApi.emailFetch()
    this.pos = this.route.snapshot.paramMap.get('position');
    this.api.getCandidates(this.position).subscribe((res: any) => {
      this.data = res;


    })

    this.apiAdmin.getElectionList().subscribe((res: any) => {
      this.election = res.data[0];
      this.dateCheck(this.election)

    })
  }

  addto(obj: any) {
    if (!this.showVotingButton) {
      return
    }
    if (this.preference.length === 0) {
      this.preference.push(obj)
    } else {
      let alreadyVoted = false
      this.preference.forEach(res => {
        if (res === obj) {
          const newPreference = this.preference.filter(candidate => candidate !== obj)
          this.preference = newPreference
          alreadyVoted = true
        }
      })
      if (!alreadyVoted) {
        this.preference = [...this.preference, obj]
      }
    }

    this.selectedOrder = this.preference.map(e => e._id)
    if (this.selectedOrder.length > 0) { this.isDisabled = false }
    else { this.isDisabled = true }
    console.log("hi")
  }

  goBack() {
    this.router.navigate(['/user'])
  }

  abstain() {
    let email = this.userEmail
    this.selectedOrder = []
    let data = { voters: email, votes: this.selectedOrder }
    if (window.confirm("Are tou sure you want to abstain?")) {
      this.api.submitVotes(data, this.position).subscribe({

        next: (res: any) => {
          Swal.fire('Success', `${res.message}`, 'success')
        },
        error: (err: any) => {
          console.log(err.error)
          Swal.fire('Failed', `${err.error}`, 'error')
          this.location.back();
  
        },
        complete:()=>{
          this.location.back();
        }
      })
    }
  }

  reset() {
    this.preference = [];
    this.selectedOrder = []
  }

  submit() {
    let email = this.userEmail

    let data = { voters: email, votes: this.selectedOrder }
    if (window.confirm("Are tou sure you want to submit?")) {
      this.api.submitVotes(data, this.position).subscribe({

        next: (res: any) => {
          Swal.fire('Success', `${res.message}`, 'success')
        },
        error: (err: any) => {
          console.log(err.error)
          Swal.fire('Failed', `${err.error}`, 'error')
          this.location.back();
  
        },
        complete:()=>{
          this.location.back();
        }
      })
    }
  }

  dateCheck(election: any): void {
    const now = new Date();
    const votingStartDate = new Date(election.voting_start);
    const votingEndDate = new Date(election.voting_end);
    if (now >= votingStartDate && now <= votingEndDate) {
      this.showVotingButton = true;
    }

  }


}
