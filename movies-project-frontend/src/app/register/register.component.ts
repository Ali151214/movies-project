import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpCallerService} from "../services/http-caller-service/http-caller.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  @Output() accessTokenEvent = new EventEmitter<string>();

  constructor(private http_caller: HttpCallerService) { }

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
    console.log("dfs")
    let form_data = {
      "email": this.emailField.value,
      "password": this.passwordField.value,
      "name": this.nameField.value,
      "c_password": this.confirmPasswordField.value
    }
    console.log(form_data);
    // @ts-ignore
    document.getElementById("registerModalCloseButton").click();
    this.http_caller.post("register", form_data).subscribe((result: any) => {
      let access_token = result["data"]["token"];
      this.http_caller.setAuthToken(access_token);
      this.accessTokenEvent.emit(access_token);
    });
  }
}
