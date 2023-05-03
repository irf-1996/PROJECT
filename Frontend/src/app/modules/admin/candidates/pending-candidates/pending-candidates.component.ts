import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-pending-candidates',
  templateUrl: './pending-candidates.component.html',
  styleUrls: ['./pending-candidates.component.scss']
})
export class PendingCandidatesComponent {


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

    this.api.getAllCandidates().subscribe((res: any) => {
      let incomingData = res.data;
      console.log(incomingData)
      this.lists = incomingData.filter((e: any) => e.approve == 'pending');
      console.log(this.lists)
    })
  }





  viewItem(item: any) {this.selected = item;
  }
  
  rejectItem(item: any) {
    let id = item._id;
    this.deletingItem = item;

    this.api.rejectCandidate(id).subscribe((res: any) => {
      console.log(res)
      setTimeout(() => {
        this.lists = this.lists.filter((e: any) => e._id !== id)
        this.deletingItem = null;
      }, 500)
    })
  }

  approveItem(item: any) {
    let id = item._id;
    this.deletingItem = item;

    this.api.approveCandidate(id).subscribe((res: any) => {
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
