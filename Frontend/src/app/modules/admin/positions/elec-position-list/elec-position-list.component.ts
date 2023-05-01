import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminComponent } from '../../admin.component';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-elec-position-list',
  templateUrl: './elec-position-list.component.html',
  styleUrls: ['./elec-position-list.component.scss']
})
export class ElecPositionListComponent {

  constructor(private route: ActivatedRoute, private api: AdminService, private fb: FormBuilder, private router: Router) {
    this.positionForm = this.fb.group({
      title: ['', Validators.required]
    })
  }
  id: any
  lists: any
  positionForm!: FormGroup
  deletingItem: any = null;
  positions: any


  ngOnInit() {
    this.getByActivatedRouter();
  }

  getByActivatedRouter() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getActivePositions(this.id).subscribe((res: any) => {
      this.lists = res.data.positions;
      setTimeout(() => this.getExistingPositions()), 500

    })
  }

  getExistingPositions() {
    this.api.getPosition().subscribe((res: any) => {
      let incomingData = res.data;
      const titleSet = new Set(this.lists.map((item:any) => item.title));
      this.positions = incomingData.filter((e: any) => !titleSet.has(e.title));
    })

  }



  addItem() {
    let value = this.positionForm.value;
    this.api.addElecPosition(value,this.id).subscribe((res: any) => {
      this.positions.push(res.data)
      this.positionForm.reset();
      this.getByActivatedRouter();

    })
  }


  deleteItem(item: any) {
    this.deletingItem = item;
    this.api.deleteElecPosition(item,this.id).subscribe((res: any) => {
      console.log(res)
      setTimeout(() => {
        this.lists = this.lists.filter((e: any) => e._id !== item._id)
        this.deletingItem = null;
      }, 500)
    })
  }

  // editItem(id: any) {
  //   this.api.editPosition(id).subscribe((res: any) => {
  //     console.log(res)

  //   })
  // }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  viewItem(item: any) {
    let id = this.id
    this.router.navigate([`/admin/upcoming/${id}/candidates`])
    localStorage.setItem('pos_id', item._id)
    localStorage.setItem('position', item.title)
  }

}
