package com.kh.dolbomi.repository;

import com.kh.dolbomi.domain.Review;
import com.kh.dolbomi.enums.StatusEnum;
import java.util.List;

public interface ReviewRepository {

    List<Review> getMainReviewList(StatusEnum.Status status);

}
