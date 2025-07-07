package com.kh.dolbomi.exception;

public class HiringNotFoundException extends BaseException {
    public HiringNotFoundException() {
        super(ErrorCode.HIRING_NOT_FOUND);
    }

    public HiringNotFoundException(String message) {
        super(ErrorCode.HIRING_NOT_FOUND, message);
    }

    public HiringNotFoundException(ErrorCode errorCode, String message, Throwable cause) {
        super(ErrorCode.HIRING_NOT_FOUND, message, cause);
    }
}
