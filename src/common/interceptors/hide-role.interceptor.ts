/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HideRoleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return next.handle().pipe(
      map((data) => {
        // Si no hay usuario autenticado o no es ADMIN, ocultar el rol
        if (!user || user.role !== 'ADMIN') {
          if (Array.isArray(data)) {
            return data.map(({ role, ...rest }) => rest);
          }
          const { role, ...rest } = data;
          return rest;
        }

        // Si es ADMIN, devolver todo
        return data;
      }),
    );
  }
}
