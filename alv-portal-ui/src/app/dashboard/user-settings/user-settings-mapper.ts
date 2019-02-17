import { Salutation } from '../../shared/backend-services/shared.types';
import { CompanyContactTemplateModel } from '../../core/auth/company-contact-template-model';
import { CompanyContactTemplate } from '../../shared/backend-services/user-info/user-info.types';

export interface ContactFormValue {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface CompanyFormValue {
  companyName: string;
  companyStreet: string;
  companyHouseNr: string;
  companyZipCode: string;
  companyCity: string;
}

export const emptyContactFormValue: ContactFormValue = {
  salutation: null,
  firstName: null,
  lastName: null,
  phone: null,
  email: null
};

export const emptyCompanyFormValue: CompanyFormValue = {
  companyName: null,
  companyStreet: null,
  companyHouseNr: null,
  companyZipCode: null,
  companyCity: null
};

export function mapToContactFormValue(company: CompanyContactTemplateModel): ContactFormValue {
  return {
    salutation: <Salutation>company.salutation,
    firstName: company.firstName,
    lastName: company.lastName,
    phone: company.phone,
    email: company.email
  };
}

export function mapToCompanyFormValue(company: CompanyContactTemplateModel): CompanyFormValue {
  return {
    companyName: company.companyName,
    companyStreet: company.companyStreet,
    companyHouseNr: company.companyHouseNr,
    companyZipCode: company.companyZipCode,
    companyCity: company.companyCity
  };
}

export function mapToCompanyContactTemplate(companyId: string, contact: ContactFormValue, company: CompanyFormValue): CompanyContactTemplate {
  return {
    companyId: companyId,
    companyName: company.companyName,
    companyStreet: company.companyStreet,
    companyHouseNr: company.companyHouseNr,
    companyZipCode: company.companyZipCode,
    companyCity: company.companyCity,
    phone: contact.phone,
    email: contact.email,
    salutation: <Salutation>contact.salutation
  }
}
