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
  selectedMovie = {"id": -1, "name": "", "photo": "", "release_date": "", "ticket_price": 0, "genre": "", "director": "", "country": "", "description": ""};
  selectedMovieReviews = [];

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
    let directors_filter = ""
    if(this.selected_directors.length > 0){
      directors_filter += "directors="+this.selected_directors.join(",");
    }
    let genres_filter = ""
    if(this.selected_genres.length > 0){
      genres_filter += "genres="+this.selected_genres.join(",");
    }
    let countries_filter = "";
    if(this.selected_countries.length > 0){
      countries_filter += "countries="+this.selected_countries.join(",");
    }
    this.http_caller.get("movies?"+directors_filter+"&"+genres_filter+"&"+countries_filter).subscribe((result: any) => {
      this.movies = result.data;
    });
  }

  OpenMovie(movie_id: number){
    this.http_caller.get("movies/"+movie_id).subscribe((result: any) => {
      this.selectedMovie = result.data;
      // @ts-ignore
      document.getElementById("openMovieModalButton").click();
    });
    this.FetchReviews(movie_id);
  }

  FetchReviews(movie_id: number){
    this.http_caller.get("reviews?movie_id="+movie_id).subscribe((result: any) => {
      this.selectedMovieReviews = result.data;
    });
  }

  removeItemFromArray(element: any, array: any){
    array.forEach( (item: any, index: number) => {
      if(item === element) array.splice(index,1);
    });
    return array
  }

  selected_directors = []
  onDirectorSelectionChange(event: Event) {
    // @ts-ignore
    if(event.target.checked){
      // @ts-ignore
      this.selected_directors.push(event.target.value);
    }
    else{
      // @ts-ignore
      this.selected_directors = this.removeItemFromArray(event.target.value, this.selected_directors);
    }
    this.FetchMovies();
  }

  selected_countries = []
  onCountrySelectionChange(event: Event) {
    // @ts-ignore
    if(event.target.checked){
      // @ts-ignore
      this.selected_countries.push(event.target.value);
    }
    else{
      // @ts-ignore
      this.selected_countries = this.removeItemFromArray(event.target.value, this.selected_countries);
    }
    this.FetchMovies()
  }

  selected_genres = []
  onGenreSelectionChange(event: Event) {
    // @ts-ignore
    if(event.target.checked){
      // @ts-ignore
      this.selected_genres.push(event.target.value);
    }
    else{
      // @ts-ignore
      this.selected_genres = this.removeItemFromArray(event.target.value, this.selected_genres);
    }
    this.FetchMovies();
  }
}
