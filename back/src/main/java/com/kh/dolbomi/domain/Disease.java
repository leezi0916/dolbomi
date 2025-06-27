package com.kh.dolbomi.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "DISEASE")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Disease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DIS_NO")
    private Long disNo;

    @Column(name = "DIS_NAME", length = 30, nullable = false)
    private String disName;

    //양방향 관계 원한다면 cascade 설정을 통해서 질병이 저장되면
    @OneToMany(mappedBy = "disease", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<DiseaseTag> diseaseTags = new ArrayList<>();

}