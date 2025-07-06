package com.kh.dolbomi.exception;

public class LicenseNotFoundException extends BaseException {
    public LicenseNotFoundException() {
        super(ErrorCode.LICENSE_NOT_FOUND);
    }

    public LicenseNotFoundException(String message) {
        super(ErrorCode.LICENSE_NOT_FOUND, message);
    }

    public LicenseNotFoundException(String message, Throwable cause) {
        super(ErrorCode.LICENSE_NOT_FOUND, message, cause);
    }
}
