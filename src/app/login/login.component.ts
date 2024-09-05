import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastrModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  authenticationForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private _user: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.setAttr();
  }

  setAttr() {
    this.authenticationForm = this._fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  registerUser() {

    if (!this.authenticationForm.valid) {
      this.toastr.error('Please provide valid username and password', 'Attention Required');
    } else {

      this._user.registerUser(this.authenticationForm.value).subscribe((res) => {
        const { message } = res;
        this.toastr.success(message, 'Congrats!')
      }, error => this.toastr.error(error.error.message, 'Attention Required'))

    }

  }

  authenticateUser() {

    if (!this.authenticationForm.valid) {
      this.toastr.error('Please provide valid username and password', 'Attention Required');
    } else {

      this._user.authenticateUser(this.authenticationForm.value).subscribe((res) => {
        console.log(res);
        const { message, data } = res;
        localStorage.setItem('token', data.token);
        this.toastr.success(`Dear, ${data.username}`, 'Welcome Back!')
        this._router.navigate(['home'])
      }, error => this.toastr.error(error.error.message, 'Attention Required'))

    }

  }
}
