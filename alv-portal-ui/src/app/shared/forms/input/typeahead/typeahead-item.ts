export class TypeaheadItem<T> {

  private readonly _id;

  constructor(public type: string,
                        public payload: T,
                        public label: string,
                        public order = 0) {
    this._id = `${type}_${label}`;
  }

  equals(other: TypeaheadItem<any>): boolean {
    return other._id === this._id;
  }

  compare(other: TypeaheadItem<any>): number {
    if (this.order === other.order) {
      return 0;
    }
    return this.order >= other.order ? 1 : -1;
  }

}
