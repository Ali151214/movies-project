<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//        $this->call(DefaultAdminSeeder::class);
//        $this->call(GenreSeeder::class);
//        $this->call(DirectorSeeder::class);
//        $this->call(CountrySeeder::class);
        $this->call(MovieSeeder::class);
    }
}
