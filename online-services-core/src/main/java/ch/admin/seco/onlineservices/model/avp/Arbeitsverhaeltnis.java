package ch.admin.seco.onlineservices.model.avp;

import ch.admin.seco.onlineservices.model.common.Address;

import javax.validation.constraints.Size;
import java.util.Date;

public class Arbeitsverhaeltnis {

    private Date from;

    private Date to;

    @Size(max = 150)
    private String employer;

    private Address address;

    // TODO support of documents will be added later
    /*private List<Document> workingContractDocuments;*/

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

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
