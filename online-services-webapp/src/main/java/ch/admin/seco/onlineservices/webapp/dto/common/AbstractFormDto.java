package ch.admin.seco.onlineservices.webapp.dto.common;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.time.LocalDate;

public abstract class AbstractFormDto {

    private String id;

    private short year;

    @Min(1)
    @Max(12)
    private byte month;

    private EditStatusDto editStatus;

    private TransmissionStatusDto transmissionStatus;

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

    public EditStatusDto getEditStatus() {
        return editStatus;
    }

    public void setEditStatus(EditStatusDto editStatus) {
        this.editStatus = editStatus;
    }

    public TransmissionStatusDto getTransmissionStatus() {
        return transmissionStatus;
    }

    public void setTransmissionStatus(TransmissionStatusDto transmissionStatus) {
        this.transmissionStatus = transmissionStatus;
    }
}
