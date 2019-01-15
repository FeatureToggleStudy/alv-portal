export class SingleTypeaheadItem<T> {

  constructor(public id: string,
              public label: string,
              public payload: T) {
  }

  equals(other: SingleTypeaheadItem<T>): boolean {
    return !!other && other.id === this.id;
  }

  compare(other: SingleTypeaheadItem<T>): number {
    if (this.label === other.label) {
      return 0;
    }
    return this.label >= other.label ? 1 : -1;
  }
}
