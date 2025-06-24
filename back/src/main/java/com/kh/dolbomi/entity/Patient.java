package com.kh.dolbomi.entity;

import com.kh.dolbomi.enums.StatusEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "PATIENT")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PATIENT_NO")
    private Long patNo;

    @ManyToOne
    @JoinColumn(name = "GUARDIAN_NO", nullable = false)
    private User guardian;

    @Column(name = "PROFILE_IMAGE", length = 100)
    private String profileImage;

    @Column(name = "PAT_PHONE")
    private Integer patPhone;

    @Column(name = "PAT_NAME", nullable = false, length = 10)
    private String patName;

    @Column(name = "PAT_ADDRESS", nullable = false, length = 50)
    private String patAddress;

    @Column(name = "PAT_AGE", nullable = false)
    private Integer patAge;

    @Column(name = "PAT_GENDER", nullable = false, length = 1)
    @Enumerated(EnumType.STRING)
    private Gender patGender;

    @Column(name = "PAT_HEIGHT", nullable = false)
    private BigDecimal patHeight;

    @Column(name = "PAT_WEIGHT", nullable = false)
    private BigDecimal  patWeight;

    @Column(name = "PAT_CONTENT", columnDefinition = "TEXT")
    private String patContent;

    @Column(name = "STATUS", nullable = false, length = 1)
    @Enumerated(EnumType.STRING)
    private StatusEnum.Status status;

    public enum Gender {
        M, F
    }

    @PrePersist
    public void prePersist() {
        if(status == null){
            this.status = StatusEnum.Status.Y;
        }
    }

    //양방향 설정 환자 삭제시 관련 환자에 대한 질병태그들도 삭제
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<DiseaseTag> diseaseTags = new ArrayList<>();
}