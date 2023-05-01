import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showDiv: boolean = true;
  emailLogin!: FormGroup
  otpLogin!: FormGroup

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) {

    this.emailLogin = this.fb.group({
      email: ['', Validators.required]
    });

    this.otpLogin = this.fb.group({
      otp: ['', Validators.required]
    })
  }

  getOtp() {
    let value = this.emailLogin.value;
    this.auth.beforeOTP(value)
      .subscribe({

        next: (res: any) => {
          this.emailLogin.reset();
          localStorage.setItem('email', value.email)
          this.showDiv = !this.showDiv;
          Swal.fire('Success', `${res.message}`, 'success')
        },
        error: (err: any) => {
          console.log(err.error.error)
          this.emailLogin.reset()
          Swal.fire('Failed', `${err.error.error}`, 'error')
        },
        complete:()=>{
          console.log('Success')
        }
      })
  }

  login(): void {
    let otp = this.otpLogin.value.otp;
    let email = localStorage.getItem('email');
    let value = { email, otp }
    this.auth.afterOTP(value).subscribe({

      next: (res: any) => {
        console.log(res)
        localStorage.setItem('accessToken', res.token)
        Swal.fire('Success', `${res.message}`, 'success')
      },
      error: (err: any) => {
        console.log(err.error.error)
        Swal.fire('Failed', `${err.error.error}`, 'error')
      },
      complete:()=>{
        if(this.auth.isAdmin()){
          this.router.navigate(['/admin']);
        }
        else{
          this.router.navigate(['/user']);

        }
      }
    })

  }

}
