package ch.admin.seco.onlineservices.web.error;

public class ErrorResponse {

    private final ErrorCode errorCode;
    private final String message;
    private final String traceId;

    public ErrorResponse(ErrorCode errorCode, String message, String traceId) {
        this.errorCode = errorCode;
        this.message = message;
        this.traceId = traceId;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public String getMessage() {
        return message;
    }

    public String getTraceId() {
        return traceId;
    }
}
