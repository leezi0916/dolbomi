package com.kh.dolbomi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DISEASE_TAG")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiseaseTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DIS_TAG_NO")
    private Long disTagNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAT_NO", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DIS_NO", nullable = false)
    private Disease disease;
}