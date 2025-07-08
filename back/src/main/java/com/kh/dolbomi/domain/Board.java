package com.kh.dolbomi.domain;

import com.kh.dolbomi.dto.BoardDto;
import com.kh.dolbomi.enums.StatusEnum;
import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "BOARD")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_NO")
    private Long boardNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO", nullable = false)
    private User user;

    @Column(name = "BOARD_TITLE", nullable = false, length = 50)
    private String boardTitle;

    @Column(name = "BOARD_CONTENT", nullable = false, length = 200)
    private String boardContent;

    @Column(name = "CREATE_DATE", nullable = false, updatable = false)
    private LocalDateTime createDate;

    @Column(name = "UPDATE_DATE", nullable = false)
    private LocalDateTime updateDate;

    @Column(name = "STATUS", nullable = false, length = 1)
    @Enumerated(EnumType.STRING)
    private StatusEnum.Status status;

    @Column(name = "ROLE", nullable = false, length = 1)
    @Enumerated(EnumType.STRING)
    private StatusEnum.Role role;

    @Column(name = "QUESTION_STATUS", length = 1)
    @Enumerated(EnumType.STRING)
    private StatusEnum.QuestionStatus questionStatus;

    @Column(name = "QUESTION_CATEGORY", length = 1)
    @Enumerated(EnumType.STRING)
    private StatusEnum.QuestionCategory questionCategory;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replyList = new ArrayList<>();

    private int count;

    public void increaseViews() {
        this.count += 1;
    }

    public void changeUser(User user) {
        this.user = user;
        if (!user.getBoards().contains(this)) {
            user.getBoards().add(this);
        }
    }

    public void update(BoardDto.Update dto) {
        this.boardTitle = dto.getBoard_title();
        this.boardContent = dto.getBoard_content();
    }

    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
        this.count = 0;

        if (status == null) {
            this.status = StatusEnum.Status.Y;
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.updateDate = LocalDateTime.now();
    }

    public void setQuestionStatus() {
        this.questionStatus = StatusEnum.QuestionStatus.Y;
        System.out.println("questionStatus 업데이트 호출됨");
    }
}