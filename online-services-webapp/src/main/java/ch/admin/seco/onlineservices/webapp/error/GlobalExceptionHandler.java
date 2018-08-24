package ch.admin.seco.onlineservices.webapp.error;

import ch.admin.seco.onlineservices.repository.error.FormNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ResponseBody
    @ResponseStatus(BAD_REQUEST)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        return handleError(ErrorCode.INVALID_INPUT, "Invalid input: " + e.getMessage(), e);
    }

    @ResponseBody
    @ResponseStatus(BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return handleError(ErrorCode.INVALID_INPUT, "Invalid input: " + e.getMessage(), e);
    }

    @ResponseBody
    @ResponseStatus(BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResponse handleIllegalArgumentException(IllegalArgumentException e) {
        return handleError(ErrorCode.INVALID_INPUT, "Invalid input: " + e.getMessage(), e);
    }

    @ResponseBody
    @ResponseStatus(NOT_FOUND)
    @ExceptionHandler(FormNotFoundException.class)
    public ErrorResponse handleFormNotFoundException(FormNotFoundException e) {
        return handleError(ErrorCode.FORM_NOT_FOUND, "Form not found: id: " + e.getFormId());
    }

    @ResponseBody
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorResponse handleInternalError(Exception e) {
        return handleError(ErrorCode.UNKNOWN_ERROR, "Unexpected internal server error", e);
    }

    private ErrorResponse handleError(ErrorCode errorCode, String message) {
        logger.error(message);
        return builtErroResponse(errorCode, message);
    }

    private ErrorResponse handleError(ErrorCode errorCode, String message, Exception e) {
        logger.error(message, e);
        return builtErroResponse(errorCode, message);
    }

    private ErrorResponse builtErroResponse(ErrorCode errorCode, String message) {
        return new ErrorResponse(errorCode, message, MDC.get("X-B3-TraceId"));
    }

}
