package ch.admin.seco.onlineservices.webapp.dto.avp;

import ch.admin.seco.onlineservices.webapp.dto.document.DocumentDto;

import java.util.Date;
import java.util.List;

public class BeschaeftigungenDto {

    private boolean employedInPeriod;

    private List<ArbeitsverhaeltnisDto> arbeitsverhaeltnis;

    private boolean selfEmployedInPeriod;

    private Date selfEmployedFrom;

    private Date selfEmployedTo;

    private List<DocumentDto> selfEmploymentDocuments;

    private boolean arbeitsmarktlicheMassnahme;

    public boolean isEmployedInPeriod() {
        return employedInPeriod;
    }

    public void setEmployedInPeriod(boolean employedInPeriod) {
        this.employedInPeriod = employedInPeriod;
    }

    public List<ArbeitsverhaeltnisDto> getArbeitsverhaeltnis() {
        return arbeitsverhaeltnis;
    }

    public void setArbeitsverhaeltnis(List<ArbeitsverhaeltnisDto> arbeitsverhaeltnis) {
        this.arbeitsverhaeltnis = arbeitsverhaeltnis;
    }

    public boolean isSelfEmployedInPeriod() {
        return selfEmployedInPeriod;
    }

    public void setSelfEmployedInPeriod(boolean selfEmployedInPeriod) {
        this.selfEmployedInPeriod = selfEmployedInPeriod;
    }

    public Date getSelfEmployedFrom() {
        return selfEmployedFrom;
    }

    public void setSelfEmployedFrom(Date selfEmployedFrom) {
        this.selfEmployedFrom = selfEmployedFrom;
    }

    public Date getSelfEmployedTo() {
        return selfEmployedTo;
    }

    public void setSelfEmployedTo(Date selfEmployedTo) {
        this.selfEmployedTo = selfEmployedTo;
    }

    public List<DocumentDto> getSelfEmploymentDocuments() {
        return selfEmploymentDocuments;
    }

    public void setSelfEmploymentDocuments(List<DocumentDto> selfEmploymentDocuments) {
        this.selfEmploymentDocuments = selfEmploymentDocuments;
    }

    public boolean isArbeitsmarktlicheMassnahme() {
        return arbeitsmarktlicheMassnahme;
    }

    public void setArbeitsmarktlicheMassnahme(boolean arbeitsmarktlicheMassnahme) {
        this.arbeitsmarktlicheMassnahme = arbeitsmarktlicheMassnahme;
    }
}
