# Reservation Api

Api Rest for Room Reservations created with NodeJs, Express and MongoDB as database.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=4000`

`DB_MONGO`

`DB_MONGO_TEST=inmemory`

`SECRET_KEY_JWT`

## Deployment

To run this project, execute

```bash
  docker build -t reservation_api .
```

```bash
  docker run --rm -p 4000:4000 reservation_api
```

## API Reference

#### [POST] /api/v1/user/register

Endpoint to be able to register a new client or administrator

```https
  POST http://localhost:4000/api/v1/user/register
```

| Body           | Type                | Default               | Description                            |
|----------------|---------------------|-----------------------|----------------------------------------|
| name           | <code>string</code> |                       | User's name.                           |
| username       | <code>string</code> |                       | User's username, must be unique        |
| email          | <code>string</code> |                       | User's email, must be unique           |
| identification | <code>number</code> |                       | User's identification, must be unique  |
| role           | <code>string</code> | <code>"client"</code> | User role between "admin" and "client" |
| password       | <code>string</code> |                       | User's password                        |

Response example

```JSON
{
  "ok": true,
  "user": {
    "name": "Arian",
    "username": "angoma851",
    "email": "angoma851@gmail.com",
    "identification": 73484356,
    "role": "client",
    "password": "$2a$10$RF2.qW0o/3R/H5SBO6PqpeiP8ojWDoZ1neJXYCWY674/fNiIIGv1C",
    "createdAt": "2022-06-12T04:26:55.940Z",
    "updatedAt": "2022-06-12T04:26:55.940Z",
    "id": "62a56b0f9dfd2d6bccb2cd02"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTU2YjBmOWRmZDJkNmJjY2IyY2QwMiIsImlhdCI6MTY1NTAwODAxNiwiZXhwIjoxNjU1MDIyNDE2fQ.zdFES9uXxO_TqXPPLn4cqihGTi53mRqV5439smMp7hM"
}
```

#### [POST] /api/v1/user/login

Endpoint to Log In a user

```https
  POST http://localhost:4000/api/v1/user/login
```

| Body     | Type                | Default               | Description                             |
|----------|---------------------|-----------------------|-----------------------------------------|
| username | <code>string</code> |                       | User's username                         |
| password | <code>string</code> |                       | User's password                         |

Response example

```JSON
{
  "ok": true,
  "user": {
    "name": "Arian",
    "username": "angoma851",
    "email": "angoma851@gmail.com",
    "identification": 73484356,
    "role": "client",
    "password": "$2a$10$RF2.qW0o/3R/H5SBO6PqpeiP8ojWDoZ1neJXYCWY674/fNiIIGv1C",
    "createdAt": "2022-06-12T04:26:55.940Z",
    "updatedAt": "2022-06-12T04:26:55.940Z",
    "id": "62a56b0f9dfd2d6bccb2cd02"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTU2YjBmOWRmZDJkNmJjY2IyY2QwMiIsImlhdCI6MTY1NTAwODAxNiwiZXhwIjoxNjU1MDIyNDE2fQ.zdFES9uXxO_TqXPPLn4cqihGTi53mRqV5439smMp7hM"
}
```

#### [POST] /api/v1/room/create

Endpoint to create a new room

```https
  POST http://localhost:4000/api/v1/room/create
```

| Body        | Type                 | Default                 | Description                                             |
|-------------|----------------------|-------------------------|---------------------------------------------------------|
| name        | <code>string</code>  |                         | Room's name, must be unique                             |
| floor       | <code>number</code>  |                         | Floor number of the room                                |
| hasBathroom | <code>boolean</code> | <code>false</code>      | Whether or not there is a bathroom in the room          |
| type        | <code>string</code>  | <code>"personal"</code> | Room type between "personal", "group" and "matrimonial" |
| isReserved  | <code>boolean</code> | <code>false</code>      | Whether the room is already reserved or not             |


| Headers | Type                | Default | Description                 |
|---------|---------------------|---------|-----------------------------|
| x-token | <code>string</code> |         | Token of the logged-in user |

Response example

```JSON
{
  "ok": true,
  "room": {
    "name": "A2",
    "floor": 1,
    "hasBathroom": true,
    "type": "personal",
    "isReserved": false,
    "createdAt": "2022-06-12T04:39:46.225Z",
    "updatedAt": "2022-06-12T04:39:46.225Z",
    "id": "62a56e129dfd2d6bccb2cd08"
  }
}
```

#### [PUT] /api/v1/room/update/:id

Endpoint to update a room

```https
  PUT http://localhost:4000/api/v1/room/update/:id
```

| Body                   | Type                 | Default | Description                                             |
|------------------------|----------------------|---------|---------------------------------------------------------|
| name (optional)        | <code>string</code>  |         | Room's name, must be unique                             |
| floor (optional)       | <code>number</code>  |         | Floor number of the room                                |
| hasBathroom (optional) | <code>boolean</code> |         | Whether or not there is a bathroom in the room          |
| type (optional)        | <code>string</code>  |         | Room type between "personal", "group" and "matrimonial" |
| isReserved (optional)  | <code>boolean</code> |         | Whether the room is already reserved or not             |

| Params | Type                  | Default | Description                  |
|--------|-----------------------|---------|------------------------------|
| id     | <code>ObjectId</code> |         | Id of the room to be updated |


| Headers | Type                | Default | Description                 |
|---------|---------------------|---------|-----------------------------|
| x-token | <code>string</code> |         | Token of the logged-in user |

Response example

```JSON
{
  "ok": true,
  "room": {
    "name": "A2",
    "floor": 1,
    "hasBathroom": true,
    "type": "personal",
    "isReserved": false,
    "createdAt": "2022-06-12T04:39:46.225Z",
    "updatedAt": "2022-06-12T04:39:46.225Z",
    "id": "62a56e129dfd2d6bccb2cd08"
  }
}
```

#### [DELETE] /api/v1/room/delete/:id

Endpoint to delete a room

```https
  DELETE http://localhost:4000/api/v1/room/delete/:id
```

| Params | Type                  | Default | Description                  |
|--------|-----------------------|---------|------------------------------|
| id     | <code>ObjectId</code> |         | Id of the room to be updated |


| Headers | Type                | Default | Description                 |
|---------|---------------------|---------|-----------------------------|
| x-token | <code>string</code> |         | Token of the logged-in user |

Response example

```JSON
{
  "ok": true,
  "room": {
    "name": "A2",
    "floor": 1,
    "hasBathroom": true,
    "type": "personal",
    "isReserved": false,
    "createdAt": "2022-06-12T04:39:46.225Z",
    "updatedAt": "2022-06-12T04:39:46.225Z",
    "id": "62a56e129dfd2d6bccb2cd08"
  }
}
```

#### [POST] /api/v1/reservation/create

Endpoint to create a new reservation

```https
  POST http://localhost:4000/api/v1/reservation/create
```

| Body                       | Type                  | Default                | Description                                                        |
|----------------------------|-----------------------|------------------------|--------------------------------------------------------------------|
| userId                     | <code>ObjectId</code> |                        | Id of the user to whom the reservation is assigned                 |
| roomId                     | <code>ObjectId</code> |                        | Id of the room that was reserved                                   |
| amount                     | <code>number</code>   |                        | Reservation fee                                                    |
| stayDays                   | <code>number</code>   |                        | Number of days of stay                                             |
| transactionCode (optional) | <code>string</code>   |                        | Payment transaction number                                         |
| paymentMethod              | <code>string</code>   |                        | Type of payment between cash and card                              |
| status (optional)          | <code>string</code>   | <code>"pending"</code> | Status of the reservation, between "pending", "paid" and "deleted" |


| Headers | Type                | Default | Description                 |
|---------|---------------------|---------|-----------------------------|
| x-token | <code>string</code> |         | Token of the logged-in user |

Response example

```JSON
{
  "ok": true,
  "reservation": {
    "userId": "62a4ebae58bee65cb6901b11",
    "roomId": "62a5165a0ae0cff12255db63",
    "amount": 12.5,
    "stayDays": 4,
    "paymentMethod": "cash",
    "status": "pending",
    "createdAt": "2022-06-12T04:56:27.683Z",
    "updatedAt": "2022-06-12T04:56:27.683Z",
    "id": "62a571fb9dfd2d6bccb2cd0e"
  }
}
```

#### [PUT] /api/v1/reservation/update/:id

Endpoint to update a reservation

```https
  PUT http://localhost:4000/api/v1/reservation/update/:id
```

| Body                       | Type                  | Default | Description                                                        |
|----------------------------|-----------------------|---------|--------------------------------------------------------------------|
| roomId (optional)          | <code>ObjectId</code> |         | Id of the room that was reserved                                   |
| amount (optional)          | <code>number</code>   |         | Reservation fee                                                    |
| stayDays (optional)        | <code>number</code>   |         | Number of days of stay                                             |
| transactionCode (optional) | <code>string</code>   |         | Payment transaction number                                         |
| paymentMethod (optional)   | <code>string</code>   |         | Type of payment between cash and card                              |
| status (optional)          | <code>string</code>   |         | Status of the reservation, between "pending", "paid" and "deleted" |


| Params | Type                  | Default | Description                         |
|--------|-----------------------|---------|-------------------------------------|
| id     | <code>ObjectId</code> |         | Id of the reservation to be updated |

| Headers | Type                | Default | Description                 |
|---------|---------------------|---------|-----------------------------|
| x-token | <code>string</code> |         | Token of the logged-in user |

Response example

```JSON
{
  "ok": true,
  "reservation": {
    "userId": "62a4ebae58bee65cb6901b11",
    "roomId": "62a5165a0ae0cff12255db63",
    "amount": 12.5,
    "stayDays": 4,
    "paymentMethod": "cash",
    "status": "pending",
    "createdAt": "2022-06-12T04:56:27.683Z",
    "updatedAt": "2022-06-12T04:56:27.683Z",
    "id": "62a571fb9dfd2d6bccb2cd0e"
  }
}
```
