export interface SelectableOption {
  label: string;
  value: any;
  labelParameters?: {
    [index: string]: any;
  }
}
