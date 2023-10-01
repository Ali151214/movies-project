
# How to run project?


## Frontend - Angular

Clone the frontend branch and run the below commands to install required packages and run the project.

* npm install
* ng serve

Node version: 
Angular cli version: 16.2.4


## Backend - Laravel

Clone the backend branch and run the below command for setup.

* composer install
* php artisan migrate
* php artisan db:seed
* php artisan serve

Php version: 8.0.2
Laravel version: 9.19


# What i did?


## Implemented following functionalities on frontend:

• basic navbar layout with movie listing
• Login, logout and register forms with api integration.
• Mobile responsive layout with bootstrap
• Form validation with angular forms
• Loader while api call process in interceptor using material ui
• Success and error toasts using ngx-toastr
• Filtering movies with directors, genres and country
• Movie review (rating + comment) form for authenticated users with api integration.

## Implemented following functionalities on backend:

• User authentication using sanctum
• Custom middleware for authorisation. 2 Roles (admin & user)
• CRUD Apis for Genre, Director, Country, Movie and Review
• Few routes are for public, few for authenticated users and few for only admin. (Eg: only admin can create movies and others can only view)
• Seeders to seed some fake data using Faker package in factories
• relevant migrations, models and resource classes.



# What i could have done to improve? Which I couldn’t do, due to shortage of time.

• Extensive searching and filtering feature
• Better UI/UX on frontend
• Reports (eg: most watched movie etc.)
• Unit tests
• Better validations and error handling
• Dashboard for admin to add or edit data

