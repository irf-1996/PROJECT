import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-upcoming-election',
  templateUrl: './upcoming-election.component.html',
  styleUrls: ['./upcoming-election.component.scss']
})
export class UpcomingElectionComponent {

  editForm!: FormGroup
  deletingItem: any = null;
  lists: any
  selected: any
  constructor(private fb: FormBuilder, private router: Router, private api: AdminService) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      nomination_start: ['', Validators.required],
      nomination_end: ['', Validators.required],
      voting_start: ['', Validators.required],
      voting_end: ['', Validators.required],
      result_day: ['', Validators.required],
      positions: [[{}], Validators.required]
    })
  }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.api.getElectionList().subscribe((res: any) => {
      this.lists = res.data
    })
  }

  setValue(item: any) {
    this.selected = item;
    this.editForm.patchValue(item)
  }

  // addItem() {
  //   let value = this.positionForm.value;
  //   this.api.addPosition(value).subscribe((res: any) => {
  //     console.log(value)
  //     this.positions.push(res.data)
  //     this.positionForm.reset()
  //   })
  // }

  deleteItem(item: any) {
    let id = item._id;
    this.deletingItem = item;
    this.api.deleteElection(id).subscribe((res: any) => {
      setTimeout(() => {
        this.lists = this.lists.filter((e: any) => e._id !== id)
        this.deletingItem = null;
      }, 500)
    })
  }

  editItem(id: any) {
    let value = this.editForm.value
    this.api.editElection(id, value).subscribe((res: any) => {
      this.getdata()
    })
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  viewItem(id: any) {
    this.router.navigate([`/admin/upcoming/${id}`])
  }
}
