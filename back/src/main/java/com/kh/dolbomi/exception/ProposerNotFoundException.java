package com.kh.dolbomi.exception;

public class ProposerNotFoundException extends BaseException {
    public ProposerNotFoundException() {
        super(ErrorCode.PROPOSER_NOT_FOUND);
    }

    public ProposerNotFoundException(String message) {
        super(ErrorCode.PROPOSER_NOT_FOUND, message);
    }

    public ProposerNotFoundException(String message, Throwable cause) {
        super(ErrorCode.PROPOSER_NOT_FOUND, message, cause);
    }
}