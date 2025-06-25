package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.ReviewDto.Response;
import java.util.List;

public interface ReviewService {
    List<Response> getMainReviewList();
}
