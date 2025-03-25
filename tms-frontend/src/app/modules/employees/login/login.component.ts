
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginError:string = '';

  cred = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])
  });

  constructor(
    private loginService: LoginService ,
    private router:Router
    ) { }

  ngOnInit(): void { }

  get username() { return this.cred.get('username')?.value || ''; }
  get password() { return this.cred.get('password')?.value || ''; }

  onSubmit() {
    `
    send login request to login service
    `
    if (this.cred.valid) {
      const username = this.username;
      const password = this.password;

      this.loginService.submitLogin(username, password).subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['employees/travel-requests']); //check parent url from app routing 
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
