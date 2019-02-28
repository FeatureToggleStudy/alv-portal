export interface SelectableOption<T = any> {
  label: string;
  value: any;
  payload?: T;
}
