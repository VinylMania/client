export interface ErrorModel {
  errors: [{ value?: string; msg: string; param?: string; location?: string }];
}
