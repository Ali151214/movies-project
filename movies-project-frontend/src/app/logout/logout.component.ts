import {Component, EventEmitter, Output} from '@angular/core';
import {HttpCallerService} from "../services/http-caller-service/http-caller.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  @Output() accessTokenEvent = new EventEmitter<string>();

  constructor(private http_caller: HttpCallerService) { }

  Logout(){
    this.http_caller.deleteAuthToken();
    this.accessTokenEvent.emit("");
  }

}
