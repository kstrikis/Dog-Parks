## Parks for Paws

Description: Welcome to our dog parks application, Parks for Paws! This app helps users find dog parks in their area and gives an overview of the features of the park and reviews from other users.

## Authors
Alex Nunan, Hilary Gould, Kriss Strikis, Scrith Prosper

## Site
https://localhost:3000

## Technologies
- Javascript
- Express
- React
- CSS
- Font Awesome
- Foundation Framework
- AWS (S3)
- Google Places API
- PostgreSQL

## Installation
- In your terminal, clone the project from github with : `git clone https://github.com/kstrikis/Dog-Parks.git`
- Navigate to the server's src folder : `cd Dog-Parks/server/src`
- Open up your codebase with the terminal command: code .
- Add a new file in the src folder titled: .env
- In the src file, navigate to env.example, and copy and paste the keys found into your new .env file
- If needed, create an AWS Account at https://aws.amazon.com
- In the Identity and Access Management dashboard, add a user, ensuring the user has programmatic access.
- Pull the Access Key and Secret Access Key for this user, and add them to your .env file
- Create a new S3 bucket and add the name to the .env file after S3_BUCKET_PRODUCTION=
- Create a Google Workspace account and add your API Key to the .env file after GOOGLE_MAPS_API_KEY=
- Create a random string e.g. using UUID generator https://www.uuidgenerator.net and add to the .env file after SESSION_SECRET=
- Back in the terminal, create the PostgreSQL database with : `createdb dog-parks_development`
- Yarn install with this command before running your migrations : `yarn install` 
- Run these commands to make sure that your migrations are up to date : `yarn migrate:latest`
- Seed the database with initial data : `yarn db:seed`
- Start the server with : `yarn dev`


## Usage
Navigate to https://localhost:3000

![ScreenShot](https://dog-parks-production.s3.amazonaws.com/1683912400355)
