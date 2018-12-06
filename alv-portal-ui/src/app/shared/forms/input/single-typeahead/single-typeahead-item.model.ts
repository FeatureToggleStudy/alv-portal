export class SingleTypeaheadItem {

  constructor(public id: string,
              public label: string,
              public model: any) {
  }

  equals(other: SingleTypeaheadItem): boolean {
    return !!other && other.id === this.id;
  }

  compare(other: SingleTypeaheadItem): number {
    if (this.label === other.label) {
      return 0;
    }
    return this.label >= other.label ? 1 : -1;
  }
}
