
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent  {
  loginError = '';

  cred = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ])
  });

  constructor(
    private loginService: LoginService ,
    private router:Router
    ) { }

  

  get username() { return this.cred.get('username')?.value || ''; }
  get password() { return this.cred.get('password')?.value || ''; }

  onSubmit() {
    `
    send login request to login service
    `
    if (this.cred.valid) {
      const username = this.username;
      const password = this.password;
      console.log(username,password)

      this.loginService.submitLogin(username, password).subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['managers/travel-requests']); //check parent url from app routing 
        },
        (error) => {
          console.error('Login failed:', error);
          this.loginError = 'Invalid username or password.';
        }
      );
    } else {
      this.loginError = 'Please fill out the form correctly!';
    }
  }
}
