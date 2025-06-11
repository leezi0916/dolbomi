package com.kh.dolbomi.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
// 페이징 처리 반환타입
// 직렬화시 getter 필수
public class PageResponse<T> {
    private List<T> content;
    private int currentPage;
    private int totalPage;
    private long totalCount;
    private boolean hasNext;
    private boolean hasPrevious;

    public PageResponse(Page<T> page){
        this.content = page.getContent(); // 불러온 게시글 목록
        this.currentPage = page.getNumber(); // 현재 페이지
        this.totalPage = page.getTotalPages(); // 총 페이지 수
        this.hasNext = page.hasNext(); // 다음 페이지여부
        this.hasPrevious = page.hasPrevious(); // 이전 페이지여부
        this.totalCount = page.getTotalElements(); // 총 게시글 개수
    }
}
