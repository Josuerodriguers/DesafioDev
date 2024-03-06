import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  loginFailed: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get userNameControl() {
    return this.loginForm.get('username');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    if (this.authService.getSessionToken()) {
      this.router.navigate(['/tickets']);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        console.log('Login response:', response);
        if (response.sessionID) {
          this.router.navigate(['/tickets']);
        } else {
          console.error('Erro de login:', response);
          this.loginFailed = true;
        }
      },
      (error) => {
        console.error('Erro de login:', error);
        this.loginFailed = true;
      }
    );
  }
}
