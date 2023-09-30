import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse,
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { LoaderService } from '../loader-service/loader.service';
import { finalize } from 'rxjs/operators';
import {ToastService} from "../toast-service/toast.service";

@Injectable()
export class HttpCallerInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService, private toast: ToastService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();

    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide()),
      // @ts-ignore
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if(request.url.includes("login")){
          errorMsg = `Error: Authentication failed.`;
        }
        else if (request.url.includes("register")){
          errorMsg = `Error: Invalid inputs.`;
        }
        else if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        this.toast.showErrorToast(errorMsg)
      })
    );
  }
}
