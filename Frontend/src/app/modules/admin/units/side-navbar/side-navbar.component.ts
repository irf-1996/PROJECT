import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent {
constructor(private router:Router){}

  loginUser: any;
  isAuthorized(): boolean {
    return true;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  toView(){}
}
