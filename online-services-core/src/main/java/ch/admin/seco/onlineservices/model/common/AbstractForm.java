package ch.admin.seco.onlineservices.model.common;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.time.LocalDate;

public class AbstractForm {

    private String id;

    private short year;

    @Min(1)
    @Max(12)
    private byte month;

    private EditStatus editStatus;

    private TransmissionStatus transmissionStatus;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public short getYear() {
        return year;
    }

    public void setYear(short year) {
        if (year < LocalDate.now().getYear()) {
            throw new IllegalArgumentException("The form year can't be in the past");
        }
        this.year = year;
    }

    public byte getMonth() {
        return month;
    }

    public void setMonth(byte month) {
        this.month = month;
    }

    public EditStatus getEditStatus() {
        return editStatus;
    }

    public void setEditStatus(EditStatus editStatus) {
        this.editStatus = editStatus;
    }

    public TransmissionStatus getTransmissionStatus() {
        return transmissionStatus;
    }

    public void setTransmissionStatus(TransmissionStatus transmissionStatus) {
        this.transmissionStatus = transmissionStatus;
    }

}
