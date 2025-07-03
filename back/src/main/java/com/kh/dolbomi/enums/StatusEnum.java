package com.kh.dolbomi.enums;

public class StatusEnum {
    public enum Status {
        Y, // 활성 또는 공개
        N, // 비활성 또는 삭제
        W  // 대기 (Waiting)
    }

    public enum Gender {
        M, F
    }

    public enum CareStatus {
        Y, // 숙식 제공 가능
        N  // 숙식 제공 불가
    }

    //모집 마감상태
    public enum HiringStatus {
        Y, // 모집중 (구인글 등록시 Y)
        N // 모집마감
    }

    //게시판에 필요한상태
    public enum Role {
        G, // 보호자 (Guardian)
        C, // 간병인 (Caregiver)
        Q  // 문의 (Question)
    }

    //채팅에 필요한상태
    public enum CheckStatus {
        Y, // 읽음
        N  // 안 읽음
    }

    //문의 관련
    public enum QuestionStatus {
        Y, // 완료
        N  // 대기
    }

    public enum IS_READ {
        Y, // 안읽음
        N, // 읽음
    }


}
