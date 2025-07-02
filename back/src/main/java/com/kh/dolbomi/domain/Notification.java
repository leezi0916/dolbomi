package com.kh.dolbomi.domain;

import com.kh.dolbomi.enums.StatusEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "NOTIFICATION")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @Column(name = "NOTIFICATION_NO")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RECIPIENT_NO", nullable = false)  // 알림 받는 사람
    private User recipient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SENDER_NO", nullable = false)      // 알림 보낸 사람
    private User sender;

    @Column(name = "NOTIFICATION_MESSAGE", nullable = false, length = 200)
    private String notificationMessage;

    @Column(name = "NOTIFICATION_LINK_URL", nullable = false, length = 200)
    private String notificationLinkUrl;

    @Column(name = "NOTIFICATION_CREATE_DATE", nullable = false)
    private LocalDateTime notificationCreateDate = LocalDateTime.now();

    @Column(name = "IS_READ", nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusEnum.IS_READ isRead;

    @Column(name = "STATUS", nullable = false, length = 1)
    @Enumerated(EnumType.STRING)
    private StatusEnum.Status status;

    @PrePersist
    public void prePersist() {
        this.notificationCreateDate = LocalDateTime.now();

        if (status == null) {
            this.status = StatusEnum.Status.Y;
        }

        if (isRead == null) {
            this.isRead = StatusEnum.IS_READ.Y;
        }
    }
}
