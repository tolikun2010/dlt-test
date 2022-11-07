# DLT-TEST app

# STAGE LAUNCH

## Setup - the first step

Clone the repo

Create .env in dlt-test folder and fill it from example.env

## Environment settings (dlt-test folder)

| VARIABLE       |                 DESCRIPTION                  |
| -------------- | :------------------------------------------: |
| PORT           |                 Server port                  |
|                |                                              |
| DB_URL         |  URL to mongodb (docker container or atlas)  |
|                |                                              |
| REDIS_URL      |       URL to redis (docker container)        |
|                |                                              |
| CORS_WHITELIST | List of urls that can interact with your app |

## Setup - the second and final step

Run the following from /dlt-test folder to run the whole app from docker containers:

```bash
sudo docker-compose up --build --force-recreate -d
```

## After setup

Now you have both client and server running.

Open [http://localhost:3333](http://localhost:3333) and check console to see if the server responds correctly.

# API Documentation

You can open API documentation here:
[https://editor.swagger.io](https://editor.swagger.io) - just open openapi.yaml file from /server/docs/.
