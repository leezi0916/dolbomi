package com.kh.dolbomi.entity;

import com.kh.dolbomi.enums.StatusEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "REPORT")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REPORT_NO")
    private Long reportNo;

    @ManyToOne
    @JoinColumn(name = "CAREGIVER_NO", nullable = false)
    private User caregiver;

    @ManyToOne
    @JoinColumn(name = "PAT_NO", nullable = false)
    private Patient patient;

    @Column(name = "REPORT_TITLE", nullable = false, length = 20)
    private String reportTitle;

    @Column(name = "REPORT_CONTENT", nullable = false, columnDefinition = "TEXT")
    private String reportContent;

    @Column(name = "CREATE_DATE", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "UPDATE_DATE", nullable = false)
    private LocalDateTime updateDate;

    @Column(name = "STATUS", nullable = false, length = 1)
    @Enumerated(EnumType.STRING)
    private StatusEnum.Status status;

    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
        if (status == null){
            this.status = StatusEnum.Status.Y;
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.updateDate = LocalDateTime.now();
    }
}
