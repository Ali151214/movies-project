import { Component } from '@angular/core';
import { HttpCallerService } from "../services/http-caller-service/http-caller.service";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent {

  movies = [];
  selectedMovie = {"id": -1};

  constructor(private http_caller: HttpCallerService) {}

  ngOnInit() {
    this.FetchMovies();
  }

  FetchMovies(){
    this.http_caller.get("movies").subscribe((result: any) => {
      this.movies = result.data;
    });
  }

  OpenMovie(movie_id: number){
    this.http_caller.get("movies/"+movie_id).subscribe((result: any) => {
      this.selectedMovie = result.data;
      // @ts-ignore
      document.getElementById("openMovieModalButton").click();
    });
  }

}
