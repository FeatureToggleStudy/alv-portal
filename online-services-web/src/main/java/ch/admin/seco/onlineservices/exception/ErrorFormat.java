package ch.admin.seco.onlineservices.exception;

enum ErrorFormat {
    INTERNAL_ERROR("Internal server error %s","Internal Server Error (traceId: %s)");

    ErrorFormat(String logFormat, String resposeFormat) {
        this.logFormat = logFormat;
        this.resposeFormat = resposeFormat;
    }

    private String logFormat;

    private String resposeFormat;

    String getLogFormat() {
        return logFormat;
    }

    String getResposeFormat() {
        return resposeFormat;
    }
}
