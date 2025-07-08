package com.kh.dolbomi.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Table(name = "files")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String originName;

    @Column(nullable = false, unique = true)
    private String changeName;

    private String contentType;

    @CreationTimestamp
    private Timestamp createdAt;
}
