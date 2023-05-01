import { Component } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(private router:Router){}

  navClick: boolean = false;

  showNav() {
    this.navClick = !this.navClick;
  }
  
  scroll(el: HTMLElement) {
    if(this.navClick){
      this.navClick = false;
    }
    el.scrollIntoView({ behavior: 'smooth' });
  }

  hub(){
    this.router.navigate(['/candidates-hub']) 
  }
}
