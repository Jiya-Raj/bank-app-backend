import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ApiError } from '../models/api-error.model';

@Injectable({ providedIn: 'root' })
export class ApiErrorService {
  toApiError(error: HttpErrorResponse): ApiError {
    const body = error.error as { detail?: string; title?: string; timestamp?: string; errorCode?: string };
    return {
      status: error.status,
      title: body?.title,
      detail: body?.detail ?? error.message ?? 'Unexpected server error.',
      timestamp: body?.timestamp,
      errorCode: body?.errorCode
    };
  }
}
