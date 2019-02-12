package ch.admin.seco.alvportal.webapp;

import javax.validation.constraints.NotEmpty;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix = "alv-portal.web", ignoreUnknownFields = false)
@Validated
public class PortalWebProperties {

    @NotEmpty
    private String gaTrackingIdToReplace = "UA-XXXXXXXX-X";

    @NotEmpty
    private String gaTrackingId = "UA-XXXXXXXX-X";

    public String getGaTrackingIdToReplace() {
        return gaTrackingIdToReplace;
    }

    public void setGaTrackingIdToReplace(String gaTrackingIdToReplace) {
        this.gaTrackingIdToReplace = gaTrackingIdToReplace;
    }

    public String getGaTrackingId() {
        return gaTrackingId;
    }

    public void setGaTrackingId(String gaTrackingId) {
        this.gaTrackingId = gaTrackingId;
    }
}
