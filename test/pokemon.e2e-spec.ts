import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PokemonController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/pokemon/random (GET)', () => {
    return request(app.getHttpServer())
      .get('/pokemon/random')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('name');
        expect(res.body.data).toHaveProperty('types');
        expect(res.body.data).toHaveProperty('abilities');
      });
  });

  it('/pokemon/:name (GET)', () => {
    return request(app.getHttpServer())
      .get('/pokemon/bulbasaur')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual({
          id: 1,
          name: 'bulbasaur',
          types: expect.arrayContaining(['grass']),
          abilities: expect.arrayContaining(['overgrow']),
          numberOfAbilities: expect.any(Number),
        });
      });
  });

  it('/pokemon/type/:type (GET)', () => {
    return request(app.getHttpServer())
      .get('/pokemon/type/grass')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data[0]).toHaveProperty('name');
        expect(res.body.data[0]).toHaveProperty('id');
      });
  });
});
