package ch.admin.seco.onlineservices.repository.avp;

import ch.admin.seco.onlineservices.model.avp.AvpForm;
import ch.admin.seco.onlineservices.model.avp.Beschaeftigungen;
import ch.admin.seco.onlineservices.model.common.EditStatus;
import ch.admin.seco.onlineservices.model.common.TransmissionStatus;

import java.util.Optional;

public interface AvpRepository {

    AvpForm createAvpForm(AvpForm avpForm);

    Optional<AvpForm> getAvpForm(String avpFormId);

    void saveBeschaeftigungen(String avpFormId, Beschaeftigungen beschaeftigungen);

    Beschaeftigungen getBeschaeftigungen(String avpFormId);

    void setEditStatus(String formId, EditStatus editStatus);

    void setTransmissionStatus(String formId, TransmissionStatus transmissionStatus);
}
