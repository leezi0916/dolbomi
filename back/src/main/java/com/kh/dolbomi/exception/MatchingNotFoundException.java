package com.kh.dolbomi.exception;

public class MatchingNotFoundException extends BaseException {
    public MatchingNotFoundException() {
        super(ErrorCode.MATCHING_NOT_FOUND);
    }

    public MatchingNotFoundException(String message) {
        super(ErrorCode.MATCHING_NOT_FOUND, message);
    }
}

