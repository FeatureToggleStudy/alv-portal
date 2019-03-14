import { ComplaintDto } from '../../../../shared/backend-services/complaint/complaint.types';
import { ComplaintFormValue } from './complaint-modal.component';

export function mapToFormValue(complaint: ComplaintDto): ComplaintFormValue {
  return {
    complaintMessage: complaint.complaintMessage,
    salutation: complaint.contactInformation.salutation,
    name: complaint.contactInformation.name,
    phone: complaint.contactInformation.phone,
    email: complaint.contactInformation.email
  };
}

export function mapFormToDto(id: string, formValue: ComplaintFormValue): ComplaintDto {
  return {
    jobAdvertisementId: id,
    contactInformation: {
      salutation: formValue.salutation,
      name: formValue.name,
      phone: formValue.phone,
      email: formValue.email,
    },
    complaintMessage: formValue.complaintMessage
  };
}
