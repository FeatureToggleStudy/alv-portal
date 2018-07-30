package ch.admin.seco.onlineservices.web.error;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@ControllerAdvice
public class GlobalExceptionHandler {

    private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ResponseBody
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorResponse handleInternalError(Exception e) {
        return handleError(ErrorCode.UNKNOWN_ERROR,"Unexpected internal server error", e);
    }

    private ErrorResponse handleError(ErrorCode errorCode, String message, Exception e) {
        logger.error(message, e);
        return new ErrorResponse(errorCode, message, MDC.get("X-B3-TraceId"));
    }

}
