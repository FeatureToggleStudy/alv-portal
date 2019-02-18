import { Salutation } from '../../shared/backend-services/shared.types';
import { CompanyContactTemplateModel } from '../../core/auth/company-contact-template-model';
import { CompanyContactTemplate } from '../../shared/backend-services/user-info/user-info.types';

export interface CompanyContactFormValue {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  companyStreet: string;
  companyHouseNr: string;
  companyZipCode: string;
  companyCity: string;
}

export const emptyCompanyContactFormValue: CompanyContactFormValue = {
  salutation: null,
  firstName: null,
  lastName: null,
  phone: null,
  email: null,
  companyName: null,
  companyStreet: null,
  companyHouseNr: null,
  companyZipCode: null,
  companyCity: null
};

export function mapToCompanyContactFormValue(company: CompanyContactTemplateModel): CompanyContactFormValue {
  return {
    salutation: <Salutation>company.salutation,
    firstName: company.firstName,
    lastName: company.lastName,
    phone: company.phone,
    email: company.email,
    companyName: company.companyName,
    companyStreet: company.companyStreet,
    companyHouseNr: company.companyHouseNr,
    companyZipCode: company.companyZipCode,
    companyCity: company.companyCity
  };
}

export function mapToCompanyContactTemplate(companyId: string, companyContactFormValue: CompanyContactFormValue): CompanyContactTemplate {
  return {
    companyId: companyId,
    companyName: companyContactFormValue.companyName,
    companyStreet: companyContactFormValue.companyStreet,
    companyHouseNr: companyContactFormValue.companyHouseNr,
    companyZipCode: companyContactFormValue.companyZipCode,
    companyCity: companyContactFormValue.companyCity,
    phone: companyContactFormValue.phone,
    email: companyContactFormValue.email,
    salutation: <Salutation>companyContactFormValue.salutation
  };
}
