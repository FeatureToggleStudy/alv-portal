export class TypeaheadItemModel {

    constructor(public type: string,
                public code: string,
                public label: string,
                public order = 0) {
    }

    equals(other: TypeaheadItemModel): boolean {
        return !!other && other.type === this.type && other.label === this.label;
    }

    compare(other: TypeaheadItemModel): number {
        if (this.order === other.order) {
            return 0;
        }
        return this.order >= other.order ? 1 : -1;
    }
}
