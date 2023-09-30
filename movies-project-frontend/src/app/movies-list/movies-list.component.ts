import { Component } from '@angular/core';
import { HttpCallerService } from "../services/http-caller-service/http-caller.service";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent {

  movies = [];
  genres = [];
  directors = [];
  countries = [];
  selectedMovie = {"id": -1};

  constructor(private http_caller: HttpCallerService) {}

  ngOnInit() {
    this.FetchMovies();
    this.FetchGenres();
    this.FetchDirectors();
    this.FetchCountries();
  }

  FetchCountries(){
    this.http_caller.get("countries").subscribe((result: any) => {
      this.countries = result.data;
    });
  }

  FetchDirectors(){
    this.http_caller.get("directors").subscribe((result: any) => {
      this.directors = result.data;
    });
  }

  FetchGenres(){
    this.http_caller.get("genres").subscribe((result: any) => {
      this.genres = result.data;
    });
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
