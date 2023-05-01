import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  complaintForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,  private api: SharedService) {
    this.complaintForm = this.fb.group({
      name:['', Validators.required],
      email: ['', Validators.required,Validators.email],
      message: ['', Validators.required],
      
    })
}


onSubmit(): void {

  let value = this.complaintForm.value;
  this.api.sendComplaints(value).subscribe({

    next: (res: any) => {
      this.complaintForm.reset();
      Swal.fire('Success', `${res.message}`, 'success')
    },
    error: (err: any) => {
      console.log(err.error)
      this.complaintForm.reset();
      Swal.fire('Failed', `${err.error}`, 'error')

    },
    complete:()=>{
      console.log('success')
    }
  })
}

}
