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
        $input = $request->all();

        $validator = Validator::make($input, [
            'comment' => 'required',
            'rating' => 'required|min:1|max:5',
            'movie_id' => 'required|exists:App\Models\Movie,id',
            'user_id' => 'required|exists:App\Models\User,id',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $review = Review::create($input);

        return $this->sendResponse(new ReviewResource($review), 'Review created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $review = Review::find($id);

        if (is_null($review)) {
            return $this->sendError('Review not found.');
        }

        return $this->sendResponse(new ReviewResource($review), 'Review retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'comment' => 'required',
            'rating' => 'required|min:1|max:5',
            'movie_id' => 'required|exists:App\Models\Movie,id',
            'user_id' => 'required|exists:App\Models\User,id',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $review->name = $input['name'];
        $review->save();

        return $this->sendResponse(new ReviewResource($review), 'Review updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        $review->delete();

        return $this->sendResponse([], 'Review deleted successfully.');
    }
}
