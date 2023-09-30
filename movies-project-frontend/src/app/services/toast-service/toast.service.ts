import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastr: ToastrService) { }

  showErrorToast(msg: string){
    this.toastr.error(msg, 'Error', {
      positionClass: 'toast-bottom-right'
    });
  }

  showSuccessToast(msg: string){
    this.toastr.success(msg, 'Success', {
      positionClass: 'toast-bottom-right'
    });
  }
}
