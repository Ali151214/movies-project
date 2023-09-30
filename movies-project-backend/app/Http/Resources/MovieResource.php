<?php

namespace App\Http\Resources;

use App\Models\Country;
use App\Models\Director;
use App\Models\Genre;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'ticket_price' => $this->ticket_price,
            'photo' => asset("storage/image")."/".$this->photo,
            'release_date' => $this->release_date,
            'genre' => Genre::find($this->genre_id)->name,
            'director' => Director::find($this->director_id)->name,
            'country' => Country::find($this->country_id)->name,
            'created_at' => $this->created_at->format('d/m/Y'),
            'updated_at' => $this->updated_at->format('d/m/Y'),
        ];
    }
}
