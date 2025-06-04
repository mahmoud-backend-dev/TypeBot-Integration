import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseResponseResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return {
            status: true,
            message: 'Response For All Successfully.',
            data: data,
          };
        } else {
          return {
            status: true,
            message: 'Response For Specific Successfully.',
            data: data,
          };
        }
      }),
    );
  }
}
