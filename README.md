## Rumor - Backend

Welcome to the Rumor Backend documentation! This service will allow you to place an order with multiple products and get the order details. We have used Nodejs as server along with NestJs as the framework. We have used Postgres Database, GRPC for interservice communication along with Krakend as API gateway. This service can be ran standonlne via npm or via docker 

#### [Demo Video](https://www.loom.com/share/9c01d827095a4aee868ec18ea722be79?sid=ad546de3-8382-4ef1-830d-36571f1633d7) 

### Technologies and Services Used

- Node.js (19.6.x)
- Postgres (15.0)
- TypeORM (0.3.17)
- Docker
- Krakend

### Prerequisites
- Docker and Docker compose (Linux)
- To run locally npm 9.4.x node 19.6.x, Postgress 14 or 15 

### Installation
#### Step 1:

Add Initial sample.env variables. Rename the sample.env file in each service  folder to .env and add the following .env variables:

- ``PORT={YOUR_DB_HOST}``
- ``DB_HOST={YOUR_DB_HOST}``
- ``DB_POST={YOUR_DB_PORT}``
- ``DB_USERNAME={YOUR_DB_USERNAME}``
- ``DB_PASSWORD={YOUR_DB_PASSWORD}``
- ``DB_NAME={YOUR_DB_NAME}``
Note: You can skip this step if using docker it has default values for all of these.


#### Step 2: (Running Using Docker):
Docker constaints all the dependencies, we can directly run whole app using the commands below
```bash
# docker-compose up --build (to run console)
$ docker-compose up --build -d (to run in detached mode) 
```

#### Step 3: (Running Locally)
This step will be same for all 

```bash
$ npm install
```

#### Running the app
```bash
# development
$ npm run start
```

Note:

If you are running the application locally, ensure that you can access the database on your machine. Proper network configurations and access rights should be in place for seamless interaction with the Postgres.

## Test

```bash
# unit tests
$ npm run test
```

## Run services using docker 
```bash
# docker run command
$ docker-compose up -d or sudo docker-compose up -d 
```

### Swagger URLs
#### Order Service 
```bash
$ http://localhost:8080/order-service
```
#### Product Service
```bash
$ http://localhost:8080/product-service
```

#### Note
We have fulfilled the requirements by implementing Axios for interservice calls, and currently, our focus is on integrating GRPC server code, which is a work in progress. 