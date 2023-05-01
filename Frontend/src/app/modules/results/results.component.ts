import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  constructor(private router:Router, private api:SharedService) { }


  lists: any;
  id: any;
  pos_id: any;
  deletingItem: any = null;
  selected:any={}


  ngOnInit() {
    this.getCandidates();
  }
  getCandidates() {
    this.api.getWinnerCandidates().subscribe((res: any) => {
      this.lists = res.data
      console.log(this.lists)
    })
  }

  viewItem(item: any) { 
    this.selected = item.winner;
   
  }

  goBack() {
    this.router.navigate(['/'])
  }
}
