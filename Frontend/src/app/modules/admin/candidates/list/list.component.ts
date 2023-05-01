import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(private route: ActivatedRoute, private api: AdminService, private router: Router) { }

  lists: any;
  id: any;
  pos_id: any;
  deletingItem: any = null;
  selected:any={}

  ngOnInit() {
    this.getCandidates();
  }

  getCandidates() {
    this.pos_id = localStorage.getItem('pos_id');

    this.api.getActiveCandidates(this.pos_id).subscribe((res: any) => {
      this.lists = res
      console.log(this.lists)
    })
  }





  viewItem(item: any) { 
    this.selected = item;
   
  }

  deleteItem(item: any) {
    let id = item._id;
    this.deletingItem = item;

    this.api.deleteCandidate( this.pos_id, id).subscribe((res: any) => {
      console.log(res)
      setTimeout(() => {
        this.lists = this.lists.filter((e: any) => e._id !== id)
        this.deletingItem = null;
      }, 500)
    })
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
