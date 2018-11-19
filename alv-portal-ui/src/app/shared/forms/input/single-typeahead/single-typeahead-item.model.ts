export class SingleTypeaheadItemModel {

  constructor(public id: string,
              public label: string) {
  }

  equals(other: SingleTypeaheadItemModel): boolean {
    return !!other && other.id === this.id;
  }

  compare(other: SingleTypeaheadItemModel): number {
    if (this.label === other.label) {
      return 0;
    }
    return this.label >= other.label ? 1 : -1;
  }
}
