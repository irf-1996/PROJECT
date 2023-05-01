import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-declare-election',
  templateUrl: './declare-election.component.html',
  styleUrls: ['./declare-election.component.scss']
})
export class DeclareElectionComponent {

  selectedPositions: any
  electionForm!: FormGroup;

  // test 
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  // test 

  constructor(private fb: FormBuilder, private router: Router, private api: AdminService) {
    this.electionForm = this.fb.group({
      title: ['', Validators.required],
      nomination_start: ['', Validators.required],
      nomination_end: ['', Validators.required],
      voting_start: ['', Validators.required],
      voting_end: ['', Validators.required],
      result_day: ['', Validators.required],
      positions: [[{}], Validators.required]
    })



  }



  onSubmit(): void {

    // this.electionForm.value.positions = this.selectedItems
    console.log(this.electionForm.value)
    let value = this.electionForm.value;
    this.api.declareElection(value).subscribe(res => {
      console.log(res)
      this.router.navigate(['/admin'])
    })
  }




  ngOnInit() {

    this.api.getPosition().subscribe((res: any) => {
      console.log(res);
      let allData = res.data
      this.selectedPositions = allData.filter((e: any) => e.status);
      this.dropdownList = this.selectedPositions //test

    })
    //! test 
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


}
