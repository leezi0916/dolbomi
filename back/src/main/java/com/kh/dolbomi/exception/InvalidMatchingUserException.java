package com.kh.dolbomi.exception;

public class InvalidMatchingUserException extends BaseException {
    public InvalidMatchingUserException(String message) {
        super(ErrorCode.INVALID_MATCHING_USER, message);
    }
}