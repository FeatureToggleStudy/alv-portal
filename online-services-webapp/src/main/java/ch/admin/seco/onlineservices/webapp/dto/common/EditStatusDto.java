package ch.admin.seco.onlineservices.webapp.dto.common;

public enum EditStatusDto {

    NEW("new"), MISSING_DATA("missing_data"), COMPLETE("complete");

    private final String value;

    EditStatusDto(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static EditStatusDto fromValue(String value) {
        for (EditStatusDto editStatusDto : EditStatusDto.values()) {
            if (value.equals(editStatusDto.getValue())) {
                return editStatusDto;
            }
        }
        throw new IllegalArgumentException("EditStatus: Illegal value: " + value);
    }
}
