import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              return throwError(
                () => new NotFoundException('Resource not found'),
              );
            case 400:
              return throwError(() => new BadRequestException('Bad request'));
            case 500:
              return throwError(
                () => new InternalServerErrorException('Internal server error'),
              );
            default:
              return throwError(() => error);
          }
        }
        return throwError(() => error);
      }),
    );
  }
}
