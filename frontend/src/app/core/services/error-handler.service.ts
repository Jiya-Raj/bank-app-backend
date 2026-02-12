import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiProblemDetail } from '../models/transaction.models';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  toUserMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const body = error.error as ApiProblemDetail | string;
      if (typeof body === 'string' && body.length > 0) {
        return body;
      }
      if (body && typeof body === 'object') {
        return body.detail ?? body.message ?? body.title ?? `Request failed (${error.status}).`;
      }
      return `Request failed (${error.status}).`;
    }
    return 'An unexpected error occurred.';
  }
}
