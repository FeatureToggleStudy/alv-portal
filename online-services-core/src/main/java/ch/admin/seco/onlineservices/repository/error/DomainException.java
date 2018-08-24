package ch.admin.seco.onlineservices.repository.error;

public class DomainException extends RuntimeException {

    public DomainException(String message, Throwable cause) {
        super(message, cause);
    }
}
