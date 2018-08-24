package ch.admin.seco.onlineservices.model.common;

public enum TransmissionStatus {

    NOT_TRANSMITTED("not_transmitted"), TRANSMITTED("transmitted"), REOPENED("reopened");

    private final String value;

    TransmissionStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static TransmissionStatus fromValue(String value) {
        for (TransmissionStatus transmissionStatus : TransmissionStatus.values()) {
            if (value.equals(transmissionStatus.getValue())) {
                return transmissionStatus;
            }
        }
        throw new IllegalArgumentException("TransmissionStatus: Illegal value: " + value);
    }

}
