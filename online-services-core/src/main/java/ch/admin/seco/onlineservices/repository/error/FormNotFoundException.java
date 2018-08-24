package ch.admin.seco.onlineservices.repository.error;

public class FormNotFoundException extends RuntimeException {

    private final String formId;

    public FormNotFoundException(String formId) {
        this.formId = formId;
    }

    public String getFormId() {
        return formId;
    }
}
