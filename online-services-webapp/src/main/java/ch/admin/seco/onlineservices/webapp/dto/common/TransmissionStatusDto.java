package ch.admin.seco.onlineservices.webapp.dto.common;

public enum TransmissionStatusDto {

    NOT_TRANSMITTED("not_transmitted"), TRANSMITTED("transmitted"), REOPENED("reopened");

    private final String value;

    TransmissionStatusDto(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static TransmissionStatusDto fromValue(String value) {
        for (TransmissionStatusDto transmissionStatusDto : TransmissionStatusDto.values()) {
            if (value.equals(transmissionStatusDto.getValue())) {
                return transmissionStatusDto;
            }
        }
        throw new IllegalArgumentException("TransmissionStatus: Illegal value: " + value);
    }

}
