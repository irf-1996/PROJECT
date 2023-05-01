import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {


  constructor(private route: ActivatedRoute, private api:SharedService, private router: Router) { }

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
    console.log( this.selected)
   
  }




}
