package com.kh.dolbomi.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailVerification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private boolean verified;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public void changeVerified(boolean verified) {
        this.verified = verified;
    }

    public void setData(String email, String code, LocalDateTime createdAt, boolean verified) {
        this.email = email;
        this.code = code;
        this.createdAt = createdAt;
        this.verified = verified;
    }
}