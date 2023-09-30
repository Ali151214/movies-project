import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "../login/login.component";
import {HttpCallerService} from "../services/http-caller-service/http-caller.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  access_token = ""

  constructor(private modalService: NgbModal, private http_caller: HttpCallerService) {
    if(http_caller.getAuthToken()){
      // @ts-ignore
      this.access_token = http_caller.getAuthToken();
    }
  }

  AuthEvent(event: any){
    this.access_token = event
  }
}
