import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  positions: any;
  alreadyVoted: Boolean = false
  constructor(private router: Router, private api: AdminService, private authApi: AuthService) { }
  userEmail: any


  ngOnInit(): void {
    this.api.getElectionList().subscribe((res: any) => {
      this.positions = res.data[0].positions;
    })
    this.userEmail = this.authApi.emailFetch();

    console.log(this.userEmail)

  }

  goto(position: any) {
    localStorage.setItem('position', position._id)
    this.router.navigate([`user/candidates/${position.title}`])
  }
}
