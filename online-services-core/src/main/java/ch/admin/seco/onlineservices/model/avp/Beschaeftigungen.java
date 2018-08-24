package ch.admin.seco.onlineservices.model.avp;

import java.util.Date;
import java.util.List;

public class Beschaeftigungen {

    private boolean employedInPeriod;

    private List<Arbeitsverhaeltnis> arbeitsverhaeltnis;

    private boolean selfEmployedInPeriod;

    private Date selfEmployedFrom;

    private Date selfEmployedTo;

    // TODO support of documents will be added later
    /*private List<Document> selfEmploymentDocuments;*/

    private boolean arbeitsmarktlicheMassnahme;

    public boolean isEmployedInPeriod() {
        return employedInPeriod;
    }

    public void setEmployedInPeriod(boolean employedInPeriod) {
        this.employedInPeriod = employedInPeriod;
    }

    public List<Arbeitsverhaeltnis> getArbeitsverhaeltnis() {
        return arbeitsverhaeltnis;
    }

    public void setArbeitsverhaeltnis(List<Arbeitsverhaeltnis> arbeitsverhaeltnis) {
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

    public boolean isArbeitsmarktlicheMassnahme() {
        return arbeitsmarktlicheMassnahme;
    }

    public void setArbeitsmarktlicheMassnahme(boolean arbeitsmarktlicheMassnahme) {
        this.arbeitsmarktlicheMassnahme = arbeitsmarktlicheMassnahme;
    }
}
