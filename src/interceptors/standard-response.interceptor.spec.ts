import { StandardResponseInterceptor } from '../interceptors/standard-response.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

describe('StandardResponseInterceptor', () => {
  let interceptor: StandardResponseInterceptor<any>;

  beforeEach(() => {
    interceptor = new StandardResponseInterceptor();
  });

  it('should return data wrapped in a response object with statusCode 200', (done) => {
    const mockExecutionContext: ExecutionContext = {
      switchToHttp: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      getType: jest.fn(),
    };

    const mockCallHandler: CallHandler = {
      handle: () => of({ test: 'data' }),
    };

    interceptor
      .intercept(mockExecutionContext, mockCallHandler)
      .subscribe((result) => {
        expect(result).toEqual({ statusCode: 200, data: { test: 'data' } });
        done();
      });
  });
});
