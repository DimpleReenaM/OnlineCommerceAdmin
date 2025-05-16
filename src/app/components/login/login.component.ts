import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/Login/login.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  loginrole:string=''
  showPassword: boolean = false;  // Add this variable

  constructor(private http:HttpClient,private fb:FormBuilder,private ms:LoginService,private router:Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.ms.login({
        email:this.loginForm.get('email')?.value,
        password:this.loginForm.get('password')?.value
      }).subscribe(
      (response: any) => {
        // Store the JWT token in localStorage
        localStorage.setItem('Role',response.data.userData.role)
        localStorage.setItem('token',response.data.accessToken)

        if (response.data.userData.role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        
        } else {
          this.errorMessage = 'Unauthorized role!';
        }
      },
      (error) => {
        // Show error message in case of fa ilure
        this.errorMessage = 'Invalid credentials, please try again!';
      }
    );
  }


togglePassword() {
  this.showPassword = !this.showPassword;
}
 


}
