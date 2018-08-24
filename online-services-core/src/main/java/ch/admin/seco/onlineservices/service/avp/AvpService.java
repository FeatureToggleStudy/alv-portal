package ch.admin.seco.onlineservices.service.avp;

import ch.admin.seco.onlineservices.model.avp.AvpForm;
import ch.admin.seco.onlineservices.model.avp.Beschaeftigungen;
import ch.admin.seco.onlineservices.model.common.EditStatus;
import ch.admin.seco.onlineservices.model.common.TransmissionStatus;
import ch.admin.seco.onlineservices.repository.avp.AvpRepository;
import ch.admin.seco.onlineservices.repository.error.FormNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AvpService {

    private final AvpRepository avpRepository;

    @Autowired
    public AvpService(AvpRepository avpRepository) {
        this.avpRepository = avpRepository;
    }

    public AvpForm createAvpForm(AvpForm avpForm) {
        return avpRepository.createAvpForm(avpForm);
    }

    public Optional<AvpForm> getAvpForm(String avpFormId) {
        return avpRepository.getAvpForm(avpFormId);
    }

    void setEditStatus(String avpFormId, EditStatus editStatus) {
        if (formExists(avpFormId)) {
            avpRepository.setEditStatus(avpFormId, editStatus);
        } else {
            throw new FormNotFoundException(avpFormId);
        }
    }

    void setTransmissionStatus(String avpFormId, TransmissionStatus transmissionStatus) {
        if (formExists(avpFormId)) {
            avpRepository.setTransmissionStatus(avpFormId, transmissionStatus);
        } else {
            throw new FormNotFoundException(avpFormId);
        }
    }

    public void saveBeaschaftigungen(String avpFormId, Beschaeftigungen beschaeftigungen) {
        if (formExists(avpFormId)) {
            avpRepository.saveBeschaeftigungen(avpFormId, beschaeftigungen);
        } else {
            throw new FormNotFoundException(avpFormId);
        }
        // TODO change edit status
    }

    public Beschaeftigungen getBeschaeftigungen(String avpFormId) {
        if (formExists(avpFormId)) {
            return avpRepository.getBeschaeftigungen(avpFormId);
        } else {
            throw new FormNotFoundException(avpFormId);
        }
    }

    public void transmit(String avpFormId) {
        if (formExists(avpFormId)) {
            // TODO transmission and validation logic
            // TODO change transmission status
        } else {
            throw new FormNotFoundException(avpFormId);
        }
    }

    private boolean formExists(String avpFormId) {
        Optional<AvpForm> avpFormOptional = avpRepository.getAvpForm(avpFormId);
        if (avpFormOptional.isPresent())
            return true;
        else {
            return false;
        }
    }
}
