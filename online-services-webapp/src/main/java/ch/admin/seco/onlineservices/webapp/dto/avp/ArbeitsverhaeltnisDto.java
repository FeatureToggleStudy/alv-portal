package ch.admin.seco.onlineservices.webapp.dto.avp;

import ch.admin.seco.onlineservices.webapp.dto.document.DocumentDto;

import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

public class ArbeitsverhaeltnisDto {

    private Date from;

    private Date to;

    @Size(max = 150)
    private String employer;

    private AddressDto addressDto;

    private List<DocumentDto> workingContractDocuments;

    public Date getFrom() {
        return from;
    }

    public void setFrom(Date from) {
        this.from = from;
    }

    public Date getTo() {
        return to;
    }

    public void setTo(Date to) {
        this.to = to;
    }

    public String getEmployer() {
        return employer;
    }

    public void setEmployer(String employer) {
        this.employer = employer;
    }

    public AddressDto getAddressDto() {
        return addressDto;
    }

    public void setAddressDto(AddressDto addressDto) {
        this.addressDto = addressDto;
    }

    public List<DocumentDto> getWorkingContractDocuments() {
        return workingContractDocuments;
    }

    public void setWorkingContractDocuments(List<DocumentDto> workingContractDocuments) {
        this.workingContractDocuments = workingContractDocuments;
    }
}
