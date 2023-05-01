import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent {


  constructor( private api: SharedService) {  }
  deletingItem: any = null;
  lists: any
  selected:any={}
  
  ngOnInit() {
    this.getData();
  }


  setValue(item: any) {
    this.selected = item;
    if (!item.opened) {
      item.opened = true;
      this.api.updateComplaint(item._id).subscribe(data => {
        console.log(data);
      })
    }}


    
  getData() {
    this.api.getComplaints().subscribe((res: any) => {
      this.lists = res.data;
      console.log('dasdas',this.lists);
    })
  }

  deleteAll(){
    this.api.deleteAll().subscribe((res: any) => {
      console.log(res)
    })
  }


  deleteItem(item: any) {
    this.deletingItem = item;
    this.api.deleteComplaint(item._id).subscribe((res: any) => {
      console.log(res)
      setTimeout(() => {
        this.lists = this.lists.filter((e: any) => e._id !== item._id)
        this.deletingItem = null;
      }, 500)
    })
  }



  trackByFn(index: number, item: any) {
    return item.id;
  }

 



}
