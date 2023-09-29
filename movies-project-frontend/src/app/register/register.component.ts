import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required])
    })
  }

  get emailField(): any {
    return this.registerForm.get('email');
  }

  get confirmPasswordField(): any {
    return this.registerForm.get('confirm_password');
  }

  get nameField(): any {
    return this.registerForm.get('name');
  }

  get passwordField(): any {
    return this.registerForm.get('password');
  }

  registerFormSubmit(): void {

  }
}
