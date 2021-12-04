# Github Organization Repository Manager

## Deployment Link

Cloud Run deployment link: [Swagger Link](https://org-repo-manager-bm57i6eyna-et.a.run.app)

## Architecture

<img src="https://i.ibb.co/cg0cT4N/Github-Organization-Repo-Architecture.png" width="350">

### General Consideration
- SQL database usage for comment service: PostgreSQL is able to save long string data and it's possible in the future if we want to get all comments per member so it will need some join and SQL is optimized for join use case
- SQL database usage for member service: User data is the most data that has join scenario
- Combining ```/comment``` and ```/member``` to be one service: It must use 1 SQL database and it's bad to seperate service if they're using the same database
- Member service using the real github database for Xendit organization: In this case we dont have any ```POST``` method so I create cron scheduler in cloud to schedule cloud function to dump Xendit member data


## How to run locally

### Running the migration
1. We only use .env file to be used in built application so we must export all variables manually first. Here is the example:
  ```
  export DB_HOST=localhost
  export DB_PORT=5432
  export DB_USER=postgres
  export DB_PASSWORD=postgres
  export DB_DATABASE=postgres
  export env=DEV
  ```
2. Run ```npm install``` to install the needed package
3. Run ```npm run migration:run```
4. Seeding data code has not provided yet, so maybe you would like to manually insert the data first, especially for ```/member``` because for ```/comment``` you can manually post it

### Running the Application
1. Make sure you have docker installed
2. Run ```docker build -t org-repo-manager .``` to build the image on your local machine
3. Setup the environment variable in **env-template** file and change the filename to **.env**
4. Run ```sh run.sh``` to run your **org-repo-manager** newly built image container
5. Go to ```http://localhost:{PORT}``` to open the swagger
