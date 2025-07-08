package com.kh.dolbomi.exception;

public class ReportNotFoundException extends BaseException {
    public ReportNotFoundException() {
        super(ErrorCode.REPORT_NOT_FOUND);
    }

    public ReportNotFoundException(String message) {
        super(ErrorCode.REPORT_NOT_FOUND, message);
    }

    public ReportNotFoundException(ErrorCode errorCode, String message, Throwable cause) {
        super(ErrorCode.REPORT_NOT_FOUND, message, cause);
    }
}