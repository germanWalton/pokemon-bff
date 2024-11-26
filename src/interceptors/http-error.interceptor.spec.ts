import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { throwError } from 'rxjs';
import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  let interceptor: HttpErrorInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpErrorInterceptor],
    }).compile();

    interceptor = module.get<HttpErrorInterceptor>(HttpErrorInterceptor);
  });

  it('should throw NotFoundException for 404 error', (done) => {
    const context: ExecutionContext = {} as any;
    const next: CallHandler = {
      handle: () => throwError(() => ({ response: { status: 404 } })),
    };

    interceptor.intercept(context, next).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toBe('Resource not found');
        done();
      },
    });
  });

  it('should throw BadRequestException for 400 error', (done) => {
    const context: ExecutionContext = {} as any;
    const next: CallHandler = {
      handle: () => throwError(() => ({ response: { status: 400 } })),
    };

    interceptor.intercept(context, next).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe('Bad request');
        done();
      },
    });
  });

  it('should throw InternalServerErrorException for 500 error', (done) => {
    const context: ExecutionContext = {} as any;
    const next: CallHandler = {
      handle: () => throwError(() => ({ response: { status: 500 } })),
    };

    interceptor.intercept(context, next).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(InternalServerErrorException);
        expect(err.message).toBe('Internal server error');
        done();
      },
    });
  });

  it('should pass through other errors', (done) => {
    const context: ExecutionContext = {} as any;
    const next: CallHandler = {
      handle: () => throwError(() => new Error('Some other error')),
    };

    interceptor.intercept(context, next).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Some other error');
        done();
      },
    });
  });
});
