package com.kh.dolbomi.entity;

import jakarta.persistence.*;
import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
//@Entity
public class Member {

    // Persist시에 값 설정
    @PrePersist
    public void prePersist() {

    }

    // 사용 안할시 update시에 변경되지 않음
    @PreUpdate
    public void preUpdate() {
    }
}
