import mongoose from 'mongoose';
import supertest from 'supertest';

import Server from '../models/server';

const instance = new Server();
const server = instance.listen();
export const api = supertest(instance.app);

describe('Test in endpoint POST /api/v1/user/register', () => {
  test('Should return a status code 200', async () => {
    const response = await api.post('/api/v1/user/register').send({
      name: 'Test',
      username: 'test',
      email: 'test@gmail.com',
      identification: 73484356,
      role: 'admin',
      password: '123123',
    });

    expect(response.status).toBe(200);
  });

  test('Should return a status code 400', async () => {
    const response = await api.post('/api/v1/user/register').send({
      name: 'Test',
      username: 'test',
      email: '',
    });

    expect(response.status).toBe(400);
  });

  test('Should return a user interface', async () => {
    const response = await api.post('/api/v1/user/register').send({
      name: 'Test2',
      username: 'test2',
      email: 'test2@gmail.com',
      identification: 73484357,
      role: 'admin',
      password: '123123',
    });

    expect(response.body).toHaveProperty('ok');
    expect(response.body.ok).toBeTruthy();
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });
});


describe('Test in endpoint POST /api/v1/user/login', () => {
  test('Should return a status code 200', async () => {
    const response = await api.post('/api/v1/user/login').send({
      username: 'test',
      password: '123123',
    });

    expect(response.status).toBe(200);
  });

  test('Should return a status code 400', async () => {
    const response = await api.post('/api/v1/user/login').send({
      username: 'test',
      password: '',
    });

    expect(response.status).toBe(400);
  });

  test('Should return a user interface', async () => {
    const response = await api.post('/api/v1/user/login').send({
      username: 'test',
      password: '123123',
    });

    expect(response.body).toHaveProperty('ok');
    expect(response.body.ok).toBeTruthy();
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });
});

describe('Test in endpoint POST /api/v1/room/create', () => {
  let token: string;

  beforeEach(async () => {
    const response = await api.post('/api/v1/user/login').send({
      username: 'test',
      password: '123123',
    });

    token = response.body.token;
  });


  test('Should return a status code 200', async () => {
    const response = await api.post('/api/v1/room/create').send({
      name: 'Test',
      floor: 1,
      hasBathroom: false,
      type: 'personal',
      isReserved: false,
    }).set('x-token', token);

    expect(response.status).toBe(200);
  });

  test('Should return a status code 400', async () => {
    const response = await api.post('/api/v1/room/create').send({
      name: 'name_error_test',
      floor: 1,
      hasBathroom: false,
      type: 'personal',
      isReserved: false,
    }).set('x-token', token);

    expect(response.status).toBe(400);
  });

  test('Should return a room interface', async () => {
    const response = await api.post('/api/v1/room/create').send({
      name: 'A1',
      floor: 1,
      hasBathroom: false,
      type: 'personal',
      isReserved: false,
    }).set('x-token', token);

    expect(response.body).toHaveProperty('ok');
    expect(response.body.ok).toBeTruthy();
    expect(response.body).toHaveProperty('room');
  });
});

describe('Test in endpoint PUT /api/v1/room/update', () => {
  let token: string;
  let roomId: string;

  beforeAll(async () => {
    const responseLogin = await api.post('/api/v1/user/login').send({
      username: 'test',
      password: '123123',
    });

    token = responseLogin.body.token;

    const responseRoomCreate = await api.post('/api/v1/room/create').send({
      name: 'A2',
      floor: 1,
      hasBathroom: false,
      type: 'personal',
      isReserved: false,
    }).set('x-token', token);

    roomId = responseRoomCreate.body.room.id;
  });

  test('Should return a status code 200', async () => {
    const responseRoomUpdate = await api.put(`/api/v1/room/update/${roomId}`)
        .send({
          hasBathroom: true,
        }).set('x-token', token);

    expect(responseRoomUpdate.status).toBe(200);
  });

  test('Should return a status code 400', async () => {
    const responseRoomUpdate = await api.put(`/api/v1/room/update/${roomId}`)
        .send({
          name: 'name_error_test',
        }).set('x-token', token);

    expect(responseRoomUpdate.status).toBe(400);
  });

  test('Should return a room interface', async () => {
    const responseRoomUpdate = await api.put(`/api/v1/room/update/${roomId}`)
        .send({
          hasBathroom: true,
        }).set('x-token', token);

    expect(responseRoomUpdate.body).toHaveProperty('ok');
    expect(responseRoomUpdate.body.ok).toBeTruthy();
    expect(responseRoomUpdate.body).toHaveProperty('room');
  });
});

describe('Test in endpoint DELETE /api/v1/room/delete', () => {
  let token: string;
  let roomId: string;

  beforeAll(async () => {
    const responseLogin = await api.post('/api/v1/user/login').send({
      username: 'test',
      password: '123123',
    });

    token = responseLogin.body.token;

    const responseRoomCreate = await api.post('/api/v1/room/create').send({
      name: 'A3',
      floor: 1,
      hasBathroom: false,
      type: 'personal',
      isReserved: false,
    }).set('x-token', token);

    roomId = responseRoomCreate.body.room.id;
  });

  test('Should return a status code 200 and room interface', async () => {
    const responseRoomDelete = await api.delete(`/api/v1/room/delete/${roomId}`)
        .set('x-token', token);

    expect(responseRoomDelete.status).toBe(200);
    expect(responseRoomDelete.body).toHaveProperty('ok');
    expect(responseRoomDelete.body.ok).toBeTruthy();
    expect(responseRoomDelete.body).toHaveProperty('room');
  });

  test('Should return a status code 400', async () => {
    const responseRoomDelete = await api.delete(
        `/api/v1/room/delete/${roomId}error`,
    ).set('x-token', token);

    expect(responseRoomDelete.status).toBe(400);
  });
});

describe('Test in endpoint POST /api/v1/reservation/create', () => {
  let token: string;
  let roomId: string;
  let userId: string;

  beforeAll(async () => {
    const response = await api.post('/api/v1/user/login').send({
      username: 'test',
      password: '123123',
    });

    token = response.body.token;
    userId = response.body.user.id;

    const responseRoomCreate = await api.post('/api/v1/room/create').send({
      name: 'A3',
      floor: 1,
      hasBathroom: false,
      type: 'personal',
      isReserved: false,
    }).set('x-token', token);

    roomId = responseRoomCreate.body.room.id;
  });

  test('Should return a status code 200', async () => {
    const response = await api.post('/api/v1/reservation/create').send({
      userId,
      roomId,
      amount: 12.55,
      stayDays: 5,
      paymentMethod: 'cash',
    }).set('x-token', token);

    expect(response.status).toBe(200);
  });

  test('Should return a status code 400', async () => {
    const response = await api.post('/api/v1/reservation/create').send({
      amount: 12.55,
      stayDays: 5,
      paymentMethod: 'cash',
    }).set('x-token', token);

    expect(response.status).toBe(400);
  });

  test('Should return a reservation interface', async () => {
    const response = await api.post('/api/v1/reservation/create').send({
      userId,
      roomId,
      amount: 12.55,
      stayDays: 5,
      paymentMethod: 'cash',
    }).set('x-token', token);

    expect(response.body).toHaveProperty('ok');
    expect(response.body.ok).toBeTruthy();
    expect(response.body).toHaveProperty('reservation');
  });
});

describe('Test in endpoint PUT /api/v1/reservation/update', () => {
  let token: string;
  let roomId: string;
  let userId: string;
  let reservationId: string;

  beforeAll(async () => {
    const response = await api.post('/api/v1/user/login').send({
      username: 'test',
      password: '123123',
    });

    token = response.body.token;
    userId = response.body.user.id;

    const responseRoomCreate = await api.post('/api/v1/room/create').send({
      name: 'A5',
      floor: 1,
      hasBathroom: false,
      type: 'personal',
      isReserved: false,
    }).set('x-token', token);

    roomId = responseRoomCreate.body.room.id;

    const responseReservationCreate = await api.post(
        '/api/v1/reservation/create',
    ).send({
      userId,
      roomId,
      amount: 12.55,
      stayDays: 5,
      paymentMethod: 'cash',
    }).set('x-token', token);

    reservationId = responseReservationCreate.body.reservation.id;
  });

  test('Should return a status code 200', async () => {
    const response = await api.put(
        `/api/v1/reservation/update/${reservationId}`,
    ).send({
      reservationId,
      amount: 12.55,
      stayDays: 5,
      paymentMethod: 'cash',
    }).set('x-token', token);

    expect(response.status).toBe(200);
  });

  test('Should return a status code 400', async () => {
    const response = await api.put(
        `/api/v1/reservation/update/${reservationId}error`,
    ).send({
      amount: 88,
    }).set('x-token', token);

    expect(response.status).toBe(400);
  });

  test('Should return a reservation interface', async () => {
    const response = await api.put(
        `/api/v1/reservation/update/${reservationId}`,
    ).send({
      amount: 88,
    }).set('x-token', token);

    expect(response.body).toHaveProperty('ok');
    expect(response.body.ok).toBeTruthy();
    expect(response.body).toHaveProperty('reservation');
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  server.close();
});
