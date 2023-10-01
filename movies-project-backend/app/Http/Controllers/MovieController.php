<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Movie;
use Validator;
use App\Http\Resources\MovieResource;

class MovieController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $movies = Movie::where("name", "!=", "null");

        if(isset($_GET["directors"])){
            $movies = $movies->whereIn("director_id", explode(",", $_GET["directors"]));
        }

        if(isset($_GET["countries"])){
            $movies = $movies->whereIn("country_id", explode(",", $_GET["countries"]));
        }

        if(isset($_GET["genres"])){
            $movies = $movies->whereIn("genre_id", explode(",", $_GET["genres"]));
        }

        $movies = $movies->get();

        return $this->sendResponse(MovieResource::collection($movies), 'Movies retrieved successfully.');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'description' => 'required',
            'release_date' => 'required',
            'ticket_price' => 'required',
            'photo' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'genre_id' => 'required|exists:App\Models\Genre,id',
            'country_id' => 'required|exists:App\Models\Country,id',
            'director_id' => 'required|exists:App\Models\Director,id',
        ]);

        $image_path = $request->file('photo')->store('image', 'public');
        $input["photo"] = explode("/", $image_path)[1];

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $movie = Movie::create($input);

        return $this->sendResponse(new MovieResource($movie), 'Movie created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $movie = Movie::find($id);

        if (is_null($movie)) {
            return $this->sendError('Movie not found.');
        }

        return $this->sendResponse(new MovieResource($movie), 'Movie retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Movie $movie)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'description' => 'required',
            'release_date' => 'required',
            'ticket_price' => 'required',
            'photo' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'genre_id' => 'required|exists:App\Models\Genre,id',
            'country_id' => 'required|exists:App\Models\Country,id',
            'director_id' => 'required|exists:App\Models\Director,id',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $movie->name = $input['name'];
        $movie->save();

        return $this->sendResponse(new MovieResource($movie), 'Movie updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie)
    {
        $movie->delete();

        return $this->sendResponse([], 'Movie deleted successfully.');
    }
}
