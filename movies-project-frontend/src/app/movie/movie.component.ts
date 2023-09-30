import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpCallerService} from "../services/http-caller-service/http-caller.service";
import {ToastService} from "../services/toast-service/toast.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  reviewForm!: FormGroup;
  @Output() accessTokenEvent = new EventEmitter<string>();
  @Input() movie = {"id": -1};

  constructor(private http_caller: HttpCallerService, private toast: ToastService) {

  }

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      rating: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
      comment: new FormControl('', [Validators.required, Validators.maxLength(200)])
    })
  }

  get ratingField(): any {
    return this.reviewForm.get('rating');
  }

  get commentField(): any {
    return this.reviewForm.get('comment');
  }

  reviewFormSubmit(): void {
    let form_data = {
      "rating": this.ratingField.value,
      "comment": this.commentField.value,
      "movie_id": this.movie["id"]
    }
    this.http_caller.post("reviews", form_data).subscribe((result: any) => {
      let access_token = result["data"]["token"];
      this.http_caller.setAuthToken(access_token);
      this.accessTokenEvent.emit(access_token);
      this.toast.showSuccessToast("Login successful.");
    });
  }
}
