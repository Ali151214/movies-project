import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class HttpCallerService {
  base_url = "http://localhost:8000/api/"

  constructor(private http: HttpClient, private router: Router) {

  }

  get(url: string, is_private = false): any {
    let header = new HttpHeaders()
    if (is_private) {
      let access_token = this.getAuthToken();
      header = header.append('Authorization', 'Bearer ' + access_token);
    }
    return this.http.get(this.base_url.concat(url), {headers: header})
  }

  setAuthToken(access_token: any) {
    window.sessionStorage.setItem("Access-Token", access_token);
  }

  getAuthToken() {
    return window.sessionStorage.getItem('Access-Token');
  }

  deleteAuthToken() {
    window.sessionStorage.removeItem('Access-Token');
  }
}
