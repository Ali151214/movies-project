<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Director;
use App\Models\Genre;
use App\Models\Movie;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{

    protected $model = Movie::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'release_date' => $this->faker->date(),
            'ticket_price' => $this->faker->randomFloat(nbMaxDecimals: 2, max: 500),
            'director_id' => $this->faker->randomElement(Director::pluck('id')),
            'genre_id' => $this->faker->randomElement(Genre::pluck('id')),
            'country_id' => $this->faker->randomElement(Country::pluck('id')),
            'photo' => $this->faker->image(dir:storage_path("app/public/image"), fullPath: false, width:640, height:480),
        ];
    }
}
