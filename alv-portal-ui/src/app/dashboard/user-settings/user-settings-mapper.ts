import { Salutation } from '../../shared/backend-services/shared.types';
import { CompanyContactTemplateModel } from '../../core/auth/company-contact-template-model';
import { CompanyContactTemplate } from '../../shared/backend-services/user-info/user-info.types';

export interface UserInfoFormValue {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface CompanyInfoFormValue {
  companyName: string;
  companyStreet: string;
  companyHouseNr: string;
  companyZipCode: string;
  companyCity: string;
}

export const emptyUserFormValue: UserInfoFormValue = {
  salutation: null,
  firstName: null,
  lastName: null,
  phone: null,
  email: null
};

export const emptyCompanyFormValue: CompanyInfoFormValue = {
  companyName: null,
  companyStreet: null,
  companyHouseNr: null,
  companyZipCode: null,
  companyCity: null
};

export function mapToUserInfoFormValue(company: CompanyContactTemplateModel): UserInfoFormValue {
  return {
    salutation: <Salutation>company.salutation,
    firstName: company.firstName,
    lastName: company.lastName,
    phone: company.phone,
    email: company.email
  };
}

export function mapToCompanyInfoFormValue(company: CompanyContactTemplateModel): CompanyInfoFormValue {
  return {
    companyName: company.companyName,
    companyStreet: company.companyStreet,
    companyHouseNr: company.companyHouseNr,
    companyZipCode: company.companyZipCode,
    companyCity: company.companyCity
  };
}

export function mapToCompanyContactTemplate(companyId: string, user: UserInfoFormValue, company: CompanyInfoFormValue): CompanyContactTemplate {
  return {
    companyId: companyId,
    companyName: company.companyName,
    companyStreet: company.companyStreet,
    companyHouseNr: company.companyHouseNr,
    companyZipCode: company.companyZipCode,
    companyCity: company.companyCity,
    phone: user.phone,
    email: user.email,
    salutation: <Salutation>user.salutation
  };
}
