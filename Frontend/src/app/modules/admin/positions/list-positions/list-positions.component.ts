import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-positions',
  templateUrl: './list-positions.component.html',
  styleUrls: ['./list-positions.component.scss']
})
export class ListPositionsComponent {
  positionForm!: FormGroup


  deletingItem: any = null;
  positions: any

  constructor(private fb: FormBuilder, private router: Router, private api: AdminService) {
    this.positionForm = this.fb.group({
      title: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.api.getPosition().subscribe((res: any) => {
      console.log(res);
      this.positions = res.data
    })
  }


  addItem() {
    let value = this.positionForm.value;
    this.api.addPosition(value).subscribe((res: any) => {
      console.log(value)
      this.positions.push(res.data)
      this.positionForm.reset()
    })
  }

  deleteItem(item: any) {
    let id = item._id;
    this.deletingItem = item;
    this.api.deletePosition(id).subscribe((res: any) => {
      console.log(res)
      setTimeout(()=>{
        this.positions = this.positions.filter((e: any) => e._id !== id)
        this.deletingItem = null;
      },500)
    })
  }

  editItem(id: any) {
    this.api.editPosition(id).subscribe((res: any) => {
      console.log(res)
      
    })
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

}
