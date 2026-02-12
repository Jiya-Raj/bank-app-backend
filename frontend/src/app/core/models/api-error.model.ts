export interface ApiError {
  status: number;
  title?: string;
  detail: string;
  timestamp?: string;
  errorCode?: string;
}
