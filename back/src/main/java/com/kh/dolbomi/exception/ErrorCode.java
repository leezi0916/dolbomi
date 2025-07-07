package com.kh.dolbomi.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    //사용자 관련 에러
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."),
    INVALID_USER_INPUT(HttpStatus.BAD_REQUEST, "사용자 입력값이 올바르지 않습니다."),
    USER_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 사용자입니다."),
    PROPOSER_NOT_FOUND(HttpStatus.NOT_FOUND, "신청 내역을 찾을 수 없습니다."),

    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "요청한 리소스를 찾을 수 없습니다."),
    REQUEST_TIMEOUT(HttpStatus.REQUEST_TIMEOUT, "요청 시간 초과되었습니다."),

    //자격증 에러
    LICENSE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 자격증을 찾을 수 없습니다."),

    //매칭 에러
    MATCHING_NOT_FOUND(HttpStatus.NOT_FOUND, "매칭 정보를 찾을 수 없습니다."),
    INVALID_MATCHING_USER(HttpStatus.BAD_REQUEST, "매칭에 연결된 사용자 정보가 올바르지 않습니다."),

    //이력서 에러
    RESUME_NOT_FOUND(HttpStatus.NOT_FOUND, "이력서를 찾을 수 없습니다."),
    RESUME_LIMIT_EXCEEDED(HttpStatus.BAD_REQUEST, "공개 가능한 이력서는 최대 3개까지입니다."),

    //리뷰 에러
    REVIEW_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 리뷰가 존재합니다."),
    INVALID_REVIEW_SCORE(HttpStatus.BAD_REQUEST, "리뷰 점수가 유효하지 않습니다."),

    //환자 에러
    PATIENT_NOT_FOUND(HttpStatus.NOT_FOUND, "환자를 찾을 수 없습니다."),
    GUARDIAN_NOT_LINKED(HttpStatus.CONFLICT, "보호자가 연결되지 않은 환자입니다."),

    //환자 일지 에러
    REPORT_NOT_FOUND(HttpStatus.NOT_FOUND, "진단일지를 찾을 수 없습니다."),

    //구인글 에러
    HIRING_NOT_FOUND(HttpStatus.NOT_FOUND, "구인정보를 찾을 수 없습니다."),

    //알림 에러
    NOTIFICATION_RECIPIENT_NOT_FOUND(HttpStatus.NOT_FOUND, "알림 수신자를 찾을 수 없습니다."),
    NOTIFICATION_SENDER_NOT_FOUND(HttpStatus.NOT_FOUND, "알림 발신자를 찾을 수 없습니다.");
    private final HttpStatus status;
    private final String message;
}