export const enum CompanyType {
    'AVG',
    'RAV'
}

export interface Organization {
    public_id?: number;
    externalId?: string;
    name?: string;
    street?: string;
    houseNumber?: string;
    zipCode?: string;
    city?: string;
    email?: string;
    phone?: string;
    type?: CompanyType;
    active?: boolean;
}

export interface OrganizationSuggestion {
    externalId: string;
    name: string;
    street: string;
    city: string;
    zipCode: string;
}

export interface OrganizationAutocomplete {
    organizations: Array<OrganizationSuggestion>;
}
