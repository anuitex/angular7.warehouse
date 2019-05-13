export class ErrorModel<D, E> {
    public description: string = 'Unhandled Error';
    public data: D;
    public error: E;
  }
  