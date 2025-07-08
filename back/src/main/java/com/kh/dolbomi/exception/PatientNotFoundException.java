package com.kh.dolbomi.exception;

public class PatientNotFoundException extends BaseException {
    public PatientNotFoundException() {
        super(ErrorCode.PATIENT_NOT_FOUND);
    }

    public PatientNotFoundException(String message) {
        super(ErrorCode.PATIENT_NOT_FOUND, message);
    }

    public PatientNotFoundException(ErrorCode errorCode, String message, Throwable cause) {
        super(ErrorCode.PATIENT_NOT_FOUND, message, cause);
    }
}
