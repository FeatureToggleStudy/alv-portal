import { PavSearchService } from './pav-search.service';

export const enum CompanyType {
    'AVG',
    'RAV'
}

export class Organization {
    constructor(public id?: number,
                public externalId?: string,
                public name?: string,
                public street?: string,
                public houseNumber?: string,
                public zipCode?: string,
                public city?: string,
                public email?: string,
                public phone?: string,
                public type?: CompanyType,
                public active?: boolean) {
        this.active = false;
    }

    toString(): string {
        return PavSearchService.formatOrganizationName(this);
    }
}

export class OrganizationSuggestion {
    externalId: string;
    name: string;
    street: string;
    city: string;
    zipCode: string;
}

export interface OrganizationAutocomplete {
    organizations: Array<OrganizationSuggestion>;
}
