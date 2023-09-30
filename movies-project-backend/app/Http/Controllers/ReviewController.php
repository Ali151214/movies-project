<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Review;
use Validator;
use App\Http\Resources\ReviewResource;

class ReviewController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reviews = Review::all();

        return $this->sendResponse(ReviewResource::collection($reviews), 'Reviews retrieved successfully.');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->user() == null){
            return $this->sendError("Login required.", ["User login is required to give review."]);
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'comment' => 'required',
            'rating' => 'required|min:1|max:5',
            'movie_id' => 'required|exists:App\Models\Movie,id',
//            'user_id' => 'required|exists:App\Models\User,id',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input["user_id"] = $request->user()->id;

        $review = Review::create($input);

        return $this->sendResponse(new ReviewResource($review), 'Review created successfully.');
    }

}
