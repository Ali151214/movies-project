import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpCallerService} from "../services/http-caller-service/http-caller.service";
import { Output, EventEmitter } from '@angular/core';
import {ToastService} from "../services/toast-service/toast.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  @Output() accessTokenEvent = new EventEmitter<string>();

  constructor(private http_caller: HttpCallerService, private toast: ToastService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  get emailField(): any {
    return this.loginForm.get('email');
  }

  get passwordField(): any {
    return this.loginForm.get('password');
  }

  loginFormSubmit(): void {
    let form_data = {
      "email": this.emailField.value,
      "password": this.passwordField.value
    }
    // @ts-ignore
    document.getElementById("loginModalCloseButton").click();
    this.http_caller.post("login", form_data).subscribe((result: any) => {
      let access_token = result["data"]["token"];
      this.http_caller.setAuthToken(access_token);
      this.accessTokenEvent.emit(access_token);
      this.toast.showSuccessToast("Login successful.");
    });
  }
}
