// src/interceptors/prometheus.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Counter } from 'prom-client';

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

@Injectable()
export class PrometheusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const route = req.route ? req.route.path : req.url;
    const method = req.method;

    return next.handle().pipe(
      tap((_) => {
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;
        httpRequestsTotal.inc({
          method,
          route,
          status_code: statusCode,
        });
      }),
    );
  }
}
