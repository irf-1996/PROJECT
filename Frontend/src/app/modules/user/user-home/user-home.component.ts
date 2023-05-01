import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent {

  navClick: boolean = false;
  election: any
  positions:any
  showNominationButton:boolean=false


  constructor(private router: Router, private api: AdminService) { }


  ngOnInit() {
    this.api.getElectionList().subscribe((res: any) => {
      this.election = res.data[0]
      this.positions = res.data[0].positions
      console.log(this.positions)
      this.dateCheck(this.election)
    })
  }
  showNav() {
    this.navClick = !this.navClick;
  }

  scroll(el: HTMLElement) {

    if (this.navClick) {
      this.navClick = false;
    }
    el.scrollIntoView({ behavior: 'smooth' });
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  dateCheck(election:any):void{
    const now = new Date();
    const nominationStartDate = new Date(election.nomination_start);
    const nominationEndDate = new Date( election.nomination_end);
    if (now >= nominationStartDate && now <= nominationEndDate) {
      this.showNominationButton = true;
    }
  
    }

    hub(){
      this.router.navigate(['/candidates-hub']) 
    }

}
