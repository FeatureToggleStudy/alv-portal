package ch.admin.seco.onlineservices.model.common;

public enum EditStatus {

    NEW("new"), MISSING_DATA("missing_data"), COMPLETE("complete");

    private final String value;

    EditStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static EditStatus fromValue(String value) {
        for (EditStatus editStatus : EditStatus.values()) {
            if (value.equals(editStatus.getValue())) {
                return editStatus;
            }
        }
        throw new IllegalArgumentException("EditStatus: Illegal value: " + value);
    }
}
