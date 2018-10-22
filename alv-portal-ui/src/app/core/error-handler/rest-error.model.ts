export interface RestError {
  type: string;
  status: number;
  path: string;
  message: string;
}
